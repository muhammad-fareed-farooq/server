const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Users_Schema = require("../models/users_Models");

const signup_Controller = async (req, res, next) => {
  try {
    const body = req.body;

    const salt = bcryptjs.genSaltSync(10);

    const hash_Password = bcryptjs.hashSync(body.password, salt);

    const new_User = await Users_Schema.create({
      ...body,
      password: hash_Password,
    });

    return res.json({ success: true, data: new_User });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const login_Controller = async (req, res, next) => {
  try {
    const body = req.body;
    const find_user = await Users_Schema.findOne({ email: body.email });

    if (find_user === null) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    const compare_password = bcryptjs.compareSync(
      body.password,
      find_user.password
    );

    // if(!compare_password){
    if (compare_password === false) {
      return next({ status: 402, message: "Invalid credentials!" });
    }

    const payload = {
      user_id: find_user._id,
    };

    const jwt_token = jwt.sign(payload, process.env.JWT_SECRECR_KEY, {
      expiresIn: "1h",
    });

    find_user.$inc("login_count", 1);

    await find_user.save();

    return res.json({
      success: true,
      message: "Loggedin Successfully!",
      access_token: jwt_token,
    });
  } catch (error) {
    return next({ message: error.message || "Internal server error!" });
  }
};

const check_auth_controller = async (req, res) => {
  try {
    const user = req.user;

    return res.json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = { signup_Controller, login_Controller, check_auth_controller };
