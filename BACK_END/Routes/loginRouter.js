const express = require("express");
//const User = require('../models/userModel');
//const usersController = require('../controllers/users');
const loginRouter = express.Router();

const passport = require('passport')

let users = [
    {
      id: 1,
      name: "Jude",
      email: "user@email.com",
      password: "password"
    },
    {
      id: 2,
      name: "Emma",
      email: "emma@email.com",
      password: "password2"
    }
]

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
}

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, 
(username, password, done) => {
    let user = users.find((user) => {
        return user.email === username && user.password === password
    })
    
    if (user) {
        done(null, user)
    } else {
        done(null, false, {message: 'Incorrect username or password'})
    }
}
))

passport.serializeUser((user, done) => {
done(null, user.id)
})

passport.deserializeUser((id, done) => {
let user = users.find((user) => {
    return user.id === id
})

done(null, user)
})


//get raiz, trae listado 
//post raiz, agrega user
loginRouter.post('/', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(400).send([user, "Cannot log in", info]);
      }
  
      req.login(user, err => {
        res.send("Logged in");
      });
    })(req, res, next);
  
});


loginRouter.get("/logout", function(req, res) {
    req.logout();
  
    console.log("logged out")
  
    return res.send();
});


loginRouter.get("/user", authMiddleware, (req, res) => {
    let user = users.find(user => {
      return user.id === req.session.passport.user
    })
  
    console.log([user, req.session])
  
    res.send({ user: user })
})



module.exports = loginRouter;
