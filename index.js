const Sequelize = require('sequelize');
const app = require('./app');
const port = process.env.PORT||8080;

app.listen(port,function(){
  console.log("Servidor API Rest");
});