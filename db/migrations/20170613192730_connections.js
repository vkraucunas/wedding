exports.up = function(knex, Promise) {
  return knex.schema.createTable('connections', function(table){
    table.integer('alpha_id').notNullable();
    table.integer('beta_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('connections');
};
