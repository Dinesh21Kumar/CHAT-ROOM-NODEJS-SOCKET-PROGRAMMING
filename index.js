const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

server.listen(port, () => {
    console.log("server is runnng on port 3000");
})

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html');
})
app.get('/javascript', (req,res) => {
    res.sendFile(__dirname+'/public/javascript.html');
})

app.get('/css', (req,res) => {
    res.sendFile(__dirname+'/public/css.html');
})

app.get('/swift', (req,res) => {
    res.sendFile(__dirname+'/public/swift.html');
})

const tech = io.of('/tech');
tech.on('connection',(socket) => {
    
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message','New User Entered in Room '+data.room);
    })

    socket.on('message', data => {
       console.log("from client : "+ data.msg);
       tech.in(data.room).emit('message',data.msg);
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected');
        tech.emit('message','User Disconnected');
    })

    
})