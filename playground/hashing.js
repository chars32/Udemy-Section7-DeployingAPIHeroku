const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// Con esta libreria creamos el hash para los passwords
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = "$2a$10$XAdtwNwoZBxloZ.R9nafxuaN0WhAFa6Kv8bZ1mUo3hhqyWvD0asty";

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 10
// }
// // jwt.sign toma el data y crea el hash
// var token = jwt.sign(data, '123abc');
// console.log(token);
// // jwt.verify toma la variable token y verifica
// // que no haya sido manipludad.
// var decoded = jwt.verify(token, '123abc')
// console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // Man in the middle example
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust')
//   console.log(resultHash);
//   console.log(token.hash)
// }