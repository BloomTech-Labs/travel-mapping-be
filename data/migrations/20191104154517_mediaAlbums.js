
exports.up = function(knex) {

  // mediaAlbums Table
  return knex.schema.createTable('mediaAlbums', table => {

    // media_id
    table.bigInteger('media_id')
      .notNullable()
      .references('id')
      .inTable('media')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // album_id
    table.bigInteger('album_id')
      .notNullable()
      .references('id')
      .inTable('albums')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mediaAlbums')
};
