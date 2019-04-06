'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'checked', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }).then(() => {
      return queryInterface.addColumn('Todos', 'checkedAt', Sequelize.DATE)
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'checked').then(() => {
      return queryInterface.removeColumn('Todos', 'checkedAt');
    });
  }
};
