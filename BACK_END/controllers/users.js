const User = require('../models/userModel');

module.exports = {
    
    getUsers: async (req, res, next) => {
      
        User.find({}, (err, users) => {
            console.log(users);
            res.json(users);
            res.status(200);
        })
    },


    addUser: async (req, res, net) => {
        let user = new User(req.body); // edited line
        console.log("Estoy en el post");
        console.log(req.body);
        user.save()
        res.status(201).send(user)
    },


    getUser: async (req, res, next) => {
        User.findById(req.params.userId, (err, user) => {
            console.log(user);
            res.json(user);
            res.status(200);
        })
    },


    editUser: async (req, res, next) => {

        User.findById(req.params.userId, (err, user) => {
            user.nombre = req.body.nombre;
            user.apellido = req.body.apellido;
            user.edad = req.body.edad;
            user.username = req.body.username;
            user.save()
            res.json(user)
        }) 

    },

    deleteUser: async (req,res, next) => {
        
        User.findById(req.params.userId, (err, user) => {
            user.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    }


}
  