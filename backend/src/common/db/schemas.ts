export const RoleNames = ["EVERYONE", "ADMIN", "SUPER_ADMIN", "ALUMNI"] as const;
export type RoleName = typeof RoleNames[number];

export type Role = {
    id: string; // UUID for the role's primary key
    name: RoleName; // Role name (e.g., SUPER_ADMIN, ADMIN, etc.)
    description?: string | null; // Optional role description
};

export type User = {
    id: string; // UUID for the user's primary key
    email: string; // User's email address
    password_hash: string; // User's hashed password
    created_at: Date; // Record creation timestamp
    updated_at: Date; // Record update timestamp
    roles?: Role[]; // A user can have 0 or more roles
};

export type UserRole = {
    user_id: string; // UUID referencing `User` id
    role_id: string; // UUID referencing `Role` id
};