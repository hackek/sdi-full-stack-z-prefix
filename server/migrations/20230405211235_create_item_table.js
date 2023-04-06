/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.integer('UserId');
    table.foreign('UserId').references('users.id');
    table.string('ItemName', 250).notNullable();
    table.string('Description', 1000).notNullable();
    table.integer('Quantity');
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('items', table => {
    table.dropForeign('UserId')
  })
    .then(function() {
      return knex.schema.dropTableIfExists('items')
    })
};
