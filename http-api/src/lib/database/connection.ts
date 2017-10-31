import * as knex from 'knex';
import {Model} from 'objection';

export function connectToDatabase() {
    const knexInstance = knex({
        client: 'mysql',
        connection: {
            host : process.env.MYSQL_HOST,
            user : process.env.MYSQL_USER,
            password : process.env.MYSQL_PASSWORD,
            database : process.env.MYSQL_DATABASE
        },
        migrations: {
            tableName: 'migrations'
        }
    });

    Model.knex(knexInstance);
}