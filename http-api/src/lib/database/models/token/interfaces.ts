

import {IModel, IRepository} from '../interfaces';
import {IUser} from '../user/interfaces';

export interface ITokenModel extends IModel {}
export interface ITokenRepository extends IRepository<ITokenModel> {
    findActiveToken(token: string): Promise<IToken>;
}

export interface IToken {
    id: number;
    userId: number;
    token: string;
    expireAt: Date;
    createdAt: Date;
    active: boolean;

    user: IUser;
}
