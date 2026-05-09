exports.allowedRoles = (...roles) => {
    return (req, res, next) => {

        if(!req.user){
            res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }

        if(!roles.includes(req.user.role)){
            res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }

        next();
    }
}