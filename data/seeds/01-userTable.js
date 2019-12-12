const bcrypt      = require('bcrypt');
const salt        = parseInt(process.env.PASS_SALT) || 10;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 0, display_name:'TestUser00', email: 'test.user00@mail.com', password: bcrypt.hashSync('TestPass12!@', salt), is_admin: false, is_superuser: false, },
        {user_id: 1, display_name:'TestUser01', email: 'test.user01@mail.com', password: bcrypt.hashSync('TestPass12!@', salt), is_admin: true,  is_superuser: false, },
      ]);
    });
};
