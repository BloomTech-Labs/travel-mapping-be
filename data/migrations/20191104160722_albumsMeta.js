
exports.up = function(knex) {

  // albumsMeta Table
  return knex.schema.createTable('albumsMeta', table => {

    // albumMeta_id
    table.increments('albumMeta_id').primary();

    // album_id
    table.integer('album_id')
      .notNullable()
      .references('album_id')
      .inTable('albums')
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
  return knex.schema.dropTableIfExists('albumsMeta');
};
