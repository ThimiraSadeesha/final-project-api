import { MigrationInterface, QueryRunner } from "typeorm";

export class _initialSchemaUpdates_1716023678861 implements MigrationInterface {
    name = '_initialSchemaUpdates_1716023678861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(50) NOT NULL, \`permission\` varchar(255) NOT NULL, \`roleStatus\` varchar(15) NOT NULL DEFAULT 'active', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vehicleNumber\` varchar(255) NOT NULL, \`manufactureYear\` varchar(20) NOT NULL, \`vehicleType\` varchar(10) NOT NULL, \`model\` varchar(50) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_c25f8e55528a463596e0555e27\` (\`vehicleNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_incident_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`incidentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_fire\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fireCode\` varchar(50) NOT NULL, \`fireName\` varchar(255) NOT NULL, \`contactNumber\` varchar(50) NOT NULL, \`city\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`province\` varchar(255) NOT NULL, \`areaCovered\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_127c5587f44d1580f4b43d5f57\` (\`fireCode\`), UNIQUE INDEX \`IDX_12ffe6d02c9733bd9433442eac\` (\`fireName\`), UNIQUE INDEX \`IDX_ca497c93a64e0833984fc587b2\` (\`contactNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_hospital\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hospitalCode\` varchar(50) NOT NULL, \`hospitalName\` varchar(255) NOT NULL, \`contactNumber\` varchar(50) NOT NULL, \`city\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`province\` varchar(255) NOT NULL, \`areaCovered\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_f4ccf0bae2cc8584785aa96282\` (\`hospitalCode\`), UNIQUE INDEX \`IDX_4066b8d1cebea8ab3c2ab5a3b2\` (\`contactNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_police\` (\`id\` int NOT NULL AUTO_INCREMENT, \`policeCode\` varchar(50) NOT NULL, \`policeName\` varchar(255) NOT NULL, \`contactNumber\` varchar(50) NOT NULL, \`city\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`province\` varchar(255) NOT NULL, \`areaCovered\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e0d0e52b25bffe2d3bb78cc709\` (\`policeCode\`), UNIQUE INDEX \`IDX_7dcd0a733bf6de80cf92ad8560\` (\`contactNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_incident\` (\`id\` int NOT NULL AUTO_INCREMENT, \`severity\` varchar(255) NOT NULL, \`location\` varchar(255) NULL, \`time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`incidentStatus\` varchar(15) NOT NULL DEFAULT 'Open', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NULL, \`message\` varchar(255) NULL, \`location\` varchar(255) NULL, \`time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`notificationId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_emergency_person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`personName\` varchar(255) NOT NULL, \`relation\` varchar(50) NULL, \`address\` varchar(255) NULL, \`nic\` varchar(15) NOT NULL, \`contactNumber\` varchar(20) NOT NULL, \`email\` varchar(50) NULL, \`gender\` varchar(10) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_b904b2991ef429817df0fb6d7b\` (\`nic\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`nic\` varchar(15) NOT NULL, \`contactNumber\` varchar(20) NULL, \`email\` varchar(50) NULL, \`gender\` varchar(10) NOT NULL, \`address\` varchar(255) NULL, \`city\` varchar(255) NULL, \`district\` varchar(255) NULL, \`province\` varchar(255) NULL, \`userPassword\` varchar(255) NOT NULL, \`userStatus\` varchar(15) NOT NULL DEFAULT 'ACTIVE', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`role_id\` int NULL, \`vehicleId\` int NULL, \`deviceId\` int NULL, \`emergencyPersonId\` int NULL, \`notificationId\` int NULL, UNIQUE INDEX \`IDX_5e4e0c1734d45df908c4e496fe\` (\`nic\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deviceId\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`deviceStatus\` varchar(15) NOT NULL DEFAULT 'active', \`lastMaintenance\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`vehicleId\` int NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_6415182e55b7cdc9fcafd8c567\` (\`deviceId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_device_config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`configType\` varchar(255) NOT NULL, \`deviceStatus\` varchar(15) NOT NULL DEFAULT 'active', \`configBy\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_response\` (\`id\` int NOT NULL AUTO_INCREMENT, \`timestamp\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`responseStatus\` varchar(255) NOT NULL DEFAULT 'Processing', \`responseTime\` varchar(255) NOT NULL, \`incidentId\` int NULL, \`policeDepartmentId\` int NULL, \`fireDepartmentId\` int NULL, \`hospitalDepartmentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_incident_history\` ADD CONSTRAINT \`FK_7be88561dd31fc8695ae89ba007\` FOREIGN KEY (\`incidentId\`) REFERENCES \`tbl_incident\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_incident\` ADD CONSTRAINT \`FK_347bd49a717f4cb43b49ed80f6c\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` ADD CONSTRAINT \`FK_742b26f67b40fd2bfe9c949391f\` FOREIGN KEY (\`notificationId\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_815721470c574aed27ade42da28\` FOREIGN KEY (\`role_id\`) REFERENCES \`tbl_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_149990f41a539081ed237db9814\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`tbl_vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_ee0d1dc41b8998fe757f063d21c\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_37fcf38cbfc4dd085c943ee26e2\` FOREIGN KEY (\`emergencyPersonId\`) REFERENCES \`tbl_emergency_person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_f67cb245d6f30a6a061cf651b42\` FOREIGN KEY (\`notificationId\`) REFERENCES \`tbl_notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` ADD CONSTRAINT \`FK_b976065d84822c4858943bf28ba\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`tbl_vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` ADD CONSTRAINT \`FK_fd633fbb19afd3501aa8894a0c0\` FOREIGN KEY (\`userId\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_device_config\` ADD CONSTRAINT \`FK_f0134289c79e850afc2759639a8\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_response\` ADD CONSTRAINT \`FK_2cf97ed12a826a79f7671997b92\` FOREIGN KEY (\`incidentId\`) REFERENCES \`tbl_incident\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_response\` ADD CONSTRAINT \`FK_380b75c1a0047eddc8197a786c0\` FOREIGN KEY (\`policeDepartmentId\`) REFERENCES \`tbl_police\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_response\` ADD CONSTRAINT \`FK_5463e263408c4e73e727d3f4058\` FOREIGN KEY (\`fireDepartmentId\`) REFERENCES \`tbl_fire\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_response\` ADD CONSTRAINT \`FK_93763bf8e729e80e4bce966b60e\` FOREIGN KEY (\`hospitalDepartmentId\`) REFERENCES \`tbl_hospital\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_response\` DROP FOREIGN KEY \`FK_93763bf8e729e80e4bce966b60e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_response\` DROP FOREIGN KEY \`FK_5463e263408c4e73e727d3f4058\``);
        await queryRunner.query(`ALTER TABLE \`tbl_response\` DROP FOREIGN KEY \`FK_380b75c1a0047eddc8197a786c0\``);
        await queryRunner.query(`ALTER TABLE \`tbl_response\` DROP FOREIGN KEY \`FK_2cf97ed12a826a79f7671997b92\``);
        await queryRunner.query(`ALTER TABLE \`tbl_device_config\` DROP FOREIGN KEY \`FK_f0134289c79e850afc2759639a8\``);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` DROP FOREIGN KEY \`FK_fd633fbb19afd3501aa8894a0c0\``);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` DROP FOREIGN KEY \`FK_b976065d84822c4858943bf28ba\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_f67cb245d6f30a6a061cf651b42\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_37fcf38cbfc4dd085c943ee26e2\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_ee0d1dc41b8998fe757f063d21c\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_149990f41a539081ed237db9814\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_815721470c574aed27ade42da28\``);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` DROP FOREIGN KEY \`FK_742b26f67b40fd2bfe9c949391f\``);
        await queryRunner.query(`ALTER TABLE \`tbl_incident\` DROP FOREIGN KEY \`FK_347bd49a717f4cb43b49ed80f6c\``);
        await queryRunner.query(`ALTER TABLE \`tbl_incident_history\` DROP FOREIGN KEY \`FK_7be88561dd31fc8695ae89ba007\``);
        await queryRunner.query(`DROP TABLE \`tbl_response\``);
        await queryRunner.query(`DROP TABLE \`tbl_device_config\``);
        await queryRunner.query(`DROP INDEX \`IDX_6415182e55b7cdc9fcafd8c567\` ON \`tbl_device\``);
        await queryRunner.query(`DROP TABLE \`tbl_device\``);
        await queryRunner.query(`DROP INDEX \`IDX_5e4e0c1734d45df908c4e496fe\` ON \`tbl_user\``);
        await queryRunner.query(`DROP TABLE \`tbl_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b904b2991ef429817df0fb6d7b\` ON \`tbl_emergency_person\``);
        await queryRunner.query(`DROP TABLE \`tbl_emergency_person\``);
        await queryRunner.query(`DROP TABLE \`tbl_notification\``);
        await queryRunner.query(`DROP TABLE \`tbl_incident\``);
        await queryRunner.query(`DROP INDEX \`IDX_7dcd0a733bf6de80cf92ad8560\` ON \`tbl_police\``);
        await queryRunner.query(`DROP INDEX \`IDX_e0d0e52b25bffe2d3bb78cc709\` ON \`tbl_police\``);
        await queryRunner.query(`DROP TABLE \`tbl_police\``);
        await queryRunner.query(`DROP INDEX \`IDX_4066b8d1cebea8ab3c2ab5a3b2\` ON \`tbl_hospital\``);
        await queryRunner.query(`DROP INDEX \`IDX_f4ccf0bae2cc8584785aa96282\` ON \`tbl_hospital\``);
        await queryRunner.query(`DROP TABLE \`tbl_hospital\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca497c93a64e0833984fc587b2\` ON \`tbl_fire\``);
        await queryRunner.query(`DROP INDEX \`IDX_12ffe6d02c9733bd9433442eac\` ON \`tbl_fire\``);
        await queryRunner.query(`DROP INDEX \`IDX_127c5587f44d1580f4b43d5f57\` ON \`tbl_fire\``);
        await queryRunner.query(`DROP TABLE \`tbl_fire\``);
        await queryRunner.query(`DROP TABLE \`tbl_incident_history\``);
        await queryRunner.query(`DROP INDEX \`IDX_c25f8e55528a463596e0555e27\` ON \`tbl_vehicle\``);
        await queryRunner.query(`DROP TABLE \`tbl_vehicle\``);
        await queryRunner.query(`DROP TABLE \`tbl_role\``);
    }

}
