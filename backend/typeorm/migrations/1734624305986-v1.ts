import {
    type MigrationInterface,
    type QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class V1_1734624305986 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        // Create "audit" table
        await queryRunner.createTable(
            new Table({
                name: 'audit',
                columns: [
                    {
                        name: 'action',
                        type: 'enum',
                        enum: [
                            'SELF_LOGIN',
                            'SELF_UPDATE',
                            'SELF_DELETE',
                            'CREATE_USER',
                        ],
                    },
                    { name: 'user_id', type: 'uuid' },
                    { name: 'time', type: 'timestamp' },
                ],
            })
        );

        // Create 'user' table
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    { name: 'email', type: 'varchar', isUnique: true },
                    { name: 'password_hash', type: 'text' },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    { name: 'deleted_at', type: 'timestamp', isNullable: true },
                ],
            })
        );

        // Create the 'role' table
        await queryRunner.createTable(
            new Table({
                name: 'role',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'enum',
                        enum: ['EVERYONE', 'ADMIN', 'SUPER_ADMIN', 'ALUMNI'],
                        default: "'EVERYONE'",
                    },
                    { name: 'description', type: 'text', isNullable: true },
                ],
            })
        );

        // Create 'user_roles_role' join table
        await queryRunner.createTable(
            new Table({
                name: 'user_roles_role',
                columns: [
                    { name: 'user_id', type: 'uuid' },
                    { name: 'role_id', type: 'uuid' },
                ],
            })
        );

        // Add foreign keys for 'user_roles_role'
        await queryRunner.createForeignKey(
            'user_roles_role',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'user_roles_role',
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'role',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'identity',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'provider',
                        type: 'enum',
                        enum: ['GOOGLE', 'LINKEDIN'],
                    },
                    { name: 'token', type: 'text' },
                    { name: 'user_id', type: 'uuid' },
                    { name: 'metadata', type: 'jsonb', isNullable: true },
                    { name: 'expires_at', type: 'timestamp' },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'identity',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop "audit" table
        await queryRunner.dropTable('audit');
        // Drop 'user_roles_role' join table
        await queryRunner.dropTable('user_roles_role');

        // Drop 'user' table
        await queryRunner.dropTable('user');

        // Drop the 'role' table
        await queryRunner.dropTable('role');

        await queryRunner.dropTable('identity');
    }
}
