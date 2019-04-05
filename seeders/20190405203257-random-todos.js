'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos',[
      {
        title: 'Title',
        description: 'Foasdlkajsd jalsdkj alksjd lk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Foobar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Super long description',
        description: 'A reallly long Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra libero congue tellus placerat ultricies. Proin vestibulum felis nec ipsum semper, facilisis sagittis dolor cursus. Mauris molestie eu nunc ut semper. Pellentesque venenatis nec augue ut dictum. Curabitur porta, urna a sagittis dapibus, erat diam vehicula massa, accumsan interdum leo ex et ex. Cras ac pretium metus. Vivamus vehicula metus in massa imperdiet, quis.',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
