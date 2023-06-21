import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", function (table) {
    table.increments();
    table.string("title");
    table.decimal("price");
    table.string("description");
    table.string("image");
    table.decimal("rate");
    table.decimal("count");

    table.integer("category_id");
    table.foreign("category_id").references("categories.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products");
}
