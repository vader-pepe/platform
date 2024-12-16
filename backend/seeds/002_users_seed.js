import { scryptSync } from "crypto";

// Pass the password string and get hashed password back
// ( and store only the hashed string in your database)
const encryptPassword = (password, salt) => {
  return scryptSync(password, salt, 32).toString('hex');
};

const HASH_SALT = process.env['SALT'] ?? 'gudang_garam';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries in the users table
  await knex('users').del();

  // Passwords hashed for simplicity
  const hashedPassword = encryptPassword('password', HASH_SALT);

  // Insert users data
  await knex('users').insert([
    {
      id: 1,
      email: 'everyone@example.com',
      password_hash: hashedPassword,
      role_id: 1, // EVERYONE
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      email: 'superadmin@example.com',
      password_hash: hashedPassword,
      role_id: 2, // SUPER_ADMIN
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      email: 'admin@example.com',
      password_hash: hashedPassword,
      role_id: 3, // ADMIN
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 4,
      email: 'alumni@example.com',
      password_hash: hashedPassword,
      role_id: 4, // ALUMNI
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}