'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {model: "clients", key: "id"}
      },
      lawyer_id: {
        type: Sequelize.INTEGER,
        references: {model: "lawyers", key: "id"}
      },
      amount: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.ENUM,
        values: [
          "SUCCESS",
          "DECLINED"
        ]
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("transactions");
  }
};
