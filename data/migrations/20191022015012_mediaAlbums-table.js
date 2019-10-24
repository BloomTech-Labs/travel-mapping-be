
exports.up = function(knex) {
  return knex.schema
  .createTable('mediaAlbums', tbl=>   {
    tbl
    .integer('media_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('media')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    tbl
    .integer('albums_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('albums')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');

})


};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('mediaAlbums')
};
