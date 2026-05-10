const express = require("express");
const { getUsers, updateUserRole, getAllTasks } = require("../controllers/admin.controller");

const { allowedRoles } = require("../middleware/rbac.middleware");
const { userAuth } = require("../middleware/userAuth.middlleware");

const router = express.Router();

//protect all routes
router.use(userAuth);
router.use(allowedRoles("admin"));

router.get('/users', getUsers);
router.patch('/users/:userId/role', updateUserRole);
router.get('/tasks', getAllTasks);

module.exports = router;