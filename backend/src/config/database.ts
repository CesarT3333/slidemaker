import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

export default (): ConnectionOptions => ({
    type: 'postgres',
    url: process.env.POSTGRES_URL_STRING,
    entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
    migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
    synchronize: false,
    cli: {
        migrationsDir: 'src/db/migrations'
    }
});
