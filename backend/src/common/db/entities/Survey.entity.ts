import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Survey {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    survey_id!: string;

    @Column()
    survey_link!: string;

    @Column()
    participant_email!: string;

    @Column({ type: 'jsonb' })
    participant_answer!: Record<string, unknown>;
}
