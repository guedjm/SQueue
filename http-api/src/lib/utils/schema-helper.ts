import * as _ from 'lodash';

export function convertKeys(obj, keyCase: string) {
    if (keyCase === 'camel') {
        return _.mapKeys(obj, (value: any, key: string) => {
            return _.camelCase(key);
        });
    } else if (keyCase === 'snake') {
        return _.mapKeys(obj, (value: any, key: string) => {
            return _.snakeCase(key);
        });
    }
    return obj
}