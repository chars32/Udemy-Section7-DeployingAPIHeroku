// Este archivo es para poder sedear la test bd y asi no
// tener todo el codigo en server.test.js
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

// declaramos id´s para los users
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
// Sedeamos los users
const users = [{
  _id: userOneId,
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'abc123').toString()
  }]
}];
// limpiamos bd Users e insertamos
const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    // promise.all es un nuevo concepto el cual al 
    // igual que las promesa normal, no retorna valor
    // hasta que se cumplan los parametros pasados.
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

// Sedeamos los todos
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  // aqui declaramos el id del creador del todo
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];
// limpiamos bd Todo e insertamos.
const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};



module.exports = { todos, populateTodos, users, populateUsers }