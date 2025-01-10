import type {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { readFileSync } from 'fs';

export const packageJSON = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), {
        encoding: 'utf8',
    })
) as Record<string, string>;

// Use only in dev
export const PRIVATE_KEY_DEFAULT_BASE64 =
    'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ3M1MWZsRE9nVVhOaWkKTFhLQWZ0N3dDTTgyd21KVjdvUkNudUluUDNaQVp1b2pJUGZFOXUrWHZPV3dBVnNjQXZXcmY5elBrTUlnV3lvQQplelorc20yZUxwVWJ5Y3ZFVDkvVGhSUTRvWTZNbEZHVTVkUGo1ZVhkT3NManQvaHNCcFp6VFlwY3ZMYVp1V3cwClRoQmZUQit5c1kzQ1ZETVE4dmxxZWMvNUFxTDZaQlNLSlIzYW5vTVZ0eVpwcThGUVhxaHRMU00yVll0OEpmYVMKWXRYM0dISzU2d1FYN2FVZFN4UXdrYUNFNGVqVGJhUk9WYnEyS1g2UGh0WDR1OTl1RlB6Qm83c2l0bzVJcUkyVwpSYk11L1NSYUZvdzFMMUpUMWpkRVZiWGJlUkRKRGUyMHd3cU5Nb3NTRlFCT2RKZGNLY0dOZFBWdjFUaFJFVnlFCkpGQ3hVUnVaQWdNQkFBRUNnZ0VBRHcvVUUwcnRpS0NSNm9iRSs3YVJteDFaVjY3VlBDRWIrbVcyMDY1dWthdWwKWjh2K2FYVU5hQTEzZ0w2TmZrSXZ2bkhUL1d6aHpFbkV2ZWY5MWttYXpQWEgzWFRWd0ZNbzcxY2ZiTk4rQkhjRApLRkpoQS9CSjl0eWdqNCsrSDBMdnBqbXgvT1Fma0FLY0QyNWhkTHUvNHlRZWNqZzlmcE43OEsrTjAyWk1aajFlCitKeC9OdUlnTHFseXdiLzNzbm5yYityY0dKdFpCRFNIZ3J5c3RwVlFDa2dvRVN6cmxRaWM4WkFCTXgwQlpPOG8KdVBEMi9kZlJnZ1Vtc2JocVEwTkxWNXF2K01hazloWGQrQjZOTWhVcTlRazAxcThpdmdwbEdza1F3V0YzVTRSUQp2MVVrbFhKdTJ2VTZuL2x3WklQdlJxWitQTENCRlVPb3lFaTFLT01JRlFLQmdRRFVYTnFlNHdUMzBDL2N2SXAvCnFoNG5kN2JRV0JKZWd6OEdObjdYR29sUHduSmFsRVh2ODJoaloycFIrNWhSSkFlVDYvZUtoSzF0ZzRad3g3QkYKbDlQYUFES1JwOVVqMFZJaEQ3MlMxN2VoaGVYZlZxODBMVWxsM1o2MldvMDVwaDJuYlJ0Y2xyOVdzVEd4VWpsLwp3d3FkMXB4L0Z6VUd2ZVFFN2U4UWZhS01nd0tCZ1FEUWJzaU5uUUUyN3k0clE4OUVKQUV4QTRkejJjSWpoK0NLCkVFZVJlMHY3SHV4SzdjQW9PcHBGeVQ3YjlnVFQ2UE5KQTdpNTZQd0hSMWVVZGRQR0o1M2l1Zjg5SlFhOFc5dUMKei9WdmpCK1N5SVltRktBU0ZJLyt4ZERrWmpzTEowSnBpb1RBZEsyVEhHbEV6QkYyZkJneXpMR1crNHZrQW5DOApuZjBMWlpUMHN3S0JnQVFQWm1xbFFvSU9hK3ZYZXZwbjRUMjE3enZhZ3pkbFlQNFlhcUpvTW5uZzZOak1mdTNRCmhJMXArOEZuZ3drQ0hGYjZxdmZ1QTNiVmpldDRGZW11dG5FemtjUHhKb1VSeW5VeFhObUM0RkxwUVhUY3JtcmIKOXN4SXlYRUpHQ3dpL2V3bWpPQmZUWGMxMmhKZTFSU1pRUW0xZ2JaNFZoNHo0VGtxNTJnMFRyaExBb0dCQUtHcwp2UTN6c2lSOVpJK1V1cW45VDV0SVJJSWRjQlNGYWl0TnMyWHFnS1phZHlrcnYvaTBkRVFiZFJIRGhEMG5uY2FPCkIzVFZmdURhZXRtaWg5RlZtNGRwaE0xVjhpS2JFZXNuQ2hjclZyWlJxcFRSUE5TcGRJUkh4dC9UV0lzdk9ibUsKQTYwUkZDNWZSRnhqK2t1d3VFaDNORzJMMHhmYXVMM2x3b2xia3k0M0FvR0FGcHQvb3BIQTdFaFVuT3liOEswNQpGcTh3cTlkeExXWWdvZndyeHk4OXVUY2g2aDRZWmx5aHNMUHkzYkJQVllkbzg4eVZVMThNaS93a1cvVXliUjJSCnorNmR1VmRJVForYVZxYXRWTWZNdkdTMmZjdTBCeGtMVjZ2bDZqTGw0eUJldElobHlQYWU3NG5uVUdQNGxtbWcKN3BpUkh4YUowUU16bHdLcXA1UHBkUUU9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0=';

// Use only in dev
const PUBLIC_KEY_DEFAULT_BASE64 =
    'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyT2RYNVF6b0ZGellvaTF5Z0g3ZQo4QWpQTnNKaVZlNkVRcDdpSno5MlFHYnFJeUQzeFBidmw3emxzQUZiSEFMMXEzL2N6NURDSUZzcUFIczJmckp0Cm5pNlZHOG5MeEUvZjA0VVVPS0dPakpSUmxPWFQ0K1hsM1RyQzQ3ZjRiQWFXYzAyS1hMeTJtYmxzTkU0UVgwd2YKc3JHTndsUXpFUEw1YW5uUCtRS2krbVFVaWlVZDJwNkRGYmNtYWF2QlVGNm9iUzBqTmxXTGZDWDJrbUxWOXhoeQp1ZXNFRisybEhVc1VNSkdnaE9IbzAyMmtUbFc2dGlsK2o0YlYrTHZmYmhUOHdhTzdJcmFPU0tpTmxrV3pMdjBrCldoYU1OUzlTVTlZM1JGVzEyM2tReVEzdHRNTUtqVEtMRWhVQVRuU1hYQ25CalhUMWI5VTRVUkZjaENSUXNWRWIKbVFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t';

export const AppEnvironments = [
    'development',
    'staging',
    'production',
] as const;
export type AppEnvironment = (typeof AppEnvironments)[number];

export const AppConfigs = [
    {
        key: 'PASSWORD_SALT',
        defaultValue: 'gudang_garam',
    },
    {
        key: 'PASSWORD_HASHED_LENGTH',
        defaultValue: '32',
    },
    {
        key: 'JWT_ALGORITHM',
        defaultValue: 'RS256' as const,
    },
    {
        key: 'JWT_PRIVATE_KEY_BASE64',
        defaultValue: PRIVATE_KEY_DEFAULT_BASE64,
    },
    {
        key: 'JWT_PUBLIC_KEY_BASE64',
        defaultValue: PUBLIC_KEY_DEFAULT_BASE64,
    },
    {
        key: 'JWT_EXPIRES_IN',
        defaultValue: '24h',
    },
    {
        key: 'DB_URI',
        defaultValue: 'postgresql://postgres:postgres@postgres:5432/postgres',
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
    {
        key: 'APP_VERSION',
        defaultValue: packageJSON['version'],
    },
    {
        key: 'APP_DESCRIPTION',
        defaultValue: packageJSON['description'],
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
