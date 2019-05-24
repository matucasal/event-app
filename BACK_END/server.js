const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var path = require('path');


const db = mongoose.connect('mongodb://localhost:27017/eventsdb');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

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