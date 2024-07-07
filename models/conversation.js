// models/conversation.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Conversation = sequelize.define("Conversation", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = Conversation;
