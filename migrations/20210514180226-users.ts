"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING(255),
        },
        password: {
          type: Sequelize.STRING(255),
        },
        type: {
          type: Sequelize.ENUM,
          values: [
            'LAWYER',
            'CLIENT'
          ]
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
  )},
down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
};