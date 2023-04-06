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
    {id: 3, FirstName: `Snuffy`, LastName: `Wuffy`, Username: `sw3456`, Password: `3456`}
  ]);

};
