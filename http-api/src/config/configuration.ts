
import {Store} from 'confidence';
import {IConfiguration} from './interfaces';
import {injectable} from 'inversify';

@injectable()
export default class Configuration implements IConfiguration {

    private _store: any;
    private _criteria: string;

    private _requiredEnvVars: string[] = ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_DATABASE', 'MYSQL_USER', 'MYSQL_PASSWORD',
        'HTTP_API_PORT'];

    constructor() {
        this._criteria = process.env.NODE_ENV || 'development';

        for (let requiredEnvVar of this._requiredEnvVars) {
            if (!process.env[requiredEnvVar]) {
                throw new Error(`${requiredEnvVar} env variable missing`);
            }
        }

        this._store = new Store(this._defaultConfiguration);
    }

    get(key) {
        return this._store.get(key, this._criteria);
    }


    private _defaultConfiguration: any = {
        server: {
            app: {},
        },
        connections: [{
            port: process.env.HTTP_API_PORT,
            labels: ['httpAPI'],
            router: {
                stripTrailingSlash: true
            },
            routes: {
                cors: {
                    $filter: 'env',
                    $base: {
                    },
                    development: {
                        origin: ['*'],
                    }
                }

            }
        }],
        registrations: [{
            plugin: './modules/auth',
            options: {
                select: ['httpAPI']
            }
        }, {
            plugin: './modules/http',
            options: {
                routes: {
                    prefix: '/api'
                },
                select: ['httpAPI']
            }
        }]
    };
}