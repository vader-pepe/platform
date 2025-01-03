import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from './Role.entity.ts';
import { Identity } from './Identity.entity.ts';

export const UserStates = [
    'active',
    'pending_approval',
    'deleted',
    'blocked',
] as const;
export type UserState = (typeof UserStates)[number];

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;

    @Column({ nullable: true })
    password_hash?: string | undefined; // User's hashed password

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles!: Promise<Role[]>; // A user can have 0 or more roles

    @OneToMany(() => Identity, (identity) => identity.user)
    identities!: Promise<Identity[]>;

    @Column({ enum: UserStates, type: 'enum' })
    state!: UserState;

    @CreateDateColumn()
    created_at!: Date; // Record creation timestamp

    @UpdateDateColumn()
    updated_at!: Date; // Record update timestamp

    @DeleteDateColumn()
    deleted_at?: Date;
}
