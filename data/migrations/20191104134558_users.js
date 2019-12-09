const environment = process.env.NODE_ENV || 'development';

// Get database.
let database = 'sqlite';
switch (environment) {

  default:
  case 'development':
  case 'testing':
    database = 'sqlite';
    break;
  case 'review':
  case 'staging':
  case 'production':
    database = 'postgresql';
    break;

};

exports.up = function(knex) {
  
  // Users Table
  return knex.schema.createTable('users', table => {

    // user_id
    if (database = 'sqlite') table.bigIncrements('user_id').primary();
    else table.bigSerial('user_id').primary();
    

    // display_name
    table.string('display_name', 255)
      .notNullable();

    // email
    table.string('email', 255)
      .notNullable()
      .unique();

    // password
    table.string('password', 255);

    // is_admin
    table.boolean('is_admin')
      .defaultTo(false);

     // is_superuser
     table.boolean('is_superuser')
      .defaultTo(false);
    
    // created_at
    table.timestamp('created_at')
      .defaultTo(knex.fn.now());

    // updated_at
    table.timestamp('updated_at')
      .defaultTo(knex.fn.now());

  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
