const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {

    console.log(req.body)
    //console.log(req.body.data)
        
    
    //Tomo los datos del request
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
      edad: edad,
      avatar: req.file.filename
    });

    await newUser.save();


    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    //res.status(200).json({ token });
    res.send(JSON.stringify({ user: newUser, token: token }, null, 3));
  },

  signIn: async (req, res, next) => {
    // Generate token
    console.log("devolvio ok");
    const token = signToken(req.user);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify({ user: req.user, token: token }, null, 3));
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    console.log("devolvio ok");
    const token = signToken(req.user);
    req.user.token = token;
    res.status(200).json( {user: req.user, token: token} );
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  },

  user: async (req, res, next) => {
    console.log("El user es este - req user: " + req.user);
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}