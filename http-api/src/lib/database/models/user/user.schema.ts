
import * as Joi from 'joi';
import {ISchema} from '../interfaces';
import {IUser} from './interfaces';
import {convertKeys} from '../../../utils/schema-helper';

const userSchema: ISchema<IUser> = {
    inputKeys: (outputSnakeCase = true) => {
        return convertKeys({
            pseudo: Joi.string().required(),
            email: Joi.string().required(),
            firstName: Joi.string().allow(null),
            lastName: Joi.string().allow(null),
            googleId: Joi.string().allow(null),
            facebookId: Joi.string().allow(null),
            createdAt: Joi.date()
        }, outputSnakeCase ? 'snake': 'camel');
    },
    outputKeys: (outputSnakeCase = true) => {
        return convertKeys(Object.assign({
            id: Joi.number().required()
        }, this.insert(outputSnakeCase)), outputSnakeCase ? 'snake' : 'camel');
    },
    schema: () => {
        return Joi.object().keys(this.outputKeys())
            .description('User Model')
            .label('User');
    },
    createSchema: () => {
        return Joi.object().keys(this.inputKeys())
            .description('User Model')
            .label('User');
    },
    formatOutput: (model) => {
        const mapUser = (user) => {
            return user;
        };

        if (Array.isArray(model)) {
            return model.map((user) => mapUser(user));
        } else {
            return mapUser(model);
        }
    }
};

export default userSchema;