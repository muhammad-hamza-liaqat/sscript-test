const express = require("express");
const userRoutes = express.Router();
const { addUser, getAllUsers } = require("../controller/userController");

userRoutes.route("/add-user").post(addUser);
userRoutes.route("/users").get(getAllUsers);

module.exports = userRoutes;
