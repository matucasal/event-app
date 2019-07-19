var fs = require('fs');
var path = require("path");

const imageRouter = require('express-promise-router')();
/*
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
}*/

imageRouter.route('/:filename').get((req, res) => {
        var filename = req.params.filename;

        var fileToload;

        var absolutePath = path.resolve("uploads/" + filename);
        console.log(absolutePath);


        fs.readFileSync(absolutePath);
        res.sendFile(absolutePath);
        //res.writeHead(200, {'Content-Type':  'image/jpg' });
        //res.send(fileToload, 'binary');


})


imageRouter.route('/avatars/:filename').get((req, res) => {
  var filename = req.params.filename;

  var fileToload;

  var absolutePath = path.resolve("uploads/avatars/" + filename);
  console.log(absolutePath);


  fs.readFileSync(absolutePath);
  res.sendFile(absolutePath);
  //res.writeHead(200, {'Content-Type':  'image/jpg' });
  //res.send(fileToload, 'binary');


})



module.exports = imageRouter;



