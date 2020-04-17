const port = 8100;

const express = require('express');
//const moduleTest = require('./server_module/module');
//const Test = require('./server_module/Class');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/assets/'));

app.get('/connexion',function(req, res, next){
    //moduleTest.a();
    res.sendFile(__dirname + '/assets/views/connexion.html');
});

app.get('/index',(req, res, next)=>{
    //let test = new Test();
    //test.testHello();
    res.sendFile(__dirname + '/assets/views/index.html');
});

app.get('/test',function(req, res, next){
    //moduleTest.a();
    res.sendFile(__dirname + '/assets/views/test.html');
});

app.get('/',function(req, res, next){
    //moduleTest.a();
    res.sendFile(__dirname + '/assets/views/Menu.html');
});
/*io.sockets.on('connection', (socket) =>{
    io.emit('Hello', 'A new connection on our website');
    socket.emit('Hello', 'Hello to you');
    socket.on('private massage', (from,msg) => {
        console.log('I received a private massage by ' + from + 'saying: ' + msg);
    });
    socket.on('disconnect', () => {
        io.emit('User disconnected');
    });
})*/

server.listen(port);
console.log('Serveur lancé!');