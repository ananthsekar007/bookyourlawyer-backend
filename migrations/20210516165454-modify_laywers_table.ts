"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'lawyers',
        'createdAt',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'lawyers',
        'updatedAt',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('lawyers', 'createdAt'),
      queryInterface.removeColumn('lawyers', 'updatedAt')
    ]);
  }
};