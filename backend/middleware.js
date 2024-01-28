const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

// verifying jwt
const authMiddleware = (req, res, next) => {
    const bearerToken = req.cookies?.jwt;
    // const bearerToken = req.headers.authorization;

    // if null or does not start with Bearer
    if (!bearerToken || !bearerToken?.startsWith("Bearer ")) {
        return res.status(403).json({message: "Not Authorized! Try to log in"});
    }

    // Bearer <token>
    const token = bearerToken.split(" ")[1];

  try {
    // returns payload
    const { userId } = jwt.verify(token, JWT_SECRET);

    // req now contains verified authorised Id
    req.userId = userId;

    next();
  } 
  catch (error) {
    console.log(error);
    res.status(400).json({ message: "Not authorized" });
  }
};

module.exports = {
  authMiddleware,
};
