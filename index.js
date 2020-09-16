const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (request, response) => {
    response.sendFile(__dirname + '/public/rooms/javascript.html');
});

app.get('/swift', (request, response) => {
    response.sendFile(__dirname + '/public/rooms/swift.html');
});

app.get('/html', (request, response) => {
    response.sendFile(__dirname + '/public/rooms/html.html');
});

//tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `new user joined ${data.room} room!`);
    })

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        tech.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        tech.emit('message', 'user disconnected');
    })
});