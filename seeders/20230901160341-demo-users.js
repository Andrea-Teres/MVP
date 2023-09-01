"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "andrea@gmail.com",
        password: "dexter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "claudia@gmail.com",
        password: "gaspar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
