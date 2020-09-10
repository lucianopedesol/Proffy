import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //Criando o relacionamento entre tabelas 
        // Salvando qual o usuario (professor) que vai dar essa aula
        table.integer('user_id')
            .notNullable()
            .references('id')   // refencia o campo ID
            .inTable('users')  // dentro da tabela Users
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}