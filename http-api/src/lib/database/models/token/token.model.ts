

import BaseModel from '../base-model';
import {ITokenModel} from './interfaces';
import {TOKEN_TABLE_NAME} from './constants';

export default class TokenModel extends BaseModel implements ITokenModel {

    static idColumn = 'id';
    static tableName = TOKEN_TABLE_NAME;
    static relationMappings = {

    }
}