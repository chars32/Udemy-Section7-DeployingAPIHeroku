// const MongoClient = require('mongodb').MongoClient;
// Haremos lo mismo de arriba pero con destructuring assignment
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MondoDB server');

  // Primer metodo para borrar 'deleteMany', con el cual borramos todos
  // los que tengan de texto 'Eat lunch'.
  // db.collection('Todos').deleteMany({text: 'Eat lunch'})
  //   .then((result) => {
  //     console.log(result);
  //   });
  
  // Metodo para borrar solo uno 'deleteOne' que tenga texto 'Eat lunch'.
  // db.collection('Todos').deleteOne({text: 'Eat lunch'})
  //   .then((result) => {
  //     console.log(result);
  //   })

  // Y este metodo es para encontra el primero con los parametros pasados 'findOneAndDelete' y borrarlo.
  // db.collection('Todos').findOneAndDelete({completed: false})
  //   .then((result) => {
  //     console.log(result);
  //   });

  // Eliminar de la coleccion de Users los 3 documents con el nombre de Carlos
  // db.collection('Users').deleteMany({name: 'Carlos'})
  //   .then((result) => {
  //     console.log(result);
  //   });

  // y borrar otro con el metodo findOneAndDelete,
  // no importa cual pero que sea por _id
  db.collection('Users').findOneAndDelete({_id: new ObjectID('59fa10e4fbfa9ec01a64e894')})
    .then((results) => {
      console.log(JSON.stringify(results, undefined, 2));
    })

  // db.close();
});