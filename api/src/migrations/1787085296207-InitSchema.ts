import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1787085296207 implements MigrationInterface {
    name = 'InitSchema1787085296207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`servicios\` (\`identificacion\` varchar(20) NOT NULL, \`servicio\` varchar(80) NOT NULL, \`fechaInicio\` date NOT NULL, \`ultimaFacturacion\` date NOT NULL, \`ultimoPago\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`identificacion\`, \`servicio\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clientes\` (\`identificacion\` varchar(20) NOT NULL, \`nombres\` varchar(80) NOT NULL, \`apellidos\` varchar(80) NOT NULL, \`tipoIdentificacion\` varchar(2) NOT NULL, \`fechaNacimiento\` date NOT NULL, \`numeroCelular\` varchar(20) NOT NULL, \`correoElectronico\` varchar(80) NOT NULL, PRIMARY KEY (\`identificacion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`servicios\` ADD CONSTRAINT \`servicios_FK1\` FOREIGN KEY (\`identificacion\`) REFERENCES \`clientes\`(\`identificacion\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`servicios\` DROP FOREIGN KEY \`servicios_FK1\``);
        await queryRunner.query(`DROP TABLE \`clientes\``);
        await queryRunner.query(`DROP TABLE \`servicios\``);
    }

}
