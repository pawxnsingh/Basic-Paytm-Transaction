const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config"); // this is password

const authFunction = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // we have to check does authentication header exist or does it starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Autihorization header not Found",
    });
  }
  // startsWith();
  // or use Split();
  // split will divide the string into the array as per the
  const token = authHeader.split(" ")[1];
  // now we have the token here and we've to verify it
  try {
    const verify = jwt.verify(token, JWT_TOKEN);
    // this will put the new field in this
    req.userId = verify.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = authFunction;
