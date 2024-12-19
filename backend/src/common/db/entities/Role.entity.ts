import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity.ts';

export const RoleNames = [
    'EVERYONE',
    'ADMIN',
    'SUPER_ADMIN',
    'ALUMNI',
] as const;
export type RoleName = (typeof RoleNames)[number];

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'enum',
        enum: RoleNames,
        default: 'EVERYONE',
    })
    name!: RoleName;

    @Column({
        type: 'text',
        nullable: true,
    })
    description?: string | undefined | null;

    @ManyToMany(() => User, (user) => user.roles)
    users!: Promise<User[]>;
}
