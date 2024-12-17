// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 4
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
