const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const cors = require ('cors');
var path = require('path');
const passport = require('passport');
const passportConf = require('./passport');



const db = mongoose.connect('mongodb://localhost:27017/eventapp');
const app = express();
app.use(cors());
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




app.use(passport.initialize());
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



//utilizo el router de photo para manejar todos los metodos desde ahi
const imageRouter = require("./Routes/imageRouter");
app.use('/api/Photo', imageRouter);


