'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('items');
  }
};
