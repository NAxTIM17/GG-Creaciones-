import Controllers from '../../controllers/index.js';
import db from '../../db.js';

function Get(request, response, next) {
    const sale_id = request.params.id;

    if (sale_id !== undefined && isNaN(Number(sale_id))) {
        response.status(400).send({ message: 'No numeric sale ID provided' });
        return;
    }

    db.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();

            const error = new Error('Could not connect to the database');
            next(error);

            return;
        }

        const payload = { sale_id };
        Controllers.Sales.Get(connection, payload)
        .then((res) => {
            connection.release();

            response.status(200).send(res);
        })
        .catch(next);
    });
}

function Post(request, response, next) {
    if (request.body.income === undefined || request.body.cost === undefined || request.body.description === undefined) {
        response.status(400).send({ message: 'There\'s empty required fields' });
        return;
    }

    db.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();

            const error = new Error('Could not connect to the database');
            next(error);

            return;
        }

        Controllers.Sales.Create(connection, request.body)
        .then((res) => {
            connection.release();

            const status = res.created ? 201 : 200;
            response.status(status).send(res);
        })
        .catch(next);
    });
}

function Patch(request, response, next) {
    const sale_id = request.params.id;

    if (sale_id !== undefined && isNaN(Number(sale_id))) {
        response.status(400).send({ message: 'No numeric sale ID provided' });
        return;
    }

    db.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();

            const error = new Error('Could not connect to the database');
            next(error);

            return;
        }

        Controllers.Sales.Modify(connection, { ...request.body, sale_id })
        .then((res) => {
            connection.release();

            response.status(200).send(res);
        })
        .catch(next);
    });
}

function Delete(request, response, next) {
    const sale_id = request.params.id;

    if (sale_id !== undefined && isNaN(Number(sale_id))) {
        response.status(400).send({ message: 'No numeric sale ID provided' });
        return;
    }

    db.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            
            const error = new Error('Could not connect to the database');
            next(error);

            return;
        }

        Controllers.Sales.Delete(connection, { sale_id })
        .then((res) => {
            connection.release();

            response.status(200).send(res);
        })
        .catch(next);
    });
}

const Sale = {
    Get,
    Post,
    Patch,
    Delete,
};

export default Sale;
