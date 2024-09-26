import pg from "pg";
const { Sequelize } = require("sequelize");
const config = require("./config");

const env = process.env.NODE_ENV || "development";
const { username, password, database, host, dialect } = config[env];

const sequelize = new Sequelize(
  `postgres://${username}:${password}@${host}:5432/${database}`,
  {
    dialect: dialect,
    dialectModule: pg,
  }
);
module.exports = sequelize;
