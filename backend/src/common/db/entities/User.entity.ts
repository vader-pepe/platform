import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Identity } from './Identity.entity.ts';

export const UserStates = [
    'active',
    'pending_approval',
    'deleted',
    'blocked',
] as const;
export type UserState = (typeof UserStates)[number];

export const Roles = ['EVERYONE', 'ADMIN', 'SUPER_ADMIN', 'ALUMNI'] as const;
export type Role = (typeof Roles)[number];
export function rolesToCSV(roles: Role[]): string {
    return roles.sort().join(',');
}
export function csvToRoles(csv: string): Role[] {
    return csv.split(',').sort() as Role[];
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;

    @Column({ nullable: true, type: 'text' })
    password_hash?: string | undefined; // User's hashed password

    @Column({ enum: Roles, type: 'text' })
    roles!: string; // A user can have 0 or more roles

    @OneToMany(() => Identity, (identity) => identity.user)
    identities!: Promise<Identity[]>;

    @Column({ enum: UserStates, type: 'enum' })
    state!: UserState;

    @CreateDateColumn({ default: new Date() })
    created_at!: Date; // Record creation timestamp

    @UpdateDateColumn()
    updated_at!: Date; // Record update timestamp

    @DeleteDateColumn()
    deleted_at?: Date;
}
