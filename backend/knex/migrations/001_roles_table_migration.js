export async function up(knex) {
  await knex.schema.createTable('roles', (table) => {
    table.uuid('id').primary(); // Primary key
    table.string('name').notNullable().unique(); // Role name
    table.text('description').nullable(); // Optional role description
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('roles');
}