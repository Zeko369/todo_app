'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    checked: DataTypes.BOOLEAN,
    checkedAt: DataTypes.DATE
  }, {});
  Todo.associate = function(models) {
    Todo.hasMany(models.Task, {
      foreignKey: 'TodoId',
      as: 'tasks',
    });
    // associations can be defined here
  };
  return Todo;
};
