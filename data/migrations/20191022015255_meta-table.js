
exports.up = function(knex) {
  return knex.schema
  .createTable('meta', tbl =>   {
    tbl.increments();
    tbl
    .text('name', 'longtext')
    .notNullable();
    tbl
    .text('value', 'longtext')
    .notNullable();
    tbl
    .timestamp('created_at')
    .defaultTo(knex.fn.now());
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('meta')
};
