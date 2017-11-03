// Traemos el ObjectID de mongodb
const {ObjectID} = require('mongodb');
// Llamamos a todos los archivos que necesitamos
// mongoose sirve para conectar a la bd
// Todo y User para checar sus respectivos models.
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '59fb7171bf949d53f0b686181';

// Validacion para saber si el id es valido
// mediante el ObjectID
// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Aqui empezamos a llamar a los Todo por el id
// mendiante querys y sus validaciones en caso
// de no estar erroneos.
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

User.findById('59fa8e6ed1628412904b27ff').then((user) => {
  if(!user){
    return console.log('User ID not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});