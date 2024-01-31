const express = require("express");
const userRoutes = express.Router();
const { addUser } = require("../controller/userController");

userRoutes.route("/add-user").post(addUser);

module.exports = userRoutes;
