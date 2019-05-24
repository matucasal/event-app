const express = require("express");
const Event = require('../models/eventModel');
const eventRouter = express.Router();
const User = require('../models/userModel');
const eventController = require ('../controllers/events');


//Lista o agregar evento
eventRouter.route('/')
.get(eventController.getEvents)
.post(eventController.addEvent);
   

//si viene parametro, get lo trae, put lo modifica, patch tambien, delete borra
eventRouter.route('/:eventId')
.get(eventController.getEvent)
.post(eventController.editEvent)
.patch(eventController.patchEvent)
.delete(eventController.deleteEvent)

//agrego user en un evento, paso por primero el event id y dps el user id
eventRouter.route('/:eventId/:userId')
.post(eventController.addUserIntoEvent);
    
//Trago todos los usuarios de un evento
eventRouter.route('/:eventId/users')
.get(eventController.getUsersByEvent);


module.exports = eventRouter;
