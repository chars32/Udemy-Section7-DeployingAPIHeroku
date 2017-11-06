const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// Usamos mongoose.Schema para crear el model,
// ya que este nos permite integrar metodos custom
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      // se le declara esta propiedad para decir
      // que es asincrono.
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
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
// sobreescribimos el metodo toJSON el cual mandara 
// los datos que nosotros deseemos que se vean.
UserSchema.methods.toJSON = function () {
  var user = this;
  // user.toObject es responsable de tomar tu variable 
  // mongoose(user) y convertirla en un objeto regular
  // con las propiedades que existan en el documento
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Nuestro metodo custom para generar el token de auth.
// usamos las fucntion normales para poder bindear el
// this del UserSchema.
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  //OJO -- retornamos una promesa que retorna el token
  return user.save().then(() => {
    return token;
  });

};

// Le pasamos el UserShcema indicando que ese sera el modelo.
var User = mongoose.model('User', UserSchema);

module.exports = {User}