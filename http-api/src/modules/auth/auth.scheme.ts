import * as Hapi from 'hapi';
import * as Boom from 'boom';
import {IToken} from '../../lib/data/models/token/interfaces';
import databaseContainer from '../../lib/data/database.container';
import {ITokenComponent} from '../../lib/data/components/interfaces';

export function authScheme(server: Hapi.Server, options) {
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