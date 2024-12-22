import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Alumnus } from './Alumnus.entity.ts';

@Entity()
export class Generation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'year' })
    entryYear!: number;

    @OneToMany(() => Alumnus, (alumnus) => alumnus.generation)
    alumni!: Promise<Alumnus[]>;
}
