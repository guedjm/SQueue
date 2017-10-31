import * as Boom from 'boom';
import * as Hapi from 'hapi';
import {ITokenComponent} from '../../lib/database/components/interfaces';
import databaseContainer from '../../lib/database/database.container';
import {IToken} from '../../lib/database/models/token/interfaces';

function authScheme(server: Hapi.Server, options) {
    return {
        authenticate: (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            if (!request.headers.authorization) {
                reply(Boom.unauthorized(`Auth required`));
                return;
            }

            const authorizationHeader = request.headers.authorization.split(' ');
            if (authorizationHeader.length !== 2 || authorizationHeader[0] !== 'Bearer') {
                reply(Boom.unauthorized(`Invalid authorization header`));
                return;
            }

            const tokenComponent: ITokenComponent = databaseContainer.get<ITokenComponent>('ITokenComponent');

            return tokenComponent.findActiveToken(authorizationHeader[1])
                .then((token: IToken) => {
                    if (!token) {
                        reply(Boom.unauthorized(`Invalid token`));
                    } else {
                        reply.continue({
                            credentials: token,
                            artifacts: {
                                user: token.user
                            }
                        })
                    }
                });
        }
    }
}

let register: any = (server: Hapi.Server, option, next) => {
    server.auth.scheme('auth-scheme', authScheme);

    server.auth.strategy('auth', 'auth-scheme');
    next();
};

register.attributes = require('./package.json');

exports.register = register;