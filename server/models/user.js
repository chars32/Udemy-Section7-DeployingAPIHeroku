const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    // con unique, como su nombre lo indica, 
    // verificamos que el email sea unico.
    unique: true,
    // validate nos sirve para hacer una verificacion
    // si tiene estructura de un correo
    validate: {
      // en validator, le pasamos la const validator
      // declarada arriba (libreria externa)y su metodo isEmail,
      // el cual recibe el value. Ya no es necesario hacer 
      // una custom function.
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  // declaramos el modelo del password.
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // tokens solo funciona para mongodb
  // esta variable sirve para declarar los
  // parametros que llevara los token.
  tokens: [{
    access:{
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {User}