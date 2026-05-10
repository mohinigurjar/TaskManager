const jwt = require("jsonwebtoken");

exports.generateToken = (userId, role, res) => {

    const token = jwt.sign({userId, role}, process.env.JWT_SECRET, {expiresIn: "7d"});
    
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,  //7 days
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", 
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
    
    return token;
}