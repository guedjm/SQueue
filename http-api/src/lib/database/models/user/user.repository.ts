

import BaseRepository from '../base-repository';
import {IUser, IUserModel, IUserRepository} from './interfaces';
import {injectable} from 'inversify';
import UserModel from './user.model';
import userSchema from './user.schema';

@injectable()
export default class UserRepository extends BaseRepository<IUserModel, IUser> implements IUserRepository {

    constructor() {
        super(UserModel);
        this._schema = userSchema;
    }
}