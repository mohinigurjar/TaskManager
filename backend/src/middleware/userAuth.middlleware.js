const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.userAuth = async(req, res, next) => {
    try{
        const token = req.cookies?.jwt;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Authentication token missing"
            })
        } 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { userId, role } = decoded;

        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = { userId: user._id, role: user.role };
        next();
    }catch(error){
        console.error(error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired"
            });  
        }

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}