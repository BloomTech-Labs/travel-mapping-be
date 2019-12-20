
exports.up = function(knex) {
  
  // mediaKeywords Table
  return knex.schema.createTable('mediaKeywords', table => {

    // media_id
    table.integer('media_id')
      .notNullable()
      .references('media_id')
      .inTable('media')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // keyword_id
    table.integer('keyword_id')
      .notNullable()
      .references('keyword_id')
      .inTable('keywords')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mediaKeywords');
};
