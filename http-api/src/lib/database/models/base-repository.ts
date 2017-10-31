

import {IModel, IRepository, ISchema} from './interfaces';
import {injectable, unmanaged} from 'inversify';

@injectable()
export default class BaseRepository<T extends IModel, U> implements IRepository<T> {

    protected _model;
    protected _schema: ISchema<U>;

    constructor(@unmanaged() model) {
        this._model = model;
    }

    query() {
        return this._model.query();
    }

    find() {
        return this.query()
            .then((result) => this._schema.formatOutput(result));
    }

    findById(id) {
        return this.query()
            .findById(id)
            .then((result) => this._schema.formatOutput(result));
    }

    create(model) {
        return this.query()
            .insert(model)
            .then((result) => this._schema.formatOutput(result));
    }

    updateById(id, model) {
        return this.query()
            .patchAndFetchById(id, model)
            .then((result) => this._schema.formatOutput(result));
    }

    deleteById(id) {
        return this.query()
            .deleteById(id)
            .then(() => true)
    }

    protected outputSingleSchema(query) {
        return query
            .then((result) => {
                if (!Array.isArray(result) || result.length === 1) {
                    return this._schema.formatOutput(result);
                }
            })
    }

    protected outputSchema(query) {
        return query
            .then((result) => {
                if (!Array.isArray(result)) {
                    result = [result];
                }
                return this._schema.formatOutput(result);
            })
    }
}