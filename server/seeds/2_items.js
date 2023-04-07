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
    {id: 4, UserId: 1, ItemName: 'Dialga', Description: `A legendary Pokémon of Sinnoh. It is said that time flows when Dialga's heart beats.`, Quantity: 0},
    {id: 5, UserId: 9, ItemName: 'Pichu', Description: `The electric sacs in its cheeks are small. If even a little electricity leaks, it becomes shocked.`, Quantity: 25},
    {id: 6, UserId: 8, ItemName: 'Mismagius', Description: `Its cry sounds like an incantation. It is said the cry may rarely be imbued with happiness-giving power.`, Quantity: 90},
    {id: 7, UserId: 6, ItemName: 'Glameow', Description: `It hides its spiteful tendency of hooking its claws into the nose of its Trainer if it isnt fed. When its happy, GLAMEOW demonstrates beautiful movements of its tail, like a dancing ribbon.`, Quantity: 6},
    {id: 8, UserId: 7, ItemName: 'Stunky', Description: `It sprays a foul fluid from its rear. Its stench spreads over a mile radius, driving Pokémon away.`, Quantity: 22},
    {id: 9, UserId: 5, ItemName: 'Chatot', Description: `Its tongue is just like a human’s. As a result, it can cleverly mimic human speech.`, Quantity: 13},
    {id: 10, UserId: 3, ItemName: 'Gabite', Description: `It loves sparkly things. It seeks treasures in caves and hoards the loot in its nest.`, Quantity: 4},
    {id: 11, UserId: 4, ItemName: 'Hippopotas', Description: `It shuts its nostrils tight then travels through sand as if walking. They form colonies of around ten.`, Quantity: 10},
    {id: 12, UserId: 3, ItemName: 'Sneasel', Description: `A smart and sneaky Pokémon. A pair may work together to steal eggs by having one lure the parents away.`, Quantity: 2},
    {id: 13, UserId: 1, ItemName: 'Finneon', Description: `The line running down its side can store sunlight. It shines vividly at night.`, Quantity: 1035},
    {id: 14, UserId: 2, ItemName: 'Toxicroak', Description: `It has a poison sac at its throat. When it croaks, the stored poison is churned for greater potency.`, Quantity: 8},
    {id: 15, UserId: 3, ItemName: 'Unown', Description: `When alone, nothing happens. However, if there are two or more, an odd power is said to emerge.`, Quantity: 666},
    {id: 16, UserId: 1, ItemName: 'Chansey', Description: `A kindly Pokémon that lays highly nutritious eggs and shares them with injured Pokémon or people.`, Quantity: 69},
    {id: 17, UserId: 2, ItemName: 'Rapidash', Description: `When at an all-out gallop, its blazing mane sparkles, enhancing its beautiful appearance.`, Quantity: 7},
    {id: 18, UserId: 3, ItemName: 'Raichu', Description: `Its tail discharges electricity into the ground, protecting it from getting shocked.`, Quantity: 2},
    {id: 19, UserId: 3, ItemName: 'Lopunny', Description: `The ears appear to be delicate. If they are touched roughly, it kicks with its graceful legs.`, Quantity: 1},
    {id: 20, UserId: 4, ItemName: 'Heracross', Description: `It loves sweet honey. To keep all the honey to itself, it hurls rivals away with its prized horn.`, Quantity: 12},
    {id: 21, UserId: 5, ItemName: 'Dustox', Description: `Toxic powder is scattered with each flap. At night, it is known to strip leaves off trees lining boulevards.`, Quantity: 56},
    {id: 22, UserId: 6, ItemName: 'Cranidos', Description: `A lifelong jungle dweller from 100 million years ago, it would snap obstructing trees with head butts.`, Quantity: 1},
    {id: 23, UserId: 6, ItemName: 'Kadabra', Description: `It stares at its silver spoon to focus its mind. It emits more alpha waves while doing so. It possesses strong spiritual power. The more danger it faces, the stronger its psychic power.`, Quantity: 42},
    {id: 24, UserId: 3, ItemName: 'Raichu', Description: `Its tail discharges electricity into the ground, protecting it from getting shocked.`, Quantity: 2},
    {id: 25, UserId: 1, ItemName: 'Gyarados', Description: `In ancient literature, there is a record of a GYARADOS that razed a village when violence flared.	Once it begins to rampage, a GYARADOS will burn everything down, even in a harsh storm.`, Quantity: 5}
  ]);

  // Sets the ID for inserts to be that of the current seed
  await knex.raw('SELECT setval(\'items_id_seq\', (SELECT MAX(id) from "items"));');

};
