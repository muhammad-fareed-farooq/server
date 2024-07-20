const jwt = require("jsonwebtoken");
const  Users_Schema  = require("../models/users_Models");

const check_auth_middleware = async (req, res, next) => {
  try {
    // Extracting the authentication token from cookies sent with the request
    const headers_token = req.headers.authorization;

    if (!headers_token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const auth_token = headers_token.split(" ")[1];

    console.log(auth_token);

    const verify_token = jwt.verify(auth_token, process.env.JWT_SECRECR_KEY);

    if (!verify_token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    // Extracting the user ID from the verified token payload
    const user_id = verify_token.user_id;

    const find_user = await Users_Schema.findById(user_id).select(-"password");

    return res.json({ data: find_user });
    // return next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error!" });
  }
};

module.exports = check_auth_middleware;
