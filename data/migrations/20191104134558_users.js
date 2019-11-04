
exports.up = function(knex) {
  
  return knex.schema.createTable('users', table => {

    // id
    table.increments().primary();

    // display_name
    table.string('display_name', 255)
      .notNullable()

    // email
    table.string('email', 255)
      .notNullable()
      .unique()

    // is_admin
    table.boolean('is_admin', false)
    
    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now())

  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
