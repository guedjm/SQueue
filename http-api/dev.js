require('ts-node').register({
    lazy: true,
    project: '.',
    fast: true,
    cache: false

});

process.env.NODE_ENV = 'development';
require('./src/server');
