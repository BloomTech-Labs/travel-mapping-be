
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 0, display_name:'Morpheus', email: 'morpheus@thematrix.com', is_admin: false, is_superuser: false, },
        {user_id: 1, display_name:'Goliath',  email: 'goliath@churches.com',   is_admin: true, is_superuser: false, },
      ]);
    });
};
