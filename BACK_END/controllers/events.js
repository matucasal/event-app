const Event = require('../models/eventModel');

module.exports = {
    
    getEvents: async (req, res, next) => {
        Event.find({}, (err, events) => {
            console.log(events);
            res.json(events);
            res.status(200);
        })
    },

    addEvent: async (req, res,next) => {
        let event = new Event(req.body); // edited line
        console.log("Estoy en el post");
        console.log(req.body);
        event.save()
        res.status(201).send(event)
    },

    getEvent: async (req, res, next) =>{
        Event.findById(req.params.eventId, (err, event) => {
            res.json(event)
        })
    },

    editEvent: async (req, res, next) => {

        Event.findById(req.params.eventId, (err, event) => {
            //cargo todos los datos del evento
            event.nombre = req.body.nombre;
            event.direccion = req.body.direccion;
            event.fecha = req.body.fecha;
            event.foto = req.body.foto;
            event.precio =   req.body.precio;
            event.descripcion =   req.body.descripcion;
            event.save();
            res.json(event);
        }) 
     
    },

    patchEvent: async (req, res, next) => {
        Event.findById(req.params.eventId, (err, event) => {
            if(req.body._id){
                delete req.body._id;
            }
            for( let b in req.body ){
                event[b] = req.body[b];
            }
            event.save();
            res.json(event);
        })
    },

    deleteEvent: async (req, res, next) => {
        Event.findById(req.params.eventId, (err, event) => {
            event.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    },

    getUsersByEvent: async (req, res, next) => {
        console.log ("El parametro es: " + req.params.eventId );
        Event.findById(req.params.eventId)
        .populate('users')
        .exec(function (err, users) {
            //tendria que iterar users.users y armar un json piola
            var users_array =  [];
            for (var i =0; i< users.users.length ; i++){
                //users_array.push (id1: 100)
                users_array.push({username: users.users[i].username, nombre : users.users[i].nombre, apellido : users.users[i].apellido});
            }
            res.json (users_array);
        })
    },

    addUserIntoEvent : async (req, res, next) => {
        console.log("llegue al post de asistir");
        Event.findById(req.params.eventId, (err, event) => {
            //uso el addtoset para evitar que se dupliquen los asistir
            event.users.addToSet(req.params.userId);
            event.save();
            res.json(event);
        })
    }

}
