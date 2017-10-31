

import {ITokenComponent} from './interfaces';
import {inject, injectable} from 'inversify';
import {ITokenRepository} from '../models/token/interfaces';

@injectable()
export default class TokenComponent implements ITokenComponent {

    private _tokenRepository: ITokenRepository;

    constructor(@inject('ITokenRepository') tokenRepository: ITokenRepository) {
        this._tokenRepository = tokenRepository;
    }

    findActiveToken(token) {
        return this._tokenRepository.findActiveToken(token);
    }
}