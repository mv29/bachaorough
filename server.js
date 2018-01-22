const express = require('express')
const session = require('express-session')
const flash=require('connect-flash');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const passport = require('./passport');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some  secret thing',
    resave: false,
    saveUninitialized: false
}));

//const User = require('/db/models').User;
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.set('view engine', 'hbs');


const server = http.createServer(app);
const io = socketio(server);

//const User = require('/db/models').User;
io.on('connection', function (socket) {
   socket.on('chat', (data) => {


       console.log(data);
            socket.broadcast.emit('chat', {
            //    username:req.user,
                message: data.message,
                timestamp: new Date()
            })
    })
});
app.use('/', express.static(__dirname + '/public')); // learn again
app.use('/user', require('./routes/user'));
app.use('/pages', require('./routes/pages'));
//app.use('/public', require('./routes/pages'));
app.get('/', (r,s) => s.render('index'));

server.listen(3232, () => console.log("http://localhost:3232"));