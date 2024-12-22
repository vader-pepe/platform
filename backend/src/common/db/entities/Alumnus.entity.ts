import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Generation } from './Generation.entity.ts';

@Entity()
export class Alumnus {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    graduation_year!: number;

    @ManyToOne(() => Generation)
    generation!: Promise<Generation>;
}
