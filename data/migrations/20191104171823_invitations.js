
exports.up = function(knex) {
  
  // Invitations table
  return knex.schema.createTable('invitations', table => {

    // invitation_id
    table.increments('invitation_id').primary();

    // user_id
    table.integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // invited_user_id
    table.integer('invited_user_id')
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
    
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('invitations');
};
