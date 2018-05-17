// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PGHOST || '127.0.0.1',
      database: process.env.PGDATABASE || 'gis',
      user: process.env.PGUSER || 'docker',
      password: process.env.PGPASSWORD || 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
