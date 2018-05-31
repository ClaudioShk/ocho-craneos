'Use strinct'
const DB = require("../utils/Db");
const Biker = require('../Models/Biker');
const sequelize = require('sequelize');
const async = require('async-waterfall');
const nodemailer = require('nodemailer');

class bikerController{
    constructor(){
        this.DB = new DB();
        this.Biker = this.DB.getConnection().import("../Models/Biker.js");
        this.config = require('../Utils/config');
    }

    getAll(request, response) {
        try {
            this.Biker.findAll({order: [['createdAt', 'ASC']] })
                .then(Bikers => {
                    return this.responseCorrectStatus(response, Bikers);
                })
                .catch(err => {
                    console.log(err);
                    return this.responseServerErrorStatus(response, {
                        errorType: "BD",
                        error: err
                    });
                });
        } catch (error) {
            console.log(error);
            return this.responseServerErrorStatus(response, {
                errorType: "Server",
                error: error
            });
        }
    }

    getCount(id, response) {
        try {
            this.Biker.count({where: {id: id}})
                .then(Bikers => {
                    return this.responseCorrectStatus(response, Bikers);
                })
                .catch(err => {
                    console.log(err);
                    return this.responseServerErrorStatus(response, {
                        errorType: "BD",
                        error: err
                    });
                });
        } catch (error) {
            console.log(error);
            return this.responseServerErrorStatus(response, {
                errorType: "Server",
                error: error
            });
        }
    }

    registerBiker(request, response){
        try{
            const bikerData = request.body;
            this.Biker.create(bikerData)
            .then(Biker => {
                if (Biker != null) {

                    return this.responseCorrectStatus(response, Biker);
                    this.sendMail(Biker);
                }
            })
            .catch(err => {
                console.log(err);
                return this.responseServerErrorStatus(response, {
                    errorType: "BD",
                    error: err
                });
            });

        } catch (error) {
            console.log(error);
            return this.responseServerErrorStatus(response, {
                errorType: "Server",
                error: error
            });
        }
    }

    /*Nombre: Alejandro Rodríguez Estado: Aguascalientes Ciudad: Calvillo Teléfono: XXXXX Email: adfadf@kll.com*/

    sendMail(params){
        var smtpTrans = nodemailer.createTransport(this.config.email);

        const mailOptions = {
            from: 'pakatocpakrew@gmail.com',
            to: 'claudio.contreras.963@gmail.com',
            subject: 'Nuevo registro en el sitio viiicraneos.com',
            html:  `<p>Nombre: ${params.firstname} ${params.lastname}<br/>
                    Estado: ${params.state}<br/>
                    Teléfono: ${params.phone}<br/>
                    Email: ${params.email}</p>`
        };

        smtpTrans.sendMail(mailOptions, function (err) {
            console.log('sent', emailTo)
            console.log(Report)
        });

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
module.exports = bikerController;