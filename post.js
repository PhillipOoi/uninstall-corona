'use strict';

const Hapi = require('hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

    await server.register(require('inert'));
	server.route({
        method: 'GET',
        path: '/about.html',
        handler: function (request, h) {

            return h.file('about.html');
        }
    });
	server.route([{
	  method: 'POST',
	  path: '/next',
	  config: {
		  payload: {
			  output: 'data'
		  }
	  },
	  handler: function (request, response){
		var text = request.payload.text;
		return "Hello  "+text;
	  }
	}]);

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();