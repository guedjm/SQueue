import * as path from 'path';
import * as dotenv from 'dotenv';
import SQueueHttpApiService from './service';

const env = process.env.NODE_ENV || 'development';
dotenv.config({
    path: path.resolve(__dirname, `../.env.${env}`)
});

const service = new SQueueHttpApiService();

service.load()
    .then(() => service.start())
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
});