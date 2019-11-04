
exports.up = function(knex) {

  // Media Table
  return knex.schema.createTable( 'media', table => {

    // media_id
    table.bigIncrements('media_id').primary();

    // user_id
    table.bigInteger('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // title
    table.string('title', 255)
      .notNullable();

    // caption
    table.text('caption');

    // type
    table.enu('type', ['photo', 'video'])
      .notNullable()
      .defaultTo('photo');

    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('media')
};
