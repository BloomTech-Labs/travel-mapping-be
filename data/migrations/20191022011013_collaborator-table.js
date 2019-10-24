
exports.up = function(knex) {
  return knex.schema
  .createTable( 'collaborator', collaborator =>  {
    collaborator.increments();
    collaborator.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    collaborator.integer('album_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('albums')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
collaborator
    .timestamp('created_at')
.defaultTo(knex.fn.now());
})


};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('collaborator')
};
