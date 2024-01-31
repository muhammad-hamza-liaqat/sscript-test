const express = require("express");
const app = express();
require("dotenv").config(); // env file require 
const bodyParser = require("body-parser"); // middleware
const cors = require("cors"); // middleware
require("./database/connection"); // database connection
// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// server
app.listen(process.env.PORT, ()=>{
    console.log(`server is running at localhost://${process.env.PORT}/`)
})