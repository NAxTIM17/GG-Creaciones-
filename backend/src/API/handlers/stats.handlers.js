import Controllers from '../../controllers/index.js';
import db from '../../db.js';

function GetByYear(request, response, next) {
    db.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();

            const error = new Error('Could not connect to the database');
            next(error);

            return;
        }

        Controllers.Stats.GetByYear(connection)
        .then((res) => {
            connection.release();

            response.status(200).send(res);
        })
        .catch(next);
    });
}

function GetByMonth(request, response, next) {
    db.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();

            const error = new Error('Could not connect to the database');
            next(error);

            return;
        }

        Controllers.Stats.GetByMonth(connection)
        .then((res) => {
            connection.release();

            response.status(200).send(res);
        })
        .catch(next);
    });
}

function GetByDay(request, response, next) {
    db.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();

            const error = new Error('Could not connect to the database');
            next(error);

            return;
        }

        Controllers.Stats.GetByDay(connection)
        .then((res) => {
            connection.release();

            response.status(200).send(res);
        })
        .catch(next);
    });
}

const Stats = {
    GetByYear,
    GetByMonth,
    GetByDay,
};

export default Stats;
