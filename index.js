const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

// routes handler
app.get('/', (req, res) => {
   // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/public/index.html');
});


//socket io server
io.on('connection', (socket) => {
    console.log('A user connected');
    //receive join event from client
    socket.on('join', (data) => {
        io.emit('new_user', data); 
    });
     //receive new_messaage event from client 
    socket.on('new_messaage', (data) => {
        io.emit('dispatch_message', data); //emitting to everyone
    });

    socket.on('disconnect', () => {
        io.emit('disconnect_message','A user disconnected!'); 
    });
});

//http server
http.listen(port, () => {
    console.log(`listening on port ${port}`);
});
