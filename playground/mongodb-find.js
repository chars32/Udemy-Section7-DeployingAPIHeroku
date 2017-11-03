// const MongoClient = require('mongodb').MongoClient;
// Haremos lo mismo de arriba pero con destructuring assignment
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MondoDB server');
  // Este es el metodo para traer informacion de la bd en mongodb, cuando es por _id
  // es necesario crear un nuevo ObjectId y pasarle el id que se requiere consultar,
  // para otros parametros no es neceario hacerlo, esto retorna una promesa con la
  // cual podemos interactuar.

  // db.collection('Todos').find({_id: new ObjectID("59fa0130fbfa9ec01a64e3ed")}).toArray()
  //   .then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })

  // Usando el metodo count de cursor (mongodb.github.io)
  // db.collection('Todos').find().count()
  //   .then((count) => {
  //     console.log(`Todos count: ${count}` );
  //   }, (err) => {
  //     console.log('Unable to fetch todos', err);
  //   })

  // Buscando todos los nombres que sean igual a 'Carlos' en la 
  // coleccion de Users
  db.collection('Users').find({name: 'Carlos'}).toArray()
  .then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  })

  // db.close();
});