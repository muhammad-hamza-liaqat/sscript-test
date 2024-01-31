const { userModel, userValidations } = require("../models/user/userModel");

const addUser = async (req, res) => {
  //   res.end("hello");

  const newUser = req.body;
  const validationErr = userValidations(newUser);
  if (validationErr.length > 0) {
    return res.status(400).json({ status: 400, error: validationErr });
  }
  try {
    const newUserToAdd = await userModel.create(newUser);
    console.log("user created successfully", newUserToAdd);
    return res
      .status(201)
      .json({
        status: 201,
        message: "user created successfully!",
        data: newUserToAdd,
      });
  } catch (error) {
    console.log("internal server error-adduser", error);
    return res.status(500).json({ status: 500, error: error });
  }
};

module.exports = { addUser };
