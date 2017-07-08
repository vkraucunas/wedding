
exports.up = function(knex, Promise) {
  return knex.schema.createTable('invitations_guests', function(table){
    table.increments();
    table.integer('guest_id').notNullable()
    table.integer('invite_id').notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('invitations_guests');
};
