/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('products', function (table) {
        table.uuid('brand_id')
            .nullable()
            .after('image_url') // 👈 This places brand_id after image_url (only works in MySQL)
            .references('brand_id')
            .inTable('brands')
            .onDelete('SET NULL')
            .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('products', function (table) {
        table.dropColumn('brand_id');
    });
};
