const loginRouter = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });
const UsersLoginController = require('../controllers/usersLogin');


/*
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
}*/

loginRouter.route('/signup')
  .post( UsersLoginController.signUp);


loginRouter.route('/')
  .post(passportSignIn, UsersLoginController.signIn);

loginRouter.route('/secret')
  .get(passportJWT, UsersLoginController.secret);

loginRouter.route('/user')
  .get(passportJWT, UsersLoginController.user);


loginRouter.get("/logout", function(req, res) {
    req.logout();
    console.log("logged out")
    return res.send();
});



module.exports = loginRouter;
