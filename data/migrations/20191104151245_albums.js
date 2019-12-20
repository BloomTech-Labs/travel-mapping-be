
exports.up = function(knex) {

  // Albums Table
  return knex.schema.createTable('albums', table =>  {

    // album_id
    table.increments('album_id').primary();

    // user_id
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // cover_id
    table.integer('cover_id')
      .unsigned()
      .defaultTo(null);

    // access
    table.enu('access', ['public', 'private'])
      .notNullable()
      .defaultTo('public');

    // title
    table.string('title', 255)
      .notNullable();

    // description
    table.text('description', 'longtext')
      .defaultTo(' ');

    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());

    // created_at
    table.timestamp('updated_at')
      .defaultTo(knex.fn.now());
  
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('albums');
};
