"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        name: "rohman",
        profession: "Admin Micro",
        role: "admin",
        email: "rohmannurhaqiqi@gmail.com",
        password: await bcrypt.hash("rahasia1", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "adit",
        profession: "Student Micro",
        role: "student",
        email: "adit1123@gmail.com",
        password: await bcrypt.hash("rahasia1", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
