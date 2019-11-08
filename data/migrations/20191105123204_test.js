
exports.up = function(knex) {
  
  // Tests Table
  return knex.schema.createTable('tests', table => {

    // test_id
    table.bigIncrements('test_id').primary();

    // name
    table.string('name', 255)
      .notNullable();

    // title
    table.string('title', 255)
      .notNullable();

    // description
    table.text('description', 'longtext')
      .notNullable();

    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.dropTableIfExists('tests');
};
