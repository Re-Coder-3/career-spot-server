import { Sequelize, Model, DataTypes, NOW } from "sequelize";
import { test, production } from "./config";

const db = new Sequelize(
  production.database,
  production.username,
  production.password,
  {
    host: production.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      freezeTableName: true,
    },
  }
);

db.authenticate()
  .then(() => {
    console.log("✅ Connection successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });
