/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries in the roles table
  await knex('roles').del();

  // Insert roles data
  await knex('roles').insert([
    { id: 1, name: 'EVERYONE', description: 'Default role for everyone' },
    { id: 2, name: 'SUPER_ADMIN', description: 'Highest privileged role' },
    { id: 3, name: 'ADMIN', description: 'Administrative role with moderate privileges' },
    { id: 4, name: 'ALUMNI', description: 'Role for alumni users' },
  ]);
}