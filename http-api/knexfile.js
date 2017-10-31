const path = require('path');
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';

dotenv.config({
    path: path.resolve(__dirname, `./.env.${env}`)
});


module.exports = {
    client: 'mysql',
    connection: {
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE
    },
    migrations: {
        tableName: 'migrations',
        directory: 'provision/migrations'
    }
};
