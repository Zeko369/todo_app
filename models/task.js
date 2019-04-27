'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    TodoId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    completedAt: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Todo);
    // associations can be defined here
  };
  return Task;
};
