import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1736753250218 implements MigrationInterface {
    name = 'Migrations1736753250218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "generation" ADD CONSTRAINT "UQ_97ea6861407ef35fd5dc13ad75e" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "generation" DROP CONSTRAINT "UQ_97ea6861407ef35fd5dc13ad75e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

}
