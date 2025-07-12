/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
        table.uuid('product_id').primary(); // auto-increment primary key
        table.string('name').notNullable();
        table.text('description').nullable();
        table.decimal('price', 10, 2).notNullable();
        table.decimal('discount_price', 10, 2).nullable();
        table.uuid('category_id').notNullable()
            .references('category_id').inTable('categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('image_url').nullable();
        table.integer('stock_quantity').unsigned().notNullable().defaultTo(0);
        table.integer('sold').unsigned().notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products');
};
