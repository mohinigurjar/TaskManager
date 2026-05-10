const express = require("express");
const { createTask, getAllTasks, deleteTask, updateTask, updateTaskStatus } = require("../controllers/task.controller")
const { validate } = require("../middleware/validator.middleware")
const { createTaskValidator, updateTaskValidator, updateTaskStatusValidator } = require("../validators/validator.task");

const { userAuth } = require("../middleware/userAuth.middlleware");

const router = express.Router();

//protect all routes
router.use(userAuth);

//TASK CRUD
router.post('/', validate(createTaskValidator), createTask);
router.get('/', getAllTasks);
router.delete('/:taskId', deleteTask);
router.patch('/:taskId', validate(updateTaskValidator), updateTask);
router.patch('/:taskId/status', validate(updateTaskStatusValidator), updateTaskStatus);

module.exports = router;