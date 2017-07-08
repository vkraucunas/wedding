var knex = require('./knex')

const Guests = () => knex('guests')
const Invitations = () => knex('invitations')
const GuestsByInvitationId = (id) => Invitations().where('invitations.id', id)
            .join('invitations_guests as ig', 'invitations.id', 'ig.invite_id')
            .join('guests', 'ig.guest_id', 'guests.id')

module.exports = {
  guestRecordExists: (pin) => Invitations().count().where('street', 'like', `${pin}%`),
  findGuestsByPin: (pin) => Invitations().select('guests.fname', 'guests.lname', 'invitations.id').where('street', 'like', `${pin}%`)
            .join('invitations_guests as ig', 'invitations.id', 'ig.invite_id')
            .join('guests', 'ig.guest_id', 'guests.id'),
  findGuestsByInviteId: (id) => GuestsByInvitationId(id),
  notAttending: (id) => GuestsByInvitationId(id)
            .then(data => {
              const guestIds = data.map(guest => guest.id)
              Guests().where('id', guestIds[0]).update('has_rsvpd', true)
              // guestIds.forEach(el => {
              //   console.log("EL IS:", el)
              //   Guests().where('id', el).update({'has_rsvpd': true})
              // })
              return 'done';
            })

}

