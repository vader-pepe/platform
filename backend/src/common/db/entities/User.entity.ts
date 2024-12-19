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

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;

    @Column()
    password_hash!: string; // User's hashed password

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles!: Promise<Role[]>; // A user can have 0 or more roles

    @OneToMany(() => Identity, (identity) => identity.user)
    identities!: Promise<Identity[]>;

    @CreateDateColumn()
    created_at!: Date; // Record creation timestamp

    @UpdateDateColumn()
    updated_at!: Date; // Record update timestamp

    @DeleteDateColumn()
    deleted_at?: Date;
}
