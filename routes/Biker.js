"use strict";

var BikerController = require('../Controllers/Biker');

class BikerRoutes {
    constructor(app) {
        this.app = app;
        this.Biker = new BikerController();
    }

    appRoutes() {
        this.app.get('/api/getAllBikers', (req, res) => {
            this.Biker.getAll(req, res);
        });
        this.app.post('/api/register', (req, res) => {
            this.Biker.registerBiker(req, res);
        });
        this.app.get('/api/count/:id', (req, res) => {
            const id = req.params.id;
            this.Biker.getCount(id, res);
        });
    }
    routesConfig() {
        this.appRoutes();
    }

}   

module.exports = BikerRoutes;       