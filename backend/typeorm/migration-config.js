import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    url: 'postgresql://postgres:postgres@127.0.0.1:5432/postgres',
    entities: [join(process.cwd(), '/src/**/*.entity{.ts,.js}')],
    migrations: [join(process.cwd(), '/typeorm/migrations/*{.ts,.js}')],
});
