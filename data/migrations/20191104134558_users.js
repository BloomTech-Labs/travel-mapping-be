
exports.up = function(knex) {
  
  // Users Table
  return knex.schema.createTable('users', table => {

    // user_id
    table.increments('user_id').primary();

    // display_name
    table.string('display_name', 255)
      .notNullable();

    // email
    table.string('email', 255)
      .notNullable()
      .unique();

    // password
    table.string('password', 255);

    // is_admin
    table.boolean('is_admin')
      .defaultTo(false);

     // is_superuser
     table.boolean('is_superuser')
      .defaultTo(false);
    
    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());

    // updated_at
    table.timestamp('updated_at')
      .defaultTo(knex.fn.now());

  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
