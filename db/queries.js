var knex = require('./knex')

const Guests = () => knex('guests')
const Invitations = () => knex('invitations')
const GuestsByInvitationId = (id) => Invitations().where('invitations.id', id)
            .join('invitations_guests as ig', 'invitations.id', 'ig.invite_id')
            .join('guests', 'ig.guest_id', 'guests.id')

module.exports = {
  guestRecordExists: (pin) => Invitations().count().where('street', 'like', `${pin}%`),
  findGuestsByPin: (pin) => Invitations().select('guests.fname', 'guests.lname', 'invitations.id').where('street', 'like', `${pin}%`).andWhere('has_rsvpd', false)
            .join('invitations_guests as ig', 'invitations.id', 'ig.invite_id')
            .join('guests', 'ig.guest_id', 'guests.id'),
  findGuestsByInviteId: (id) => GuestsByInvitationId(id),
  notAttending: (ids) => Guests().whereIn('id', ids).update({'has_rsvpd': true})

}

