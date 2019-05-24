const express = require("express");
const User = require('../models/userModel');
const usersController = require('../controllers/users');
const userRouter = express.Router();

//get raiz, trae listado 
//post raiz, agrega user
userRouter.route('/')
.get(usersController.getUsers)
.post(usersController.addUser);
    
//si viene parametro, get lo trae, put lo modifica, patch tambien, delete borra
userRouter.route('/:userId')
.get(usersController.getUser)
.put(usersController.editUser)
.delete(usersController.deleteUser);


module.exports = userRouter;
