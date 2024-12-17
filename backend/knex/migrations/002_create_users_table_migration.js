export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary(); // Primary key
    table.string('email').notNullable().unique(); // User email
    table.string('password_hash').notNullable(); // User password hash
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Creation timestamp
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Update timestamp
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}