
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('connections').del()
    .then(function () {
      // Inserts seed entries
      return knex('connections').insert([
        {
          alpha_id: 1,
          beta_id: 2
        },

      ]);
    });
};
