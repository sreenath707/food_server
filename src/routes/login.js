const express = require('express')
let router = express.Router()
const users = require('../models/user')
const { signup, login } = require('../controllers/login')
const jwt = require('jsonwebtoken')

router.post('/signup', signup)

router.post('/login', login)

router.post('/user', (req, res) => {
  if (!req.body.token) {
    res.statusCode = 401
    res.send('login to access the end point')
    return
  }
  try {
    let user = jwt.verify(req.body.token, 'bussss')
    users
      .findOne(user)
      .then((data) => {
        if (!data) {
          res.statusCode = 401
          res.send({ loggedin: false })
        }
        res.send({ username: data.username, email: user.email })
      })
      .catch((err) => {
        res.statusCode = 401
        res.send(err)
      })
  } catch (err) {
    res.statusCode = 401
    res.send(err)
  }
})

router.post('/refresh', (req, res) => {
  if (!req.body.refreshToken) {
    res.statusCode = 401
    res.send('login to access the end point')
    return
  }
  try {
    let user = jwt.verify(req.body.token, 'buhahahah')
    users
      .findOne(user)
      .then((data) => {
        if (!data) {
          res.statusCode = 401
          res.send({ loggedin: false })
        }
        let token = jwt.sign({ username: username, email: email }, secret_key)
        res.send({ token: token })
      })
      .catch((err) => {
        res.statusCode = 401
        res.send(err)
      })
  } catch (err) {
    res.statusCode = 401
    res.send(err)
  }
})

module.exports = router
