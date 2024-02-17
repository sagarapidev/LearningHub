// userRouter.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/usersController");

// Route to fetch users data
router.get("/users", userController.getUsers);
// Route to fetch user details by ID
router.get("/user/:id", userController.getUserById);
// Route to create a new user
router.post("/user/save", userController.createUser);
// Route to update user details
router.put('/user/update/:id', userController.updateUser);
// Route to delete user by ID
router.delete('/user/delete/:id', userController.deleteUser);
module.exports = router;
