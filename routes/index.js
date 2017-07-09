var express = require('express');
var router = express.Router();
var queries = require('../db/queries')
var helpers = require('./helpers')

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
      if (data.length !== data[0].guest_limit) {
        data = helpers.matchGuestLimit(data)
      }
      res.render('rsvp4', {
        title: 'RSVP',
        data: data,
        invite_id: inviteID
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

router.post('/rsvp-4', (req, res, next) => {
  const body = req.body;
  const blank = {
    "has_rsvpd": true
  }
  let ids = new Map();

  Object.keys(body).forEach(key => {
    if (key == 'invite_id') {return}
    let id = String(key).split('-')[1];
    ids.set(id);
  });

  Promise.all(Array.from(ids.keys()).map(id => {
    const tmpRsvp = {
      fname: body[`fname-${id}`],
      lname: body[`lname-${id}`],
      coming: body[`coming-${id}`] == 'on',
      dietary: body[`dietary-${id}`],
      id: id || null
    };
    const invite_id = body.invite_id
    let rsvp = Object.assign(blank, tmpRsvp);
    //Not exercising pluse one
    if (rsvp.id == null && !rsvp.coming) { return; }

    //Updating guest
    if(rsvp.id) {
      return queries.updateAttendingGuest(rsvp)
    } else { //add guest
      return new Promise((resolve, reject) => {
        delete rsvp.id
        queries.insertNewGuest(rsvp)
          .then((id) => {
            queries.insertNewIGRecord(parseInt(id), parseInt(invite_id))
            .then(resolve)
            .catch(reject)
          })
          .catch(reject);
      });
    }
  })).then(results => {
    console.log("something happened", results)
  }).catch(err => next(err))


})

module.exports = router;
