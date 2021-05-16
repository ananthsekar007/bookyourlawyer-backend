"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('cases',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        client_id: {
          type: Sequelize.INTEGER,
          references: {model: "clients", key: "id"}
        },
        lawyer_id: {
          type: Sequelize.INTEGER,
          references: {model: "lawyers", key: "id"}
        },
        case_title: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        case_category: {
          type: Sequelize.ENUM,
          allowNull: true,
          values: [
            'CRIMINAL',
            'CIVIL',
          ]
        },
        case_description: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        case_number: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        quoted_amount: {
          type: Sequelize.BIGINT,
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
            'requested',
            'approved',
            'ongoing',
            'completed',
            'rejected'
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
    return queryInterface.dropTable('cases')
  }
};  