const express = require("express");
const User = require('../models/userModel');
//const usersController = require('../controllers/users');
//const loginRouter = express.Router();
const loginRouter = require('express-promise-router')();

const passport = require('passport');
const passportConf = require('../passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });



const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
}


//Para registrarse
loginRouter.route('/signup')
  .post(async  (req, res, next) => {
    const { username, password,nombre,apellido,edad } = req.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "username": username });
    console.log("username: " + username) ;
    if (foundUser) { 
      console.log( "entre al if del usuario - encontre uno");
      return res.status(403).json({ error: 'El username ya esta en uso'});
    }

    // Create a new user
    const newUser = new User({ 
      password: password,
      username : username,
      nombre: nombre,
      apellido: apellido,
      edad: edad
    });

    await newUser.save();

    // Generate the token
    //const token = signToken(newUser);
    // Respond with token
    //res.status(200).json({ token });
    return res.send();
});
  
/*// Old login
//get raiz, trae listado 
//post raiz, agrega user
loginRouter.route('/')
    .post(passportSignIn, (req, res, next) => {
        res.send("Logged in");
});
*/


//New login
loginRouter.route("/").post( (req, res, next) => {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) {
      console.log ("estoy en error");
      return next(err);
    }

    if (!user) {
      console.log ("estoy sin user");
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.login(user, err => {
      console.log ("estoy en logueado");
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
