import * as Glue from 'glue';
import mainContainer from './ioc/server.container';
import {IConfiguration} from './config/interfaces';
import {connectToDatabase} from './lib/data/connection';


export default class SQueueHttpApiService {

    private _server;
    private _configuration: IConfiguration;

    constructor() {
    }

    public async load() {

            console.log(`Loading service configuration in ${process.env.NODE_ENV} mode`);
            this._configuration = mainContainer.get<IConfiguration>('IConfiguration');

            return Glue.compose(this._configuration.get('/'), {
                relativeTo: __dirname
            }).then((server) => {
                this._server = server;
                return this._server.initialize()
                    .then(() => {
                        connectToDatabase();
                        return true;
                    })
            });
    }

    public async start() {
        return this._server.start()
            .then(() => {
                console.log(`Service started on port ${process.env.HTTP_API_PORT}`);
            });
    }
}