// const MongoClient = require('mongodb').MongoClient;
// Haremos lo mismo de arriba pero con destructuring assignment
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MondoDB server');

  // findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59fa0daffbfa9ec01a64e759')
  // }, {
  //   // tenemos que usar mongodb update operators
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  // Cambiar nombre usurio de 'Mike a Carlos' en la coleccion Users,
  // e incrementar la edad +1 
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59f9552eae30403a78ce3455')
  }, {
    $set: {
      name: 'Carlos'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })

  // db.close();
});