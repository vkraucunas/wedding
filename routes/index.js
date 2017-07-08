var express = require('express');
var router = express.Router();
var queries = require('../db/queries')

router.get('/', (req, res, next) => {
  res.render('index', {title: "Home"})
})

router.get('/about', (req, res, next) => {
  res.render('about', {title: "About Us"})
})

router.get('/event', (req, res, next) => {
  res.render('event', {title: "Event Details"})
})

router.get('/rsvp', (req, res, next) => {
  res.render('rsvp1', {title: "RSVP"})
})

router.get('/rsvp-no', (req, res, next) => {
  res.render('rsvp_no', {title: "RSVP Complete"})
})

router.get('/rsvp-2/:pin', (req, res, next) => {
  const pin = parseInt(req.params.pin)
  queries.findGuestsByPin(pin)
    .then(data => {
      res.render('rsvp2', {
        title: 'RSVP',
        data: data
      })
    })
    .catch(err => next(err))
})

router.get('/rsvp-3/:inviteID', (req, res, next) => {
  const inviteID = parseInt(req.params.inviteID)
    res.render('rsvp3', {
      title: 'RSVP',
      id: inviteID
    })
})

router.get('/rsvp-4/:inviteID', (req, res, next) => {
  const inviteID = parseInt(req.params.inviteID)
  queries.findGuestsByInviteId(inviteID)
    .then(data => {
      res.render('rsvp4', {
        title: 'RSVP',
        data: data
      })
    })
})

router.post('/rsvp', (req, res, next) => {
  const pin = req.body.pin
  if (!pin || typeof parseInt(pin) !== 'number') {
    res.render('rsvp1', {
      title: "RSVP",
      error: "Please enter a pin number."
    })
  }
  if (pin == '4439073453') {
    res.redirect('/report')
  }
  queries.guestRecordExists(pin)
    .then(data => {
      const count = parseInt(data[0].count)

      if (count >= 1) {
        res.redirect(`/rsvp-2/${pin}`)
      }
      if (count === 0) {
        res.render('rsvp1', {
          title: 'RSVP',
          error: 'That number doesn\'t match any of our records. Double check your number then please call/text the phone number on your RSVP card.'
        })
      }
    })
    .catch(err => next(err))
})

router.post('/rsvp-3', (req, res, next) => {
  const invitationId = parseInt(req.body.id)
  if(req.body.coming == 'true') {return res.redirect(`/rsvp-4/${invitationId}`)}

  queries.findGuestsByInviteId(invitationId)
    .then((data) => {
      let guestsWhoAreNotAttending = data.map(x=>x.id);
      queries.notAttending(guestsWhoAreNotAttending)
        .then(() => {
          res.redirect('/rsvp-no')
        }).catch(err => next(err))
    })
    .catch(err => next(err))
})

module.exports = router;
