
import 'reflect-metadata';
import {Container} from 'inversify';
import {IConfiguration} from '../config/interfaces';
import Configuration from '../config/configuration';
import databaseContainer from '../lib/database/database.container';

const mainContainer = new Container();

mainContainer.bind<IConfiguration>('IConfiguration').to(Configuration).inSingletonScope();
// Add sub container

databaseContainer.parent = mainContainer;
export default mainContainer;