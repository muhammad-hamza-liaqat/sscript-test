const { userModel, userValidations } = require("../models/user/userModel");
const { Op } = require("sequelize")

const addUser = async (req, res) => {
  //   res.end("hello");

  const newUser = req.body;
  //   joi validations to validate the data in the req.body
  const validationErr = userValidations(newUser);
  //   if there is any error then,
  if (validationErr.length > 0) {
    return res.status(400).json({ status: 400, error: validationErr });
  }
  try {
    const newUserToAdd = await userModel.create(newUser);
    console.log("user created successfully", newUserToAdd);
    // res in json as per requirement
    return res.status(201).json({
      status: 201,
      message: "user created successfully!",
      data: newUserToAdd,
    });
  } catch (error) {
    console.log("internal server error-adduser", error);
    return res.status(500).json({ status: 500, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let whereClause = {};

    // Filtration by Name (case-insensitive partial match)
    if (req.query.name) {
      whereClause.name = { [Op.like]: `%${req.query.name}%` };
    }

    // Filtration by Age (exact match or range)
    if (req.query.age) {
      if (req.query.age.includes('-')) {
        const [minAge, maxAge] = req.query.age.split('-').map(Number);
        whereClause.age = { [Op.between]: [minAge, maxAge] };
      } else {
        whereClause.age = Number(req.query.age);
      }
    }

    // Filtration by Email (case-insensitive partial match)
    if (req.query.email) {
      whereClause.email = { [Op.like]: `%${req.query.email}%` };
    }

    // Filtration by Date of Birth (range)
    if (req.query.dob) {
      if (req.query.dob.includes('-')) {
        const [startDate, endDate] = req.query.dob.split('-');
        whereClause.dateOfBirth = { [Op.between]: [startDate, endDate] };
      } else {
        // Handle single date if needed
        whereClause.dateOfBirth = req.query.dob;
      }
    }

    const completeUser = await userModel.findAll({ where: whereClause });

    if (completeUser.length === 0) {
      return res.status(404).json({ status: 404, message: "No users found!" });
    }

    console.log("User data fetched successfully!");
    return res.status(200).json({ status: 200, message: "Data fetched", data: completeUser });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = { addUser, getAllUsers };
