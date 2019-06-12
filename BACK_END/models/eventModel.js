const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const eventModel = new Schema({
    nombre: { type: String   },
    direccion: { type: String },
    fecha: {type: Date, default: Date.now },
    precio: {type: Number},
    descripcion: {type: String},
    //guardo un array de usuarios que son los que asistiran al evento
    users : [{ type: Schema.Types.ObjectId, ref: 'users' }]
})


 module.exports = mongoose.model('evento', eventModel, "evento");
