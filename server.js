'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = new Hapi.server({
        host: 'localhost',
        port: 3001
    });

    await server.register({
        plugin: require('hapi-geo-locate'),
        options: {
            enabledByDefault: true,
        }
    });

    // define the route
    server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return `<h1>Hello World!</h1>`
        }
    },
    {
        method: 'GET',
        path: '/location',
        handler: (request, h) => {
            const location = request.location
            if (request.location) {
                return location;
            } else {
                return "<h1>Your location is not enable by default!</h1>";   
            }
        }
    },
    {
        method: 'GET',
        path: '/users/{user?}',
        handler: (request, h) => {
            return `<h1>${request.query.name}</h1><br/>
                    <h1>${request.params.user}</h1>`;
        }
    },
    {
        method: 'GET',
        path: '/home',
        handler: (request, h) => {
            return h.redirect('/');
        }
    },
    {
        method: 'GET',
        path: '/{any*}',
        handler: (request, h) => {
            return "<h1>Oh no! You must be lost!</h1>";
        }
    }]);


    await server.start();
    console.log(`server started on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


init();