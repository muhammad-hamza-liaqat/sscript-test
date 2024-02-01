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

    // Filteration by name
    if (req.query.name) {
      whereClause.name = { [Op.like]: `%${req.query.name}%` };
    }

    // Exact match or range filteration for age
    if (req.query.age) {
      if (req.query.age.includes('-')) {
        // if there is any range
        const [minAge, maxAge] = req.query.age.split('-').map(Number);

        if (!isNaN(minAge) && !isNaN(maxAge)) {
          whereClause.age = { [Op.between]: [minAge, maxAge] };
        } else {
          return res.status(400).json({ status: 400, message: "Invalid age range provided!" });
        }
      } else {
        // Exact match case
        const exactAge = Number(req.query.age);

        if (!isNaN(exactAge)) {
          whereClause.age = exactAge;
        } else {
          return res.status(400).json({ status: 400, message: "Invalid age value provided!" });
        }
      }
    }

    // Email filteration (regex expression)
    if (req.query.email) {
      whereClause.email = { [Op.like]: `%${req.query.email}%` };
    }

    // Filtration by Date of Birth (dob) (range)
    if (req.query.dob) {
      if (req.query.dob.includes('-')) {
        const [startDate, endDate] = req.query.dob.split('-');
        whereClause.dateOfBirth = { [Op.between]: [startDate, endDate] };
      } else {
        // Single case without range
        whereClause.dateOfBirth = req.query.dob;
      }
    }

    // Pagination parameters with default values
    const page = req.query.page ? parseInt(req.query.page, 10) : 1; // page set to 1 by default 
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 5; // page per record set to 5

    // Sorting parameters
    const sortField = req.query.sortField || 'createdAt'; // Default to sorting by createdAt
    const sortOrder = req.query.sortOrder && req.query.sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    // Sequelize count query for total records
    const totalCount = await userModel.count({ where: whereClause });

    // Sequelize findAll query with pagination and sorting
    const completeUser = await userModel.findAll({
      where: whereClause,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [[sortField, sortOrder]],
    });

    if (completeUser.length === 0) {
      return res.status(404).json({ status: 404, message: "No users found!" });
    }

    console.log("User data fetched successfully!");
    return res.status(200).json({
      status: 200,
      message: "Data fetched",
      data: completeUser,
      page,
      pageSize,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};


module.exports = { addUser, getAllUsers };
