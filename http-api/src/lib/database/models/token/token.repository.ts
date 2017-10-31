

import BaseRepository from '../base-repository';
import {IToken, ITokenModel, ITokenRepository} from './interfaces';
import {injectable} from 'inversify';
import TokenModel from './token.model';
import tokenSchema from './token.schema';

@injectable()
export default class TokenRepository extends BaseRepository<ITokenModel, IToken> implements ITokenRepository {

    constructor() {
        super(TokenModel);
        this._schema = tokenSchema;
    }

    findActiveToken(token) {
        const q = this.query()
            .eager('user')
            .where('token', token)
            .where('active', true)
            .where('expire_at', '<', new Date());

        return this.outputSingleSchema(q);
    }
}