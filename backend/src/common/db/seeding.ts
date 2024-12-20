import { DATA_SOURCE_INSTANCE, getConfig } from '../config';
import { User } from './entities/User.entity.ts';
import { scryptSync } from 'crypto';
import { Role } from './entities/Role.entity.ts';
import { Audit } from './entities/Audit.entity.ts';
import { Logger } from '@nestjs/common';

export async function seedDB(dataSource = DATA_SOURCE_INSTANCE) {
    const logger = new Logger('Seeding');
    logger.log('Seeding started');
    const roleRepository = dataSource.getRepository(Role);
    const roleSuperAdmin = await roleRepository.save({
        name: 'SUPER_ADMIN',
    });
    /*const roleAdmin = await roleRepository.save({
        name: 'ADMIN',
    });
    const roleAlumni = await roleRepository.save({
        name: 'ALUMNI',
    });
    const roleEveryone = await roleRepository.save({
        name: 'EVERYONE',
    });*/

    const userRepository = dataSource.getRepository(User);
    const password = 'password';
    const hashedPassword = scryptSync(
        password,
        getConfig('PASSWORD_SALT'),
        Number(getConfig('PASSWORD_HASHED_LENGTH'))
    ).toString('hex');
    const userSuperAdmin = await userRepository.save({
        email: 'superadmin@localhost.com',
        password_hash: hashedPassword,
        roles: Promise.resolve([roleSuperAdmin]),
    });

    const auditRepository = dataSource.getRepository(Audit);
    await auditRepository.save({
        action: 'CREATE_USER',
        user_id: userSuperAdmin.id,
        time: new Date(),
    });
    logger.log('Seeding done');
}
