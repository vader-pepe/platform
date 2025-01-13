import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1736686540737 implements MigrationInterface {
    name = 'Migrations1736686540737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."identity_provider_enum" AS ENUM('GOOGLE', 'LINKEDIN')`);
        await queryRunner.query(`CREATE TABLE "identity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" "public"."identity_provider_enum" NOT NULL, "token" character varying NOT NULL, "metadata" jsonb, "expires_at" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_ff16a44186b286d5e626178f726" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_state_enum" AS ENUM('active', 'pending_approval', 'deleted', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" text, "roles" text NOT NULL, "state" "public"."user_state_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2025-01-12T12:55:43.023Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "survey_id" character varying NOT NULL, "survey_link" character varying NOT NULL, "participant_email" character varying NOT NULL, "participant_answer" jsonb NOT NULL, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alumnus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "graduation_year" integer NOT NULL, "generationId" uuid, CONSTRAINT "UQ_8a556d1ae682e0fa4492a00dab2" UNIQUE ("email"), CONSTRAINT "PK_c04e1638aa67570d77e04eab3e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "generation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "entryYear" integer NOT NULL, CONSTRAINT "PK_58db1b8155c99c2604394ffef2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."audit_action_enum" AS ENUM('SELF_LOGIN', 'SELF_UPDATE', 'SELF_DELETE', 'CREATE_USER', 'APPROVE_USER')`);
        await queryRunner.query(`CREATE TABLE "audit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" "public"."audit_action_enum" NOT NULL, "user_id" character varying NOT NULL, "time" TIMESTAMP NOT NULL, CONSTRAINT "PK_1d3d120ddaf7bc9b1ed68ed463a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "identity" ADD CONSTRAINT "FK_12915039d2868ab654567bf5181" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alumnus" ADD CONSTRAINT "FK_3f6489d06807782778c8c2c8411" FOREIGN KEY ("generationId") REFERENCES "generation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alumnus" DROP CONSTRAINT "FK_3f6489d06807782778c8c2c8411"`);
        await queryRunner.query(`ALTER TABLE "identity" DROP CONSTRAINT "FK_12915039d2868ab654567bf5181"`);
        await queryRunner.query(`DROP TABLE "audit"`);
        await queryRunner.query(`DROP TYPE "public"."audit_action_enum"`);
        await queryRunner.query(`DROP TABLE "generation"`);
        await queryRunner.query(`DROP TABLE "alumnus"`);
        await queryRunner.query(`DROP TABLE "survey"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_state_enum"`);
        await queryRunner.query(`DROP TABLE "identity"`);
        await queryRunner.query(`DROP TYPE "public"."identity_provider_enum"`);
    }

}
