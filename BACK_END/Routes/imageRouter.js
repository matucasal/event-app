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
        res.writeHead(200, {'Content-Type':  'image/jpg' });
        res.end(fileToload, 'binary');

        if (err) return console.log(err)



        res.contentType('image/jpeg');
        res.send(result.image.buffer)


})



module.exports = imageRouter;



