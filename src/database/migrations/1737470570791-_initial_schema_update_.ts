import { MigrationInterface, QueryRunner } from "typeorm";

export class _initialSchemaUpdate_1737470570791 implements MigrationInterface {
    name = '_initialSchemaUpdate_1737470570791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`emergencyPersonId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_emergency_person\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_emergency_person\` ADD CONSTRAINT \`FK_6c9ebdb9d5b9f700cd6a5a148ae\` FOREIGN KEY (\`userId\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_emergency_person\` DROP FOREIGN KEY \`FK_6c9ebdb9d5b9f700cd6a5a148ae\``);
        await queryRunner.query(`ALTER TABLE \`tbl_emergency_person\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`emergencyPersonId\` int NULL`);
    }

}
