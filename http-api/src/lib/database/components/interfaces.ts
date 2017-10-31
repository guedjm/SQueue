

import {IToken} from '../models/token/interfaces';

export interface IUserComponent {

}

export interface ITokenComponent {

    findActiveToken(token: string): Promise<IToken>;
}