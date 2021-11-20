import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { User } from "../model/User";

export class CreateAdminUser1637391963913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
        user.username = "hamdee";
        user.password = "@ncgcoehamdee2";
        user.hashPassword();
        user.role = "ADMIN";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
