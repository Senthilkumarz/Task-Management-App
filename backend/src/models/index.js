const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Project = sequelize.define("Project", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: "todo" }, // todo, in-progress, done
  assignee: { type: DataTypes.STRING },
});

User.hasMany(Task);
Project.hasMany(Task);
Task.belongsTo(User, { foreignKey: "UserId" });
Task.belongsTo(Project, { foreignKey: "ProjectId" });

module.exports = { sequelize, User, Project, Task };
