import {ConfigNotFound} from "../errors";

export const AppConfigs = [
    {
        key: 'JWT_SECRET',
        defaultValue: 'gudang_garam'
    },
    {
        key: 'PASSWORD_SALT',
        defaultValue: 'gudang_garam'
    },
    {
        key: 'PASSWORD_HASHED_LENGTH',
        defaultValue: '32'
    },
    {
        key: 'DB_URI',
        defaultValue: 'postgres://postgres:postgres@localhost:5432/postgres'
    },
    {
        key: 'PORT',
        defaultValue: '4000'
    }
] as const
export type AppConfig = typeof AppConfigs[number];

export function getConfig(key: AppConfig['key']): string {
    const value = process.env[key] ?? AppConfigs.find(config => config.key === key)?.defaultValue;
    if (value === undefined || value === null) {
        throw new ConfigNotFound(key)
    }
    return value
}
