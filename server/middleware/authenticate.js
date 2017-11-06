var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  // aqui obtenemos el valor del token que viene
  // en el header, nada mas pasamos el tipo
  // de header que sera (x-auth)
  var token = req.header('x-auth');
  
  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  })
};

module.exports = {authenticate}