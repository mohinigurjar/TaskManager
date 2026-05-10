const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");


// GET ALL USERS

exports.getUsers = async(req, res) => {
    try{
        const currentuserId = req.user.userId;

        const users = await User.find({})
            .sort({createdAt: -1});

        //exclude logged-in admin
        const usersList = users.filter(user => user._id.toString() !== currentuserId.toString());

        return res.status(200).json({
            success: true,
            count: usersList.length,
            message: "Users fetched successfully",
            data: usersList
        })
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }  
}


// UPDATE USER ROLE

exports.updateUserRole = async(req, res) => {
    try{
        const { userId }  = req.params;
        const { role } = req.body;

        const normalizedRole = role?.trim().toLowerCase();
        const allowedRoles = ["admin", "user"];

        if(!role || !allowedRoles.includes(normalizedRole)){
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            })
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        user.role = normalizedRole;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: user
        })
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// GET ALL TASKS

exports.getAllTasks = async(req, res) => {
    try{

        const tasks = await Task.find({})
            .populate("createdBy", "name email role")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: tasks.length,
            message: "Tasks fetched successfully",
            data: tasks
        })
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}