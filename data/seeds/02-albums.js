
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('albums').del()
    .then(function () {
      // Inserts seed entries
      return knex('albums').insert([
        {album_id: 1, user_id: 1, access: 'private', title: 'The Red Pill',     description: 'Get out...'},
        {album_id: 2, user_id: 2, access: 'public',  title: 'Where\'s Delilah', description: 'The Church\'s fall'}
      ]);
    });
};
