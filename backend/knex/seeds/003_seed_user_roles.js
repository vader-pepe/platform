import {user1ID, user2ID} from "./002_users_seed.js";
import {roleID1, roleID3, roleID4} from "./001_seed_roles.js";

export async function seed(knex) {
  // Clear existing user_roles
  await knex('user_roles').del();

  // Insert user-role relationships
  await knex('user_roles').insert([
    { user_id: user1ID, role_id: roleID3 }, // SUPER_ADMIN
    { user_id: user1ID, role_id: roleID1 }, // EVERYONE
    { user_id: user2ID, role_id: roleID1 }, // EVERYONE
    { user_id: user2ID, role_id: roleID4 }  // ALUMNI
  ]);
}