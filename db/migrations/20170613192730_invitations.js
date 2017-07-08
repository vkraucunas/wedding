exports.up = function(knex, Promise) {
  return knex.schema.createTable('invitations', function(table){
    table.increments();
    table.integer('guest_limit').defaultTo(2);
    table.string('street')
    table.string('city')
    table.string('state')
    table.integer('zip')
    table.string('phone')
    table.boolean('updated_address').defaultTo(false)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('invitations');
};
