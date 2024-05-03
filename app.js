const express = require('express');
const path= require('path');
const mysql = require('mysql');
const app = express();
const port = 5050;
const dotenv = require('dotenv');
const bcrypt = require ('bcrypt');
var users = [];
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');



dotenv.config({path: './env'})

 app.use(express.urlencoded({ extended: false }));
 app.use(flash());
 app.use(session({
    secret: "process.env.SECRET",
    resave:false,
    saveUninitialized: false
 }))

 app.use(passport.initialize());
 app.use(passport.session());
 app.use(methodOverride('_method'));
 app.use(cookieParser());


const db  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tipp_spiel'

})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))

// parse URL.encoded badies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
// parse JSON badies (as sent by API clintes)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error)=>{

if(error){
    console.log(error)
}else{
    console.log("my sql ist connected")
}
})

//define Routes
app.use('/', require('./routes/Pages'));
app.use('/', require('./routes/authenticate'));







app.listen(port,()=>{
    console.log("Server is running on port 5050 klick hier http://localhost:5050/")
});


