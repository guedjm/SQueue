import * as Hapi from 'hapi';

let register: any = (server: Hapi.Server, option, next) => {

    server.route([

    ]);

    next();
};

register.attributes = require('./package.json');

exports.register = register;
