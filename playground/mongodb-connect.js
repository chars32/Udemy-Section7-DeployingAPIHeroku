// const MongoClient = require('mongodb').MongoClient;
// Haremos lo mismo de arriba pero con destructuring assignment
const {MongoClient, ObjectID} = require('mongodb');

// Para esto sirve ObjectID
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MondoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false,
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   // Podemos declarar nuestro propio _id
  //   // _id: 123,
  //   name: 'Carlos',
  //   age: 37,
  //   location: 'Villahermosa'
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert user');
  //   }

  //   // console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});