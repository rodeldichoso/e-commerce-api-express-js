/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order_items', function (table) {
        table.uuid('order_item_id').primary(); // UUID for primary key

        table.uuid('order_id').notNullable()
            .references('order_id').inTable('orders')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.uuid('product_id').notNullable()
            .references('product_id').inTable('products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('quantity').unsigned().notNullable().defaultTo(1);

        table.decimal('price', 10, 2).notNullable(); // price at time of order

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('order_items');
};
