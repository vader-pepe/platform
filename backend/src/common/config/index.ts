import type {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';

export const AppEnvironments = [
    'development',
    'staging',
    'production',
] as const;
export type AppEnvironment = (typeof AppEnvironments)[number];

export const AppConfigs = [
    {
        key: 'JWT_SECRET',
        defaultValue: 'gudang_garam',
    },
    {
        key: 'PASSWORD_SALT',
        defaultValue: 'gudang_garam',
    },
    {
        key: 'PASSWORD_HASHED_LENGTH',
        defaultValue: '32',
    },
    {
        key: 'DB_URI',
        defaultValue: 'postgresql://postgres:postgres@localhost:5432/postgres',
    },
    {
        key: 'PORT',
        defaultValue: '4000',
    },
    {
        key: 'API_VERSION',
        defaultValue: 'v1',
    },
    {
        key: 'APP_ENV',
        defaultValue: process.env.NODE_ENV ?? ('development' as AppEnvironment),
    },
] as const;
export type AppConfig = (typeof AppConfigs)[number];

export function getConfig(key: AppConfig['key']): string {
    const value =
        process.env[key] ??
        AppConfigs.find((config) => config.key === key)?.defaultValue;
    if (value === undefined || value === null) {
        throw new ConfigNotFound(key);
    }
    return value;
}

export let DATA_SOURCE_INSTANCE: DataSource;
function setDataSourceInstance(dataSource: DataSource) {
    DATA_SOURCE_INSTANCE = dataSource;
}
export function generateOrmOptions(): TypeOrmModuleAsyncOptions {
    let ormOptions: TypeOrmModuleOptions = {
        type: 'postgres',
        url: getConfig('DB_URI'),
    };
    if (getConfig('APP_ENV') === 'development') {
        ormOptions = {
            ...ormOptions,
            dropSchema: true,
            synchronize: true,
            migrationsRun: true,
            migrations: [join(process.cwd(), '/typeorm/migrations/*{.ts,.js}')],
            entities: [join(process.cwd(), '/src/**/*.entity{.ts,.js}')],
        };
    }
    return {
        useFactory: () => ormOptions,
        dataSourceFactory: async (options) => {
            if (!options) {
                throw new OrmOptionsUndefined('options is undefined');
            }
            const dataSource = await new DataSource(options).initialize();
            setDataSourceInstance(dataSource);
            return dataSource;
        },
    };
}

export class ConfigNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class OrmOptionsUndefined extends Error {
    constructor(message: string) {
        super(message);
    }
}
