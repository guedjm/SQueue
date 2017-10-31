

import {Container} from 'inversify';
import {IUserRepository} from './models/user/interfaces';
import UserRepository from './models/user/user.repository';
import {ITokenRepository} from './models/token/interfaces';
import TokenRepository from './models/token/token.repository';
import {ITokenComponent, IUserComponent} from './components/interfaces';
import TokenComponent from './components/token.component';
import UserComponent from './components/user.component';

const databaseContainer = new Container();

databaseContainer.bind<IUserRepository>('IUserRepository').to(UserRepository).inSingletonScope();
databaseContainer.bind<ITokenRepository>('ITokenRepository').to(TokenRepository).inSingletonScope();


databaseContainer.bind<IUserComponent>('IUserComponent').to(UserComponent).inSingletonScope();
databaseContainer.bind<ITokenComponent>('ITokenComponent').to(TokenComponent).inSingletonScope();


export default databaseContainer;