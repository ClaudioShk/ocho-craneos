"use strict";

const DB = require('../utils/Db');
this.DB = new DB();
module.exports = function(sequelize, DataTypes) {
    var Biker = sequelize.define("bikers", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey: true,
            allowNull : false,
            autoIncrement: true,
        },
        firstname : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        state : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        club : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        }
    });

    Biker.sync();
    return Biker;
};