const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Joi = require("joi"); // for more validations

const userModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required.",
        },
        len: {
          args: [3, 255],
          msg: "The name should be between 3 and 255 characters.",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Age is required.",
        },
        isInt: {
          msg: "Age must be an integer.",
        },
        min: {
          args: [0],
          msg: "Age must be a non-negative number.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required.",
        },
        isEmail: {
          msg: "Invalid email format.",
        },
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date of Birth is required.",
        },
        isDate: {
          msg: "Invalid Date of Birth format.",
        },
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

const userJoiValidations = {
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .message("Name should contain only alphabetical characters."),
  age: Joi.number()
    .integer()
    .min(0)
    .message("Age must be a non-negative integer."),
  email: Joi.string().email().message("Invalid email format."),
  dateOfBirth: Joi.date().iso().message("Invalid Date of Birth format."),
};


function userValidations(user) {
    const schema = Joi.object({
      name: userJoiValidations.name,
      age: userJoiValidations.age,
      email: userJoiValidations.email,
      dateOfBirth: userJoiValidations.dateOfBirth,
    });
  
    const result = schema.validate(user, { abortEarly: false });
  
    const errors = result.error ? result.error.details.map((error) => error.message) : [];
  
    return errors;
  }
module.exports = {userModel, userValidations};
