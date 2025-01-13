import { DATA_SOURCE_INSTANCE, getConfig } from '../config';
import { rolesToCSV, User } from './entities/User.entity.ts';
import { scryptSync } from 'crypto';
import { Audit } from './entities/Audit.entity.ts';
import { Logger } from '@nestjs/common';

export async function seedDB(dataSource = DATA_SOURCE_INSTANCE) {
    const logger = new Logger('Seeding');
    logger.log('Seeding started');

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
        roles: rolesToCSV(['SUPER_ADMIN']),
        state: 'active',
    });

    const userAdmin = await userRepository.save({
        email: 'admin@localhost.com',
        password_hash: hashedPassword,
        roles: rolesToCSV(['ADMIN']),
        state: 'active',
    });

    const userPending = await userRepository.save({
        email: 'pending@localhost.com',
        password_hash: hashedPassword,
        roles: rolesToCSV(['EVERYONE']),
        state: 'pending_approval',
    });

    const auditRepository = dataSource.getRepository(Audit);
    await auditRepository.save({
        action: 'CREATE_USER',
        user_id: userSuperAdmin.id,
        time: new Date(),
    });
    await auditRepository.save({
        action: 'CREATE_USER',
        user_id: userAdmin.id,
        time: new Date(),
    });
    await auditRepository.save({
        action: 'CREATE_USER',
        user_id: userPending.id,
        time: new Date(),
    });
    logger.log('Seeding done');
}
