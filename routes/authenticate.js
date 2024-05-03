const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require ('bcrypt');
var users = [];

const passport = require('passport');


const initializePassport = require('../passport-config')
initializePassport(
    passport, 
    email => users.find(users => users.email === email),
    id => users.find(user => user.id === id)
 )


 




 const db  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'memory'

})

 router.get('/Login', checkNotAuthenticated, (req, res) => {

    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.
        const befehl = "select * from users"
        console.log('Ausgeführter Befehl:', befehl);

        // Hier sollte db.query sicher implementiert sein (abhängig von deinem Datenbankmodul).
        db.query(befehl, (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
               
                return [];
            }

            
            // Sende die Ergebnisse als JSON.
            return users = results;
            
           
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
       
    }
    
    return res.render("Login");
});


router.get('/register', checkNotAuthenticated, (req, res) => {

    return res.render("register");
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 10);
        const name = req.body.name;

        const selectQuery = "SELECT email FROM users WHERE email = ?";
        const insertQuery = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";

        console.log('Ausgeführter Befehl:', selectQuery);

        db.query(selectQuery, [email], (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                return res.status(500).send('Fehler beim Abfragen der Daten');
            }

            if (results.length > 0) {
                return res.render("register", { message: "Benutzer bereits vorhanden" });
            }

            db.query(insertQuery, [email, password, name], (error, results) => {
                if (error) {
                    console.error('Fehler beim Einfügen der Daten:', error);
                    return res.status(500).send('Fehler beim Einfügen der Daten');
                }
                
                console.log("Erfolgreich eingefügt");
                res.redirect('/login');
            });
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).send('Unbehandelter Fehler');
    }
});




router.post('/login' ,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Login successful!'
}));


function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}
router.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }

        res.cookie('userId', '', { expires: new Date(0), httpOnly: true, secure: true });
        res.cookie('iv', '', { expires: new Date(0), httpOnly: true, secure: true });
        res.redirect('/login');
    });
});

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
       return res.redirect('/')
    }

   
     next()
}

module.exports = router;