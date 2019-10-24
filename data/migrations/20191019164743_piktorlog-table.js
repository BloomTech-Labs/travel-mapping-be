
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments();
     tbl
      .string('email', 255)
      .notNullable()
      .unique();
    tbl
    .string('display_name', 255)
    .notNullable();
    tbl
    .boolean('is_admin', false);
     tbl
    .timestamp('created_at')
.defaultTo(knex.fn.now());
  })


};

exports.down = function(knex) {
    return knex.schema
    // .dropTableIfExists('comments')
    // .dropTableIfExists('mediaTags')
    // .dropTableIfExists('tags')
    // .dropTableIfExists('meta')
    // .dropTableIfExists('mediaAlbums')
    // .dropTableIfExists('media')
    // .dropTableIfExists('collaborator')
    // .dropTableIfExists('albums')
    .dropTableIfExists('users')
  
};
