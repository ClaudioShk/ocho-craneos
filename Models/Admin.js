"use strict";

const DB = require('../utils/Db');
this.DB = new DB();
module.exports = function(sequelize, DataTypes) {
    var Admin = sequelize.define("admins", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey: true,
            allowNull : false,
            autoIncrement: true,
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    });

    Admin.sync();
    return Admin;
};