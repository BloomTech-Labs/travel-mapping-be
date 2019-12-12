
exports.up = function(knex) {

  // mediaMeta Table
  return knex.schema.createTable('mediaMeta', table => {

    // mediaMeta_id
    table.increments('mediaMeta_id').primary();

    // media_id
    table.integer('media_id')
      .notNullable()
      .references('media_id')
      .inTable('media')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // name
    table.string('name', 255)
      .notNullable();

    // value
    table.text('value', 'longtext')
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mediaMeta');
};
