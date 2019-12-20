
exports.seed = function(knex) {

  // Deletes ALL existing entries
  return knex('albums').del()
    .then(function () {
      
      // Inserts seed entries
      return knex('albums').insert([
        {album_id: 0, user_id: 0, access: 'public', title: 'An Album Title',      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        {album_id: 1, user_id: 1, access: 'public', title: 'Another Album Title', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {album_id: 2, user_id: 0, access: 'private', title: 'Album One',      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        {album_id: 3, user_id: 0, access: 'private', title: 'Album Two',      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        {album_id: 4, user_id: 0, access: 'public', title: 'Album Three',      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        {album_id: 5, user_id: 0, access: 'public', title: 'Album Four',      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        {album_id: 6, user_id: 0, access: 'public', title: 'Album Five',      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      ]);
    });
};
