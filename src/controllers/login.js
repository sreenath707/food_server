const users = require('../models/user')
const jwt = require('jsonwebtoken')

const secret_key = 'bussss'

function signup(req, res) {
  const { username, email, password } = req.body
  users
    .findOne({ username: username })
    .then((user) => {
      if (user) {
        res.send({ signUpSuccess: false, msg: 'account already exists' })
      } else {
        users
          .insertMany([req.body])
          .then(() => {
            let token = jwt.sign(
              { username: username, email: email },
              secret_key
            )
            res.send({
              signUpSuccess: true,
              token: token,
              msg: 'inserted',
            })
          })
          .catch((err) => {
            console.error(err)
            res.send({ signUpSuccess: false, msg: err })
          })
      }
    })
    .catch((err) => {
      res.statusCode = 401
      res.send({ signUpSuccess: false, msg: err })
    })
}

function login(req, res) {
  const { email, password } = req.body
  users
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password == password) {
          let token = jwt.sign(
            { username: user.username, email: user.email },
            secret_key
          )
          // res.cookie("authToken", token);
          res.send({
            loggedIn: true,
            user: { username: user.username, email: user.email },
            token: token,
          })
        } else {
          res.send({ loggedIn: false, msg: 'incorrect password' })
        }
      } else {
        res.send({ loggedIn: false, msg: 'user not found' })
      }
    })
    .catch((err) => {
      console.log(err)
      res.send({ loggedIn: false, msg: err })
    })
}

module.exports = { signup, login }
