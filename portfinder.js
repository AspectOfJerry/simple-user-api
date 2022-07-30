const portfinder = require('portfinder');

portfinder.basePort = 1;

portfinder.getPortPromise()
    .then((port) => {
        console.log(port);
    })
    .catch((err) => {
        console.log(err);
    });