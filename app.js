const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const BikerRoutes = require('./Routes/Biker');
const AdminRoutes = require('./routes/Admin');
const cors = require('cors');
const DB = require('./utils/Db');


class Server {

    constructor() {
      this.app = express();
      this.sesion;
      this.DB = new DB();
    }

    appConfig(){
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({exetended:false}));
        this.app.use(express.static(path.join(__dirname, './public')));
        this.app.set('view engine', 'html');

        // Initializing the ejs template engine
        this.app.engine('html', require('ejs').renderFile);
    }

    includeRoutes(){
        new BikerRoutes(this.app).appRoutes();
        new AdminRoutes(this.app).appRoutes();
    }

    appExecute() {
        this.appConfig();
        this.includeRoutes();
        this.setAngularRoutes();
    }

    setAngularRoutes(){
        this.app.get('*', function(req, res) {  
        
          res.set('Content-Type', 'text/html')    
             .sendFile(path.join(__dirname, './public/index.html'));    
        });
    }

    verifyConnectionBD() {
        this.DB.getConnection()
        .authenticate()
        .then(function(err) {
            console.log('Connection has been established successfully.');
          }, function (err) { 
            console.log('Unable to connect to the database:', err);
        });
    }
    
    appExpress() {
        this.verifyConnectionBD();
        return this.app;
    }
}

const app = new Server();
app.appExecute();

module.exports = app.appExpress();
