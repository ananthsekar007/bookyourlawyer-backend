"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'clients',
        'createdAt',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'clients',
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
      queryInterface.removeColumn('clients', 'createdAt'),
      queryInterface.removeColumn('clients', 'updatedAt')
    ]);
  }
};