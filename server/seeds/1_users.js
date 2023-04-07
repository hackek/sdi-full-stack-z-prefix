/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  //
  await knex.schema.raw('TRUNCATE users CASCADE')

  // Deletes ALL existing entries
  await knex('users').del()

  // Replaces ALL users table entries
  await knex('users').insert([
    {id: 1, FirstName: `John`, LastName: `Doe`, Username: `jd1234`, Password: `1234`},
    {id: 2, FirstName: `Sam`, LastName: `Iam`, Username: `si2345`, Password: `2345`},
    {id: 3, FirstName: `Snuffy`, LastName: `Wuffy`, Username: `sw3456`, Password: `3456`},
    {id: 4, FirstName: `Terry`, LastName: `Cruz`, Username: `tc4567`, Password: `4567`},
    {id: 5, FirstName: `Daniel`, LastName: `Freeman`, Username: `df5678`, Password: `5678`},
    {id: 6, FirstName: `Adam`, LastName: `Sandler`, Username: `as6789`, Password: `6789`},
    {id: 7, FirstName: `Mary`, LastName: `Ann`, Username: `ma7890`, Password: `7890`},
    {id: 8, FirstName: `Billy`, LastName: `Joel`, Username: `bj8901`, Password: `8901`},
    {id: 9, FirstName: `Lane`, LastName: `Stanler`, Username: `ls9012`, Password: `9012`}
  ]);

  // Sets the ID for inserts to be that of the current seed
  await knex.raw('SELECT setval(\'users_id_seq\', (SELECT MAX(id) from "users"));');

};
