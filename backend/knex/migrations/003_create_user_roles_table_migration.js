export async function up(knex) {
  await knex.schema.createTable('user_roles', (table) => {
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE'); // Foreign key to `users`
    table.uuid('role_id').notNullable().references('id').inTable('roles').onDelete('CASCADE'); // Foreign key to `roles`
    table.primary(['user_id', 'role_id']); // Composite primary key
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('user_roles');
}