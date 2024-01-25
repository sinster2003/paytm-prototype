const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const generateToken = (userId, res) => {
    // sign a token
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "5d"
    });

    res.cookie("jwt", `Bearer ${token}`, {
        httpOnly: true, // secure
        // httpsOnly: true ---> production
        maxAge: 5 * 24 * 60 * 60 * 1000, // ms
        sameSite: "Strict" // avoid csrf attacks
    });

    return token;
}

module.exports = generateToken;