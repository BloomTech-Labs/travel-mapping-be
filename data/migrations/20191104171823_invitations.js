
exports.up = function(knex) {
  
  // Invitations table
  return knex.schema.createTable('invitations', table => {

    // invitation_id
    table.bigIncrements('invitation_id').primary();

    // user_id
    table.bigInteger('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // invited_user_id
    table.bigInteger('invited_user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // album_id
    table.bigInteger('album_id')
      .notNullable()
      .references('album_id')
      .inTable('albums')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('invitations');
};
