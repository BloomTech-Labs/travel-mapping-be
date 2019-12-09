
exports.up = function(knex) {

  // Comments Table
  return knex.schema.createTable('comments', table => {

    // comment_id
    table.increments('comment_id').primary();

    // user_id
    table.integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // media_id
    table.integer('media_id')
      .defaultTo(null)
      .references('media_id')
      .inTable('media')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // album_id
    table.integer('album_id')
      .defaultTo(null)
      .references('album_id')
      .inTable('albums')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // parent_id
    table.integer('parent_id')
      .defaultTo(null)
      .references('comment_id')
      .inTable('comments')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // text
    table.text('text', 'longtext')
      .notNullable();

    // created_at
    table.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    // created_at
    table.timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  
};
