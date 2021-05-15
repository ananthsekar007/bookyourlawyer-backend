'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("clients", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {model: "users", key: "id"}
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("clients");
  }
};
