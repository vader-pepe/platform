/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    if (knex.client.config.client === 'sqlite3') {
      table.increments('id'); // SQLite primary key (integer auto-increment).
      table.integer('role_id').notNullable(); // Foreign key for roles.
    } else {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // PostgreSQL UUID.
      table.uuid('role_id').notNullable(); // Foreign key for roles.
    }
    table.string('email').notNullable().unique(); // User's email address.
    table.string('password_hash').notNullable(); // Hashed password.
    table.timestamp('created_at').defaultTo(
        knex.client.config.client === 'sqlite3' ? knex.raw('CURRENT_TIMESTAMP') : knex.fn.now()
    ); // Handle SQLite vs PostgreSQL timestamps.
    table.timestamp('updated_at').defaultTo(
        knex.client.config.client === 'sqlite3' ? knex.raw('CURRENT_TIMESTAMP') : knex.fn.now()
    );

    // Foreign key constraint for role_id
    table
        .foreign('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}