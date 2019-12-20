
exports.up = function(knex) {
  
  // Keywords Table
  return knex.schema.createTable('keywords', table => {

    // keyword_id
    table.increments('keyword_id').primary();

    // name
    table.string('name', 255)
      .notNullable();

    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('keywords');
};
