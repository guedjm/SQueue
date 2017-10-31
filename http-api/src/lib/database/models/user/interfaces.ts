

import {IModel, IRepository} from '../interfaces';

export interface IUserModel extends IModel {}
export interface IUserRepository extends IRepository<IUserModel> {

}

export interface IUser {
    id: number;
    pseudo: string;
    email: string;
    firstName: string;
    lastName: string;
    googleId: string;
    facebookId: string;
    createdAt: Date;
}
