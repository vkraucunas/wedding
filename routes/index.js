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

router.get('/rsvp-yes/:invite_id', (req, res, next) => {
  const invite_id = req.params.invite_id
  queries.findGuestsByInviteId(invite_id)
    .then((data) => {
      res.render('rsvp_yes', {
        title: "RSVP Complete",
        data: data
      })
    })
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

router.get('/rsvp-3/:invite_id', (req, res, next) => {
  const invite_id = parseInt(req.params.invite_id)
    res.render('rsvp3', {
      title: 'RSVP',
      id: invite_id
    })
})

router.get('/rsvp-4/:invite_id', (req, res, next) => {
  const invite_id = parseInt(req.params.invite_id)
  queries.findGuestsByInviteId(invite_id)
    .then(data => {
      if (data.length !== data[0].guest_limit) {
        data = helpers.matchGuestLimit(data)
      }
      res.render('rsvp4', {
        title: 'RSVP',
        data: data,
        invite_id: invite_id
      })
    })
})

router.get('/update-address/:invite_id', (req, res, next) => {
  const invite_id = req.params.invite_id

  queries.getAddressByInviteId(invite_id)
    .then((data) => {
      let stateSelectionList = helpers.states.map(x=>{
        x.selected = data[0].state == x.abbr
        return x;
      })
      res.render('update_address', {
        title: "Update Address",
        data: data[0],
        states: stateSelectionList,
        invite_id: invite_id
      })
    })
    .catch(err => next(err))
})

router.get('/report', (req, res, next) => {
  let totalGuestCount = queries.guestCount
  let totalRSVPCount = queries.rsvpCount
  let totalGuestsComing = queries.guestsComingCount
  let guestsNotRSVPdYet = queries.guestsNotRSVPdYet
  let dietaryRestrictions = queries.dietaryRestrictions
  let updatedAddresses = queries.updatedAddresses

  Promise.all([
    totalGuestCount(),
    totalRSVPCount(),
    totalGuestsComing(),
    guestsNotRSVPdYet(),
    dietaryRestrictions(),
    updatedAddresses()
  ]).then(data => {
    let result = {
      guestCount: parseInt(data[0][0].count),
      rsvpCount: parseInt(data[1][0].count),
      guestsComingCount: parseInt(data[2][0].count),
      guestsNotResponded: data[3],
      dietaryRestrictions: data[4],
      updatedAddresses: data[5]
    }
    result.responseRate = parseInt((result.rsvpCount / result.guestCount) * 100)
    res.render('report', {
      title: "Report",
      data: result
    })
    }).catch(next)


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
  const invite_id = parseInt(req.body.id)
  if(req.body.coming == 'true') {return res.redirect(`/rsvp-4/${invite_id}`)}

  queries.findGuestsByInviteId(invite_id)
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
  const needToUpdateAddress = body.updated_address == 'on'
  const blank = {
    "has_rsvpd": true
  }
  let ids = new Map();
  const invite_id = body.id

  Object.keys(body).forEach(key => {
    if (key == 'invite_id') {return}
    let id = String(key).split('-')[1];
    if(id || id === '') {
      ids.set(id);
    }

  });
  Promise.all(Array.from(ids.keys()).map(id => {
    let tmpRsvp = {
      fname: body[`fname-${id}`],
      lname: body[`lname-${id}`],
      coming: body[`coming-${id}`] == 'on',
      dietary: body[`dietary-${id}`] || null
    };
    if (id && id !== '') {
      tmpRsvp.id = id;
    }
    let rsvp = Object.assign({},blank, tmpRsvp);
    //Not exercising pluse one
    if (!rsvp.id && !rsvp.coming) { return; }

    //Updating guest
    if(id && id !== '') {
      rsvp.id = id
      console.log('====================================');
      console.log("UPDATING A GUEST", rsvp);
      console.log('====================================');
      return queries.updateAttendingGuest(rsvp)
    } else { //add guest
      console.log('====================================');
      console.log("ADDING A GUEST", rsvp);
      console.log('====================================');
      return new Promise((resolve, reject) => {
        queries.insertNewGuest(rsvp)
          .then((id) => {
            console.log("insertNewGuest complete.", id)
            queries.insertNewIGRecord(parseInt(id), parseInt(invite_id))
            .then(resolve)
            .catch(reject)
          })
          .catch(err => {console.log(err); reject(err)});
      });
    }
  })).then(results => {
    if (!needToUpdateAddress) {return res.redirect(`/rsvp-yes/${invite_id}`)}
    res.redirect(`/update-address/${invite_id}`)
  }).catch(err => next(err))


})

router.post('/update-address', (req, res, next) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  const invite_id = req.body.id
  let body = req.body
  body.updated_address = true
  body.zip = parseInt(body.zip)
  body.id = parseInt(body.id)
  queries.updateAddress(body)
    .then(() => res.redirect(`/rsvp-yes/${invite_id}`))
})

module.exports = router;
