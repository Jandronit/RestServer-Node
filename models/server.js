const express = require('express')
const cors = require("cors");


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares

        // Routes of the application
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directory public
        this.app.use( express.static('public'));
    }

    routes() {

        this.app.use(this.usersPath, require('../routes/users.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}

module.exports = Server;
