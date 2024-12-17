import {randomUUID} from "crypto";

export const roleID1 = randomUUID().toString();
export const roleID2 = randomUUID().toString();
export const roleID3 = randomUUID().toString();
export const roleID4 = randomUUID().toString();

export async function seed(knex) {
  // Clear existing roles
  await knex('roles').del();

  // Insert roles
  await knex('roles').insert([
    { id: roleID1, name: 'EVERYONE', description: 'Default role for all users' },
    { id: roleID2, name: 'ADMIN', description: 'Admin role' },
    { id: roleID3, name: 'SUPER_ADMIN', description: 'Super admin role' },
    { id: roleID4, name: 'ALUMNI', description: 'Alumni role' }
  ]);
}