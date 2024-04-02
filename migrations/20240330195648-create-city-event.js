"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CityEvents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      openAgendaUid: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shortDescription: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      longDescription: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      registration: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      minimumAge: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      eventUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      openAgendaCreatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      openAgendaUpdatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      openAgendaUserUid: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      stateId: {
        type: Sequelize.INTEGER,

        onDelete: "CASCADE",

        references: {
          model: "CityEventStates",
          key: "id",
        },
      },
      statusId: {
        type: Sequelize.INTEGER,

        onDelete: "CASCADE",

        references: {
          model: "CityEventStatus",
          key: "id",
        },
      },
      adressId: {
        type: Sequelize.INTEGER,

        onDelete: "CASCADE",

        references: {
          model: "CityEventAdress",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CityEvents");
  },
};
