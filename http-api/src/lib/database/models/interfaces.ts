import * as Joi from 'joi';
import {Model, QueryBuilder} from 'objection';

export interface IModel extends Model {

    $parseDatabaseJson(json: any): any;
    $formatDatabaseJson(json: any): any;
}

export interface IRepository<T extends IModel> {

    query(): QueryBuilder<T>;

    find(): Promise<T[]>;
    findById(id: number): Promise<T>;

    create(model: any): Promise<T>;
    updateById(id: number, model: any): Promise<T>;
    deleteById(id: number): Promise<boolean>;
}

export interface ISchema<T> {
    inputKeys(outputSnakeCase?): any;
    outputKeys(outputSnakeCase?): any;
    schema(): Joi.Schema;
    createSchema(): Joi.Schema;
    formatOutput(model: any): T | T[];
}