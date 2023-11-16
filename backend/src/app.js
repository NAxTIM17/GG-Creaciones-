import cors from 'cors';
import express from 'express';

// import API from './api'

import Middlewares from './middlewares/index.js';

function create() {
    const app = express();

    app.disable('x-powered-by');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ origin: '*' }));

    // API request handling pipeline

    app.use(Middlewares.Logs);

    app.get('/api/ping', (request, response, next) => {
        response.status(200).send('pong').end();
    });

    // app.use(API.Router.Sales);
    // app.use(API.Router.Materials);
    // app.use(API.Router.Reports);
    
    app.use(Middlewares.ErrorHandling);
    app.use(Middlewares.NotFound);

    return app;
}

const app = { create };

export default app;
