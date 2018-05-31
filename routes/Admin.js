"use strict";

var AdminController = require('../Controllers/Admin');

class AdminRoutes {
    constructor(app) {
        this.app = app;
        this.Admin = new AdminController();
    }

    appRoutes() {
        this.app.post('/api/createAdmin', (req, res) => {
            this.Admin.saveAdmin(req, res);
        });
        this.app.post('/api/loginAdmin', (req, res) => {
            this.Admin.adminLogin(req, res);
        });
    }
    routesConfig() {
        this.appRoutes();
    }

}   

module.exports = AdminRoutes;   