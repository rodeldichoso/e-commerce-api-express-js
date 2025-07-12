/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('brands', function (table) {
        table.uuid('brand_id').primary();
        table.string('brand_name').notNullable();
        table.string('logo_url').nullable();
        table.timestamps(true, true); // created_at and updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('brands');
};
