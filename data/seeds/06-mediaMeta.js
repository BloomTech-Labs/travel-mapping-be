
exports.seed = function(knex) {

  // Deletes ALL existing entries
  return knex('mediaMeta').del()
    .then(function () {
      
      // Inserts seed entries
      // return knex('albums').insert([
      //   {album_id: 0, user_id: 0, access: 'public', title: 'An Album Title',      description: 'An Album Description' },
      //   {album_id: 1, user_id: 1, access: 'public', title: 'Another Album Title', description: 'Another Album Description'}
      // ]);
    });
};