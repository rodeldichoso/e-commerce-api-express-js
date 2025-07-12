/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.uuid('order_id').primary(); // UUID as primary key
        table.uuid('user_id').notNullable()
            .references('user_id').inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.timestamp('order_date').defaultTo(knex.fn.now());
        table.enum('status', ['pending', 'completed', 'canceled']).defaultTo('pending');
        table.decimal('total_amount', 10, 2).notNullable();
        table.string('shipping_address').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders');
};
