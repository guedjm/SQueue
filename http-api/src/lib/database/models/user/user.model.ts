

import BaseModel from '../base-model';
import {IUserModel} from './interfaces';
import {USER_TABLE_NAME} from './constants';

export default class UserModel extends BaseModel implements IUserModel {

    static idColumn = 'id';
    static tableName = USER_TABLE_NAME;
    static relationMappings = {

    }
}