'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addColumn(
      'Todos',
      'description',
      Sequelize.TEXT)
  },
  down: (queryInterface, Sequelize) => {
    return  queryInterface.removeColumn(
      'Todos',
      'description')
  }
};
