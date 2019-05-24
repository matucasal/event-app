const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema({
    nombre: { type: String   },
    apellido: { type: String },
    edad: { type: Number },
    username: {type: String},
    events : [{ type: Schema.Types.ObjectId, ref: 'evento' }]

})


 module.exports = mongoose.model('usuario', userModel, "usuario");
