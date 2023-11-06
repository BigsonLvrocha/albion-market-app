'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('market_reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      item_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id',
        },
      },
      city: {
        type: Sequelize.ENUM(
          'BRIDGEWATCH',
          'LYMHURST',
          'FORTSTERLING',
          'THETFORD',
          'MARTLOCK',
          'CAERLEON',
          'BRECILIEN'
        ),
        allowNull: false,
      },
      buy_entries: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      sell_entries: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      top_buy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lowest_sell: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      buy_weighted_avg: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      sell_weighted_avg: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('market_reports');
  }
};
