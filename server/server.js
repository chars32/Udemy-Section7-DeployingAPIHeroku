const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {res.status(400).send()});
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {res.status(404).send()});
});
// Ruta para actualizar documentos
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // Esto lo hace lodash(_.), le pasamos los campos que 
  // el usuario puede actualizar
  var body = _.pick(req.body, ['text', 'completed']);

  // checamos con lodash si es boleano y si ya se completo
  // la tarea y que pasa si no.
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  // $set es para setear los campos a actualizar, por eso 
  // pasamos la varible body, la cual ya los tiene en un array
  // new: true, es para decirle que queremos que se actualice con 
  // los cambios.
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

});
    
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};