const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result)
// });

// Todo.findOneAndRemove({_id: '59fca5494433bccd34e5b9ec'}).then((todo) => {

// });

Todo.findByIdAndRemove('59fca5494433bccd34e5b9ec').then((todo) => {
  console.log(todo);
});