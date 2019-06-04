const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
var path = require('path');
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

const db = mongoose.connect('mongodb://localhost:27017/eventsdb');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//Seteo la cookie
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//Inicializo el passort
app.use(passport.initialize());
//Start the session 
app.use(passport.session());


//Sete el puerto que viene en la variable PORT (deberia ser 8080), sino 5656
const port = process.env.PORT || 5656;
// routes go here
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


// Agrego un middleware statico para poder acceder a todas las imágenes, archivos CSS y archivos JavaScript (esta en public)
app.use( '/' , express.static(path.join(__dirname ,'/public')));


/*app.post('/endpoint', (req, res) => {
  console.log(req.body)
})
*/

//utilizo el router de books - prueba
//utilizo el router de events para manejar todos los metodos desde ahi 
const eventRouter = require("./Routes/eventRouter");
app.use('/api/Events', eventRouter);

//utilizo el router de users para manejar todos los metodos desde ahi
const userRouter = require("./Routes/userRouter");
app.use('/api/Users', userRouter);

//utilizo el router de login para manejar todos los metodos desde ahi
const loginRouter = require("./Routes/loginRouter");
app.use('/api/Login', loginRouter);


//Esto despues lo saco a un lugar mas prolijo

let users = [
  {
    id: 1,
    name: "mcasal",
    email: "mcasal",
    password: "123"
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
]


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