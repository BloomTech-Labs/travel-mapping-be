
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, display_name:'Morpheus', email: 'morpheus@thematrix.com'},
        {user_id: 2, display_name:'Goliath',  email: 'goliath@churches.com'},
      ]);
    });
};
