// userRouter.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/usersController");

// Route to fetch users data
router.get("/users", userController.getUsers);

module.exports = router;
