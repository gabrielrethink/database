import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("books", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.integer("author_id");
    table.foreign("author_id").references("authors.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("books");
}
