import * as _ from 'lodash';
import {Model} from 'objection';
import {IModel} from './interfaces';

export default class BaseModel extends Model implements IModel {

    $parseDatabaseJson(json) {
        return _.mapKeys(json, (value: any, key: string) => {
            return _.camelCase(key);
        });
    }

    $formatDatabaseJson(json) {
        return _.mapKeys(json, (value: any, key: string) => {
            return _.snakeCase(key);
        });
    }
}