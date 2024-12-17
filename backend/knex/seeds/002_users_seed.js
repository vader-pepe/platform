import { scryptSync, randomUUID } from "crypto";

export const user1ID = randomUUID().toString();
export const user2ID = randomUUID().toString();

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

  // Insert users
  await knex('users').insert([
    { id: user1ID, email: 'user1@example.com', password_hash: hashedPassword, created_at: new Date(), updated_at: new Date() },
    { id: user2ID, email: 'user2@example.com', password_hash: hashedPassword, created_at: new Date(), updated_at: new Date() }
  ]);
}