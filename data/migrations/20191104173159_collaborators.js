
exports.up = function(knex) {
  
  // Collaborators Table
  return knex.schema.createTable('collaborators', table => {

    // collaborator_id
    table.increments('collaborator_id').primary();

    // user_id
    table.integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // album_id
    table.integer('album_id')
      .notNullable()
      .references('album_id')
      .inTable('albums')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // permissions
    table.enu('permissions', ['view', 'modify'])
      .notNullable()
      .defaultTo('view');

    // expires_on
    table.timestamp('expires_on')
      .defaultTo(null);

    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('collaborators');
};
