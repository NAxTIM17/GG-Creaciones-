import environment from "../environment.js";

function Logs(request, response, next) {
    if (environment.SHOW_LOGS) {
        console.log(`request '${request.method}' of '${request.url}' at '${Date.now()}'`);
    }

    next();
}

function ErrorHandling(error, request, response, next) {
    if (error) {
        environment.SHOW_LOGS && console.error(error);

        response.status(500).send({ message: 'Server Error', description: error }).end();
    }

    next();
}

function NotFound(request, response, next) {
    response.status(404).end();
}

const Middlewares = {
    ErrorHandling,
    NotFound,
    Logs,
};

export default Middlewares;
