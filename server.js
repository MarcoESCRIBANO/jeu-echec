const mysql=require('mysql');

//sessionStorage.setItem('pseudo', '');


var port=process.env.PORT || 2080;
function createDB(mysql){
    const con = mysql.createConnection({
        socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
        host : '127.0.0.1',
        user: "root",
        password: "root",
    });

    con.connect(function(err){
        if(err)console.log(err);
        else{
            console.log("DB connect");
            con.query("CREATE DATABASE  player", function(err,res){
                if(err) console.log(err);
                console.log("DB create");
            });
        }
    });
}

function createTable(mysql){
    const con = mysql.createConnection({
        socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
        host : '127.0.0.1',
        user: "root",
        password: "root",
        database: "player"
    });

    con.connect(function(err){
        if(err) console.log(err);
        else{
            console.log("DB connect");
            let sql="CREATE TABLE customers (id INT(11) AUTO_INCREMENT PRIMARY KEY, pseudo VARCHAR(10), nom VARCHAR(10), prenom VARCHAR(10), password VARCHAR(255), score FLOAT, partie VARCHAR(255), connected boolean)";
            con.query(sql, function(err, res){
                if(err) console.log(err);
                else{
                    console.log("Table create");
                }
            });
        }
    });
}
let con = mysql.createConnection({
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    host : '127.0.0.1',
    user: "root",
    password: "root",
    database: "player"
});

con.connect(function(err){
    if(err) {
        createDB(mysql);
    }
    else{
        let sql="SELECT * FROM customers";
        con.query(sql,(err,customers,fields)=>{
            if(err){
                createTable(mysql);
            }
        });
    }
});
con = mysql.createConnection({
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    host : '127.0.0.1',
    user: "root",
    password: "root",
    database: "player"
});
con.connect(function(err){
    if(err) {
        let sql="SELECT * FROM customers";
        con.query(sql,(err,customers,fields)=>{
            if(err){
                createTable(mysql);
            }
        });
    }
    else{

    }
});




const express=require('express');
var app=express();

const{generateMessage}=require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users}=require('./utils/user');
const bcrypt=require('bcrypt');

const bodyparser=require("body-parser");
const md=require('./public/js/hachage');

app.use(express.static('public'));
var serveur=require('http').Server(app);

let users=new Users();


app.use(bodyparser.urlencoded({
    extended: true
}));



app.get('/inscription', function(req,res){
    res.sendFile(__dirname + '/public/inscription.html');
});
app.get('/',function(req, res, next){
    res.sendFile(__dirname + '/public/connexion.html');
});
app.get('/menu',function(req,res, next){
    res.sendFile(__dirname+'/public/menu.html');
});
app.get('/logRoom',function(req, res, next){
    res.sendFile(__dirname + '/public/loginToRoom.html');
});
app.get('/score', function(req,res,next){
    res.sendFile(__dirname + '/public/score.html');
});
app.get('/documentation',function(req, res, next){
    res.sendFile(__dirname + '/public/documentation.html');
});
app.get('/game',function(req, res, next){
    res.sendFile(__dirname + '/public/game.html');
});













//inscription
app.post('/inscription',function(req,res,next){
    console.log("bienvenue");
    const con = mysql.createConnection({
        socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
        host : '127.0.0.1',
        user: "root",
        password: "root",
        database: "player"
    });
    con.connect(req,function(err){
        if(err) console.log("11"+err);
        else {
            let sql="SELECT * FROM customers WHERE pseudo='"+req.body.pseudo+"'";
            con.query(sql,(err,customers,fields)=>{
                if(err){
                    console.log("verif "+err);
                }
                else{   
                    if(customers.length==0){
                        (async()=>{
                            try{
                                let text=req.body.password;

                                let salt=await bcrypt.genSalt(10);
                                let hash=await bcrypt.hash(text,salt);
                                
                                sql="INSERT INTO customers (pseudo, nom, prenom, password) VALUES ('"+req.body.pseudo+"', '"+req.body.nom+"', '"+req.body.prenom+"', '"+hash+"')";
                                con.query(sql,(err,result)=>{
                                    
                                    if(err) {
                                        console.log("22"+err);
                                        res.redirect('/inscription');
                                    }
                                    else{
                                        console.log("succed insert");
                                        res.redirect('/');
                                    }
                                });
                            }
                            catch{
                                console.log(console.error.message);
                                res.redirect('/inscription');
                            }
                        })();
                    }
                    else {
                        res.redirect('/inscription');
                    }
                }
            });
        }
    });
});


//connexion
app.post('/', function(req,res,next){
    const con = mysql.createConnection({
        socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
        host : '127.0.0.1',
        user: "root",
        password: "root",
        database: "player"
    });
    console.log("allez");
    con.connect(function(err){
        if(err) console.log("connect \n" +err);
        else { 
            let sql="SELECT * FROM customers WHERE pseudo='"+req.body.pseudo+"'";
            con.query(sql,(err,customers,fields)=>{
                if(err) {
                    console.log("custome \n"+err);
                    res.redirect('/connexion');
                } 
                else{
                    if(customers.length>0){
                        (async()=>{
                            try{
                                let text=req.body.password;
            
                                let salt=await bcrypt.genSalt(10);
                                let hash=customers[0].password;
                                let compare=await bcrypt.compare(text,hash);
                                if(compare==true){
                                    connected=true;
                                    res.redirect('/menu');
                                }
                                else
                                    res.redirect('/');
                            }
                            catch{
                                console.log(console.error.message);
                                res.redirect('/');
                            }
                        })();
                    }
                    else res.redirect('/');
                }
            });
        }
    });
});














serveur.listen(port,function(){
    console.log('lecture sur le port :',port)
});

var io=require('socket.io')(serveur,{});

io.sockets.on('connection',(socket)=>{
    console.log("New users vient de se connecter");

    socket.on('join', (params ,callback) => {

        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Nom et room requise');
        }
        if(users.getUserList(params.room).length<2){
            console.log(params.name,"a rejoin la room nommé :", params.room);


        socket.join(params.room); //permet de rejoindr la room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);//permet d'ajouter un user
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));// envoie la liste des users connceter dans la room 
        socket.emit('newMessage', generateMessage('Admin',"Bienvenue dans le chat"));
        socket.to(params.room).broadcast.emit('newMessage',generateMessage("Admin","Une nouvelle personne s'est connecté"));
        if(users.getUserList(params.room).length==1){
            socket.emit('couleur', "Blanc");
        }
        else{
            socket.emit('couleur', "Noir");
            let user=users.getUser(socket.id);
            io.to(user.room).emit('chrono',true);
        }
        }
        else{
            return callback('Partie pleine');
        }
        
        
    });

    socket.on('jouer',(data)=>{
        let user=users.getUser(socket.id);
        io.to(user.room).emit('jouer',data);
    })

    socket.on('createMessage',(message)=>{
        let user=users.getUser(socket.id);
        console.log("Message créer : ", message);
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    })


    socket.on('disconnect',()=>{
        console.log('User deconnecté');
        let user=users.removeUser(socket.id);
         if(user){
           io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
           io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} a quitté le chat`));
        } //io.to envoie seulement à la room en question

        
    })
})






