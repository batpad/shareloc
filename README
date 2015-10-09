# Simple location sharing app

Premise of the app is simple: quickly create a URL to share with people so that they can see where you are and you can see when they are, when they visit that URL. I would often want something like this, especially when making plans to meet someone in a city I am not so familiar with, etc.

The app is the result of a one day hack and as such, very much a work in progress and contributions are welcome.


## App structure

The app consists of two components - a node / express frontend, which serves the front-end templates and javascript and handles URL routing, and a backend Websocket server, which handles receiving geo-coordinates and sending it to all clients connected to a URL.


## Local setup

### Frontend

    cd frontend
    npm install

(You need to have NodeJS installed, tested on 0.10.x, but should work for later versions)

To run the server:

    npm start

### Backend

    cd backend
    npm install

To run the WebSocket server:
    node app.js

You can then visit `http://localhost:3000/some_random_url` in your browser.


## Deployment

TODO

