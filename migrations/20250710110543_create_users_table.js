/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.uuid('user_id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('contact_number').nullable();
        table.string('email', 100).notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
