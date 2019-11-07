
exports.up = function(knex) {
  
  // Users Table
  return knex.schema.createTable('users', table => {

    // user_id
    table.bigIncrements('user_id').primary();

    // display_name
    table.string('display_name', 255)
      .notNullable();

    // email
    table.string('email', 255)
      .notNullable()
      .unique();

    // is_admin
    table.boolean('is_admin', false);

     // is_superuser
     table.boolean('is_superuser', false);
    
    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());

  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
