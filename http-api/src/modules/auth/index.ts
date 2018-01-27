import * as Hapi from 'hapi';
import {authScheme} from './auth.scheme';

let register: any = (server: Hapi.Server, option, next) => {
    server.auth.scheme('auth-scheme', authScheme);

    server.auth.strategy('auth', 'auth-scheme');
    next();
};

register.attributes = require('./package.json');

exports.register = register;