/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()

  // Replaces ALL items table entries
  await knex('items').insert([
    {id: 1, UserId: 3, ItemName: 'Pikachu', Description: `It occasionally uses an electric shock to recharge a fellow PIKACHU that is in a weakened state.`, Quantity: 121},
    {id: 2, UserId: 2, ItemName: 'Pichu', Description: `The electric sacs in its cheeks are small. If even a little electricity leaks, it becomes shocked.`, Quantity: 30},
    {id: 3, UserId: 3, ItemName: 'Raichu', Description: `Its tail discharges electricity into the ground, protecting it from getting shocked.`, Quantity: 2},
    {id: 4, UserId: 1, ItemName: 'Pikachu', Description: `A legendary Pokémon of Sinnoh. It is said that time flows when DIALGA's heart beats.`, Quantity: 0}
  ]);
};
