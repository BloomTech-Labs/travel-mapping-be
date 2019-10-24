
exports.up = function(knex) {
    return knex.shema
    .createTable('albums', tbl =>  {
        tbl.increments().primary;
        tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        tbl
        .string('access', 255)
        .notNullable();
        tbl
        .string('title', 255)
        .notNullable();
        tbl
        .timestamp('created_at')
    .defaultTo(knex.fn.now());
    
    
    })
    
    
};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists('albums')
};
