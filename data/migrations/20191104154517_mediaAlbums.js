
exports.up = function(knex) {

  // mediaAlbums Table
  return knex.schema.createTable('mediaAlbums', table => {

    // media_id
    table.integer('media_id')
      .notNullable()
      .references('media_id')
      .inTable('media')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // album_id
    table.integer('album_id')
      .notNullable()
      .references('album_id')
      .inTable('albums')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mediaAlbums')
};
