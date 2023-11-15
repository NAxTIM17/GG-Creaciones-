import http from 'http';

import environment from './environment.js';
import app from './app.js';
import db from './db.js';

const PORT = process.env.PORT ?? '4000';

function tryDBConnection() {
    return new Promise((resolve, reject) => {
        environment.SHOW_LOGS && console.log('Testing database connection');

        db.pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            connection.release();

            resolve({ connected: true });
        });
    });
}

function init() {
    tryDBConnection()
    .then(() => {
        environment.SHOW_LOGS && console.log('Successfully established connection with database');
    })
    .catch((err) => {
        environment.SHOW_LOGS && console.log('Failed to established connection with database');
        environment.SHOW_LOGS && console.error(err);
    })
    .finally(() => {
        const server = http.createServer(app.create());

        server.listen(PORT, () => {
            console.log(`Server listening on port :${PORT}`);
        });
    });
}

init();
