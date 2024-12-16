/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('roles', (table) => {
    if (knex.client.config.client === 'sqlite3') {
      table.increments('id'); // SQLite uses integer auto-increment for primary keys.
    } else {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // PostgreSQL UUID.
    }
    table.string('name').notNullable().unique(); // Role name must be unique.
    table.text('description').defaultTo(null); // Optional role description.
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('roles');
}