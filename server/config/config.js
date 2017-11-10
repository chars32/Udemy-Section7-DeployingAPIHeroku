var env = process.env.NODE_ENV || 'development';
console.log('env ***', env);

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  // Cuando quieres acceder a la propiedad de un
  // objeto se utilizan los [], aqui queremos 
  // saber que tipo de env esta utilizando
  var envConfig = config[env];

  // Object.keys nos devuelve las keys de un objeto
  // y luego recorremos con un forEach
  Object.keys(envConfig).forEach((key) => {
    // Le pasamos al process.env la llave como key
    // y el valor de cada una de las key
    process.env[key] = envConfig[key]
  });
}