
exports.up = function(knex) {
  
  // Test Table
  return knex.schema.createTable('test', table => {

    // test_id
    table.bigIncrements('test_id').primary();

    // name
    table.string('name', 255)
      .notNullable();

    // title
    table.string('title', 255)
      .notNullable();

    // description
    table.text('description', 'longtext'))
      .notNullable();

    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.dropTableIfExists('test');
};
