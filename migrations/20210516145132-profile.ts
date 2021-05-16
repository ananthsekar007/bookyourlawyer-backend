"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('profile',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {model: "users", key: "id"}
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        phone_number: {
          type: Sequelize.BIGINT(10),
          allowNull: true,
        },
        district: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        state: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        govt_id: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        case_type: {
          allowNull: true,
          type: Sequelize.ENUM,
          values: [
            'CRIMINAL',
            'CIVIL',
            'BOTH'
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
    return queryInterface.dropTable('profile')
  }
};  