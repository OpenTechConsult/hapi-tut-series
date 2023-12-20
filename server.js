'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = new Hapi.server({
        host: 'localhost',
        port: 3001
    });

    // define the route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return '<h1>Hello World!</h1>'
        }
    });

    // define the route http://localhost.3001/users/
    server.route({
        method: 'GET',
        path: '/users/{user?}',
        handler: (request, h) => {
            if (request.params.user) {
                return `<h1>Hello ${request.params.user}</h1>`;
            } else {
                return `<h1>hello stranger!</h1>`;
            }
        }
    });

    await server.start();
    console.log(`server started on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


init();