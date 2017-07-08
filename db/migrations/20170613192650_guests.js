exports.up = function(knex, Promise) {
  return knex.schema.createTable('guests', function(table){
    table.increments();
    table.string('fname').notNullable()
    table.string('lname').notNullable()
    table.boolean('coming').defaultTo(false)
    table.boolean('has_rsvpd').defaultTo(false)
    table.string('dietary').defaultTo(null)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guests');
};
