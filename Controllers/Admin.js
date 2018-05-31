'Use strinct'
const DB = require("../utils/Db");
const Admin = require('../Models/Admin');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../Services/jwt');

class adminController{
    constructor(){
        this.DB = new DB();
        this.Admin = this.DB.getConnection().import("../Models/Admin.js");
        this.config = require('../Utils/config');
    }

    saveAdmin(request, response){
        try{
            const adminData = request.body;
            if(adminData.password){
                bcrypt.hash(adminData.password,null,null,(err,hash)=>{
                    adminData.password = hash;
                    if(adminData.username!=null&&adminData.email!=null){ 
                        this.create(request, response, adminData);
                    }else{
                        response.status(200).send({message:'Introduce all the data'});                
                    }
                });       
            }else{
                response.status(200).send({message:'Introduce the password'});
            }
        } catch (error) {
            console.log(error);
            return this.responseServerErrorStatus(response, {
                errorType: "Server",
                error: error
            });
        }
    }

    create(request, response, adminData){             
        this.Admin.create(adminData)
        .then(Admin => {
            if (Admin != null) {
                return this.responseCorrectStatus(response, Admin);
            }
        })
        .catch(err => {
            console.log(err);
            return this.responseServerErrorStatus(response, {
                errorType: "BD",
                error: err
            });
        });
    }

    adminLogin(request, response){
        try {
            const adminData = request.body;
            this.Admin.findOne({where: {username: `${adminData.username}`} })
            .then(Admin => {
                bcrypt.compare(adminData.password, Admin.password, (err, check)=>{
                    if(check){
                        response.status(200).send({
                            token:jwt.createToken(Admin)
                        });
                        console.log('you are logged');
                        //return this.responseCorrectStatus(response, Admin);
                    }else{
                        response.status(404).send({message:'contrasenia incorrecta'});
                    }
                });
            })
            .catch(err => {
                console.log(err);
                return this.responseServerErrorStatus(response, {
                    errorType: "BD",
                    error: err
                });
            });

        } catch (error) {

        }
    }

    responseCorrectStatus(response, params) {
        return response.status(200).json(params);
    }

    responseServerErrorStatus(response, error) {
        return response.status(500).json(error);
    }

    responseNotFoundStatus(response, error) {
        return response.status(400).json(error);
    }


}
module.exports = adminController;