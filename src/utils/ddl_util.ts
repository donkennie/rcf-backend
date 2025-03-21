import { v4 } from 'uuid';
import { UsersService } from '../components/users/users_service';
import { MemberRole, Users } from '../components/users/users_entity';
import * as config from '../../server_config.json';
import { encryptString } from './common';

export class DDLUtil {

    public static async addDefaultUser(): Promise<boolean> {
        try {
            const service = new UsersService();

            const user: Users = {
                user_id: v4(),
                firstname: 'Super',
                lastname: 'Admin',
                username: 'superadmin',
                memberRole: MemberRole.Admin,
                email: config.default_user.email,
                password: await encryptString(config.default_user.password),
                created_at: new Date(),
                updated_at: new Date()
            };
            const result = await service.create(user);
            console.log('Add Default User Result', result);
            if (result.statusCode === 201) {
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Error while addDefaultRole() => ${error.message}`);
            return false;
        }
    }
}