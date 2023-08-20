const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (req, res, next) => {
  let token;
  let authorization = req.headers.Authorization || req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ errMessage: "User is not authorized" });
      }
      if (!token) {
        return res
          .status(401)
          .json({ errMessage: "User is not authorized or token is missing" });
      } else {
        console.log(decoded);
        // Gán thông tin user vào đối tượng req để các middleware sau có thể truy cập
        req.user = decoded.user;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ errMessage: "Authorization header is missing" });
  }
};

module.exports = {
  validateToken: validateToken,
};