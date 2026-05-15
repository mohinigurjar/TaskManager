const { Task } = require("../models/task.model");


// CREATE TASK

exports.createTask = async (req, res) => {
    try {
        const { task } = req.body;
        const { userId } = req.user;

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task is required"
            });
        }

        const newTask = await Task.create({
            task,
            createdBy: userId
        });
        const populatedTask = await newTask.populate("createdBy", "name email");

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: populatedTask
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



// GET ALL TASKS 

exports.getAllTasks = async (req, res) => {
    try {
        const { userId } = req.user;

        const tasks = await Task.find({ createdBy: userId})
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



// UPDATE TASK

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { task } = req.body;
        const { userId } = req.user;

        const existingTask = await Task.findOne({
            _id: taskId,
            createdBy: userId
        });

        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task is required"
            });
        }

        if(existingTask.task.trim() === task.trim()){
            return res.status(400).json({
                success: false,
                message: "Edit task to update"
            });
        }

        existingTask.task = task;
        await existingTask.save();

        const populatedTask = await existingTask.populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: populatedTask
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



// UPDATE TASK STATUS

exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { userId } = req.user;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const task = await Task.findOne({
            _id: taskId,
            createdBy: userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        task.status = status;
        await task.save();

        const populatedTask = await task.populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: populatedTask
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



// DELETE TASK (SOFT DELETE)

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { userId } = req.user;

        const task = await Task.findOne({
            _id: taskId,
            createdBy: userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        task.deletedAt = new Date();
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};