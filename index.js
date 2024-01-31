const express = require("express");
const app = express();
require("dotenv").config()
const bodyParser = require("body-parser");
const cors = require("cors");

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// server
app.listen(process.env.PORT, ()=>{
    console.log(`server is running at localhost://${process.env.PORT}/`)
})