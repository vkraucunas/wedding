var knex = require('./knex')

const Guests = () => knex('guests')
const Invitations = () => knex('invitations')
const IG = () => knex('invitations_guests')
const GuestsByInvitationId = (id) => Invitations().where('invitations.id', id)
            .join('invitations_guests as ig', 'invitations.id', 'ig.invite_id')
            .join('guests', 'ig.guest_id', 'guests.id')

module.exports = {
  guestRecordExists: (pin) => Invitations().count().where('street', 'like', `${pin}%`),
  findGuestsByPin: (pin) => Invitations().select('guests.fname', 'guests.lname', 'invitations.id').where('street', 'like', `${pin}%`).andWhere('has_rsvpd', false)
            .join('invitations_guests as ig', 'invitations.id', 'ig.invite_id')
            .join('guests', 'ig.guest_id', 'guests.id'),
  findGuestsByInviteId: (id) => GuestsByInvitationId(id),
  notAttending: (ids) => Guests().whereIn('id', ids).update({'has_rsvpd': true}),
  updateAttendingGuest: (guestObj) => Guests().where('id', guestObj.id).update(guestObj),
  insertNewGuest: (guestObj) => Guests().insert(guestObj).returning('id'),
  insertNewIGRecord: (guest_id, invite_id) => IG().insert({guest_id: guest_id, invite_id: invite_id}).returning('invite_id'),
  getAddressByInviteId: (id) => Invitations().select('street', 'city', 'state','zip').where('id', id)

}

