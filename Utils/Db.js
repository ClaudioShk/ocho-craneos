"use strict";

const Sequelize = require('sequelize');
class Db {

    constructor() {
        //this.config = require('./Config');
        //this.db = this.config.db;
        this.Connection;
        this.onConnect();
        
    }

    onConnect() {
        this.Connection = new Sequelize('bikers_event', 'root', '161230', {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
            },
            
            operatorsAliases: false
        });
    }

    getConnection(){
        return this.Connection;
    }
}
module.exports = Db;