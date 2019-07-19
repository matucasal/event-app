const mongoose= require("mongoose");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const userModel = new Schema({
    nombre: { type: String   },
    apellido: { type: String },
    edad: { type: Number },
    username: {type: String},
    password: { 
        type: String},
    events : [{ type: Schema.Types.ObjectId, ref: 'evento' }],
    avatar: {type: String}

})



userModel.pre('save', async function(next) {
    try {
      console.log('entered');
      
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.password, salt);
      // Re-assign hashed version over original, plain text password
      this.password = passwordHash;
      console.log('exited');
      next();
    } catch(error) {
      next(error);
    }
  });
  
userModel.methods.isValidPassword = async function(newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
      throw new Error(error);
    }
}



 module.exports = mongoose.model('users', userModel, "users");
