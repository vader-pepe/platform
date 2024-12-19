import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const Actions = [
    'SELF_LOGIN',
    'SELF_UPDATE',
    'SELF_DELETE',
    'CREATE_USER',
] as const;
export type Action = (typeof Actions)[number];

@Entity()
export class Audit {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ enum: Actions, type: 'enum' })
    action!: Action;

    @Column()
    user_id!: string;

    @Column()
    time!: Date;
}
