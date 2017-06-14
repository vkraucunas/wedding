exports.up = function(knex, Promise) {
  return knex.schema.createTable('guests', function(table){
    table.increments();
    table.string('fname').notNullable();
    table.string('lname').notNullable();
    table.string('street')
    table.string('city')
    table.string('state')
    table.integer('zip')
    table.boolean('has_rsvpd').defaultTo(false)
    table.boolean('coming').defaultTo(false)
    table.boolean('updated_address').defaultTo(false)
    table.string('dietary').defaultTo(null)
    table.integer('num_guests').defaultTo(0)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guests');
};
