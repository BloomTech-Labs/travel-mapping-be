
module.exports = {

    development: {
      client: "sqlite3",
      useNullAsDefault: true, // needed for sqlite
      connection: {
        filename: "./data/piktorlog.db3"
      },
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      },
      // add the following
      pool: {
        afterCreate: (conn, done) => {
          // runs after a connection is made to the sqlite engine
          conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
        },
      }
    },

    review: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      },
    },

    staging: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      },
    },

    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      },
    },
  }
    