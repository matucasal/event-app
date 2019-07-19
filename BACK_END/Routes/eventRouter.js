const express = require("express");
const Event = require('../models/eventModel');
const eventRouter = express.Router();
const User = require('../models/userModel');
const eventController = require ('../controllers/events');
const multer = require ('multer');

// SET STORAGE
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg')
        }
    })
   
var upload = multer({ storage: storage })


//Lista o agregar evento
eventRouter.route('/')
.get(eventController.getEvents)
.post( eventController.addEvent);
   

//si viene parametro, get lo trae, put lo modifica, patch tambien, delete borra
eventRouter.route('/:eventId')
.get(eventController.getEvent)
.post(eventController.editEvent)
.patch(eventController.patchEvent)
.delete(eventController.deleteEvent)

//agrego user en un evento, paso por primero el event id y dps el user id
eventRouter.route('/:eventId/users/:userId')
.post(eventController.addUserIntoEvent);

//Aca se va a agregar imagen al evento
eventRouter.route('/:eventId/image/')
.post(upload.single('file'), eventController.addImageIntoEvent);


//Trago todos los usuarios de un evento
eventRouter.route('/:eventId/users')
.get(eventController.getUsersByEvent);


module.exports = eventRouter;
