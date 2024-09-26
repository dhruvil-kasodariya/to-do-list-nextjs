const { DataTypes } = require("sequelize");
const sequelize = require("@/db/sequelize");

const Task = sequelize.define("Task", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("new", "completed"),
    defaultValue: "new",
  },
});

module.exports = Task;
