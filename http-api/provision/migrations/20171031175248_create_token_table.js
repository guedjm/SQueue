
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tokens', (t) => {
        t.collate('utf8_general_ci');
        t.increments('id').unsigned().primary();
        t.integer('user_id').unsigned().notNull();
        t.string('token').notNull();
        t.dateTime('expire_at').notNull();
        t.dateTime('created_at').notNull();
        t.boolean('active').notNull().default(true);
        t.foreign('user_id').references('users.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tokens');
};
