import { Sequelize, Model, DataTypes, NOW } from "sequelize";
import { config } from "./config";


const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
  },
});

db.authenticate()
    .then(() => {
      console.log("✅ Connection successfully.");
    })
    .catch((err) => {
      console.error("❌ Unable to connect to the database:", err);
    });

/**
 * 0721 - 유진
 * 프라이머리 키를 꼭 지정해줘야한다.
 * 지정 안해주면 자동으로 id 필드명이 들어가서 Unknown column ~ 오류 발생
 */
export const category = db.define("category", {
  category_idx: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: true },
  category_name: { type: Sequelize.STRING },
});

export const user = db.define("user", {
  user_idx: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: NOW,
  },
  user_name: { type: Sequelize.STRING },
  user_email: { type: Sequelize.STRING },
  user_password: { type: Sequelize.STRING },
});
