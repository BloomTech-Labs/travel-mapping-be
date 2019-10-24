
exports.up = function(knex) {
  return knex.schema
  .createTable('tags', tbl => {
    tbl.increments();
    tbl
    .string('name', 255)
    .notNullable();
    tbl.timestamp('created_at')
    .defaultTo(knex.fn.now());
    })
    .createTable('mediaTags' , tbl =>  {
    tbl.increments();
    tbl
    .integer('media_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('media')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    tbl
    .integer('tag_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('tags')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    tbl
    .timestamp('created_at')
    .defaultTo(knex.fn.now());
    })
    
    .createTable( 'comments' , tbl =>{
    tbl.increments();
    tbl
    .integer('parent_id');
    tbl
    .integer('album_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('albums')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    tbl
    .integer('media_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('media')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    tbl
    .integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    
    })
};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists('comments')
  .dropTableIfExists('mediaTags')
  .dropTableIfExists('tags')

};
