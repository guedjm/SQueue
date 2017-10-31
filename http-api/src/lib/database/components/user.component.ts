

import {IUserComponent} from './interfaces';
import {inject, injectable} from 'inversify';
import {IUserRepository} from '../models/user/interfaces';

@injectable()
export default class UserComponent implements IUserComponent {

    private _userRepository: IUserRepository;

    constructor(@inject('IUserRepository') userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }
}