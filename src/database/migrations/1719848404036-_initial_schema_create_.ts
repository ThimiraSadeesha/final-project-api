import { MigrationInterface, QueryRunner } from "typeorm";

export class _initialSchemaCreate_1719848404036 implements MigrationInterface {
    name = '_initialSchemaCreate_1719848404036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_insurance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`insuranceCode\` varchar(50) NOT NULL, \`insuranceName\` varchar(255) NOT NULL, \`contactNumber\` varchar(50) NOT NULL, \`city\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`province\` varchar(255) NOT NULL, \`areaCovered\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_fbe21f4dd3e40372da286de88d\` (\`insuranceCode\`), UNIQUE INDEX \`IDX_74ad54ce82b3cf94352ca3909e\` (\`contactNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_74ad54ce82b3cf94352ca3909e\` ON \`tbl_insurance\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbe21f4dd3e40372da286de88d\` ON \`tbl_insurance\``);
        await queryRunner.query(`DROP TABLE \`tbl_insurance\``);
    }

}
