import * as Joi from 'joi';
import {ISchema} from '../interfaces';
import {IToken} from './interfaces';
import userSchema from '../user/user.schema';
import {convertKeys} from '../../../utils/schema-helper';

const tokenSchema: ISchema<IToken> = {
    inputKeys: (outputSnakeCase = true) => {
        return convertKeys({
            userId: Joi.number().required(),
            token: Joi.string().required(),
            expireAt: Joi.date().required(),
            createdAt: Joi.date().required(),
            active: Joi.boolean().required()
        }, outputSnakeCase ? 'snake' : 'camel');
    },
    outputKeys: (outputSnakeCase = true) => {
        return convertKeys(Object.assign({
            id: Joi.number().required()
        }, this.inputKeys(outputSnakeCase)), outputSnakeCase ? 'snake' : 'camel')
    },
    schema: () => {
        return Joi.object().keys(this.outputKeys())
            .description('Token model')
            .label('Token');
    },
    createSchema: () => {
        return Joi.object().keys(this.inputKeys())
            .description('Token model')
            .label('Token');
    },
    formatOutput: (model) => {
        const mapToken = (token) => {
            let user;

            if (token.user) {
                user = userSchema.formatOutput(token.user);
            }

            return Object.assign(token, {
                user
            });
        };

        if (Array.isArray(model)) {
            return model.map((token) => mapToken(token));
        } else {
            return mapToken(model);
        }
    }
};

export default tokenSchema;