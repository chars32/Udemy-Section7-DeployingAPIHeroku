const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
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

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  // aqui usamos user por que instanciamos el metodo
  // ya que usamos methods.
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};
// OJO -- aqui usamos statics, todo lo que este 
// dentro sera un metodo del modelo.
UserSchema.statics.findByToken = function (token) {
  // User declaramos el metodo del modelo
  // por que usamos statics
  var User = this;
  var decoded;
  // aqui asignaremos valor a decoded
  // ya que jwt.verify() aventara un error
  // si algo sale mal, si el token ha sido
  // manipulada al igual que el secret.
  // Para eso usamos el try/catch
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject()
  }

  return User.findOne({
    // para acceder a propiedad anidadas
    // se utilizan ''
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};

var User = mongoose.model('User', UserSchema);

module.exports = {User}