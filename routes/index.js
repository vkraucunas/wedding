var express = require('express');
var router = express.Router();

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
  res.render('rsvp', {title: "RSVP"})
})

router.get('/login', (req, res, next) => {
  res.render('login', {title: "login"})
})

router.post('/login', (req, res, next) => {
  res.render('login', {title: "login"})
})

router.get('/logout', (req, res, next) => {
  res.redirect('/')
})

module.exports = router;
