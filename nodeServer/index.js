//const io = require('socket.io')("8000");
const express =  require('express');
const app =  express();
const httpServer =  require('http').Server(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*", //http://localhost:8000
      methods: ["GET", "POST"]
    }
});
httpServer.listen(8000);

const users = {};

io.on('connection', socket =>{
    //If new user join send message to all the existing users.
    socket.on('new-user-joined', name =>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
    });

    //If user sends the message broadcast it to all existing users
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]}); //s
    });

    //Iff someone leaves the chat let others know
    socket.on('disconnect',message =>{    
        socket.broadcast.emit('left', users[socket.id]); //s
        delete users[socket.id];
    });
}) 
