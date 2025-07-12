/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('reviews', function (table) {
        table.uuid('review_id').primary();

        table.uuid('product_id').notNullable()
            .references('product_id').inTable('products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.uuid('user_id').notNullable()
            .references('user_id').inTable('users') // assuming users table has 'id' as UUID
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('rating').notNullable(); // rating value like 1–5
        table.text('comment').nullable();

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('reviews');
};
