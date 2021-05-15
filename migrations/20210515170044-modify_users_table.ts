"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'name',
        {
          type: Sequelize.STRING(255)
        }
      ),
      queryInterface.addColumn(
        'users',
        'phone_number',
        {
          type: Sequelize.BIGINT(10)
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('tableName', 'columnName1'),
      queryInterface.removeColumn('tableName', 'columnName2')
    ]);
  }
};
