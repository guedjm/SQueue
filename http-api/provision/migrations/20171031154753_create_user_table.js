
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (t) => {
        t.collate('utf8_general_ci');
        t.increments('id').unsigned().primary();
        t.string('pseudo').notNull();
        t.string('email').notNull();
        t.string('first_name');
        t.string('last_name');
        t.string('google_id');
        t.string('facebook_id');
        t.dateTime('created_at').notNull();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
