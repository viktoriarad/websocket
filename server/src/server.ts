import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const faker = require('faker');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let counter: number = 0;

wss.on('connection', (ws: WebSocket) => {
    ws.send('Hi there, I am a WebSocket server');

    ws.on('message', (message: string) => {
        ws.send(`Hello, you sent -> ${message}`);
    });

    setInterval(() => {
        const data = JSON.stringify({name: faker.internet.userName(), score: faker.random.number()});
        ws.send(data);
    },5000);

});

server.listen(process.env.PORT || 8999, () => {
    // @ts-ignore
    console.log(`Server started on port ${server.address().port} :)`);
});
