/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('User', table => {
    table.increments();
    table.string('First Name', 250);
    table.string('Last Name', 250);
    table.string('Username', 250);
    table.string('Password (Encrypted)', 250);
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('User');
};
