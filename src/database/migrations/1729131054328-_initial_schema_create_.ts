import { MigrationInterface, QueryRunner } from "typeorm";

export class _initialSchemaCreate_1729131054328 implements MigrationInterface {
    name = '_initialSchemaCreate_1729131054328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`contactNumber\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`gender\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`district\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`province\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`userPassword\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`userStatus\` varchar(15) NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`role_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`vehicleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`deviceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`emergencyPersonId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`notificationId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`email\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` ADD CONSTRAINT \`FK_742b26f67b40fd2bfe9c949391f\` FOREIGN KEY (\`notificationId\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_815721470c574aed27ade42da28\` FOREIGN KEY (\`role_id\`) REFERENCES \`tbl_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_149990f41a539081ed237db9814\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`tbl_vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_ee0d1dc41b8998fe757f063d21c\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_37fcf38cbfc4dd085c943ee26e2\` FOREIGN KEY (\`emergencyPersonId\`) REFERENCES \`tbl_emergency_person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_f67cb245d6f30a6a061cf651b42\` FOREIGN KEY (\`notificationId\`) REFERENCES \`tbl_notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_f67cb245d6f30a6a061cf651b42\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_37fcf38cbfc4dd085c943ee26e2\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_ee0d1dc41b8998fe757f063d21c\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_149990f41a539081ed237db9814\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_815721470c574aed27ade42da28\``);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` DROP FOREIGN KEY \`FK_742b26f67b40fd2bfe9c949391f\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`notificationId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`emergencyPersonId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`deviceId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`vehicleId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`userStatus\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`userPassword\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`province\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`district\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP COLUMN \`contactNumber\``);
    }

}
