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
    database: 'tipp_spiel'

})

 router.get('/login', checkNotAuthenticated, (req, res) => {

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
    
    return res.render("login");
});


router.get('/register', checkNotAuthenticated, (req, res) => {

    return res.render("register");
});
/*Host*/ 
router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 10);
        const punkte = 0;
        
        const championship = req.body.championship;

        if(championship === "Team auswählen"){
            return res.render("register", { message: "Bitte ein Mannschaft auswählen" });
        }

        const nickname = req.body.nickname;
        const vorname = req.body.vorname;
        const nachname = req.body.nachname;
        const uservalidation = await getTeamId(vorname , nachname);
        const uservalidation_id = uservalidation.id;
        const team_id = uservalidation.team_id;

        if(uservalidation === "null"){
            return res.render("register", { message: "Vorname oder Nachname sind falsch" });
        }

        if(uservalidation === "null1"){
            return res.render("register", { message: "Name ist bereits registriert" });
        }

        const selectQuery = "SELECT email FROM users WHERE email = ?";
        const selectQuery2 = "SELECT nickname FROM users WHERE nickname = ?";
        const insertQuery = "INSERT INTO users (email, punkte, password, team_id, nickname , championship , uservalidation_id ) VALUES (?, ?, ?, ?, ?, ?, ?)";

        console.log(championship);
        console.log(uservalidation_id + " " + team_id);

        console.log('Ausgeführter Befehl:', selectQuery);

        db.query(selectQuery, [email], (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                return res.status(500).send('Fehler beim Abfragen der Daten');
            }
            if (results.length > 0) {
                return res.render("register", { message: "Email bereits vorhanden" });
            }

            db.query(selectQuery2, [nickname], (error, results) => {
                if (error) {
                    console.error('Fehler beim Abfragen der Daten:', error);
                    return res.status(500).send('Fehler beim Abfragen der Daten');
                }

                if (results.length > 0) {
                    return res.render("register", { message: "Nickname bereits vorhanden" });
                }

                if (nickname.length > 15) {
                    return res.render("register", { message: "Nickname zu lang (Max 15 Zeichen)" });
                }

                db.query(insertQuery, [email, punkte, password, team_id, nickname, championship, uservalidation_id ], (error, results) => {
                    if (error) {
                        console.error('Fehler beim Einfügen der Daten:', error);
                        return res.status(500).send('Fehler beim Einfügen der Daten');
                    }

                    console.log("Erfolgreich eingefügt");
                    res.render('login' , {msg: "Die Registrierung war erfolgreich"});
                });
            });
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).send('Unbehandelter Fehler');
    }
});

/*Host*/ 



router.post('/login' ,passport.authenticate('local', {
    successRedirect: '/pre',
    failureRedirect: '/login',
    failureFlash: ' E-Mail oder Passwort ist falsch.',
    successFlash: 'Login successful!'
}));


router.get('/pre', checkAuthenticated, (req, res) => {
   
    try {


        if(decipher(req) !== null){
            console.log("du darfst das nicht")
          return res.redirect("/");
        }
       
    const user = req.user.id + "," + req.user.email  + "," + req.user.nickname +  "," + req.user.punkte  +  "," + req.user.team_id;
    const crypto = require('crypto');

    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync('@MemorySpiel24', 'salt', 32); // Schlüssel auf 32 Bytes vergrößern

    // Initialisierungsvektor erzeugen
    const iv = crypto.randomBytes(16);

    // Text verschlüsseln
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(user, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Cookie mit der Benutzer-ID und IV setzen
    res.cookie('pre', encrypted, { httpOnly: true});
    res.cookie('iv', iv.toString('hex'), { httpOnly: true});
    
    res.redirect("/start");
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
    
});


function checkAuthenticated(req, res, next){
    
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}
router.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }

        res.cookie('pre', '', { expires: new Date(0), httpOnly: true });
        res.cookie('iv', '', { expires: new Date(0), httpOnly: true});
        res.redirect('/login');
    });
});

function checkNotAuthenticated(req, res, next){
    if(decipher(req) !== null){
       return res.redirect('/')
    }

   
     next()
}

function decipher(req,res){

    try {
        const crypto = require('crypto');
        // Cookie mit dem Namen "userId" abrufen
        const encryptedUser = req.cookies.pre;
        const ivHex = req.cookies.iv;
    
        // Überprüfen, ob das Cookie vorhanden ist
        if (encryptedUser && ivHex) {
            // Schlüssel und IV wiederherstellen
            const key = crypto.scryptSync('@MemorySpiel24', 'salt', 32); // Schlüssel muss mit dem übereinstimmen, der bei der Verschlüsselung verwendet wurde
            const iv = Buffer.from(ivHex, 'hex');
    
            // Text entschlüsseln
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = decipher.update(encryptedUser, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
    
            // Entschlüsselte Benutzer-ID im Response anzeigen
           return decrypted;
        } else {
          return null;
        }  
        
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).send('Unbehandelter Fehler');
    }

  
}




/*Host*/ 

async function getTeamId(vorname, nachname) {
    // Dies ist ein Platzhalter für eine echte Datenbankabfrage.
   
    const befehl = `SELECT id , team_id, logged FROM uservalidation where vorname = ? and nachname = ?`;
  
    return new Promise((resolve, reject) => {

        try {
            db.query(befehl, [vorname, nachname] , (error, results) => {
                if (error) {
                  console.error('Fehler beim Abfragen der Daten:', error);
                  return; reject(new Error('Fehler beim Abfragen der Daten'));
                  
                }

           if (results.length === 0) {
                    return resolve("null"); // Keine ID gefunden, also null zurückgeben
                }

                if (results[0].logged === 1) {
                    return resolve("null1"); // Keine ID gefunden, also null zurückgeben
                }    
                
                return  resolve(results[0]);
              });
            
        } catch (error) {
            reject(error);
        }
     
    });
  }
/*Host*/ 

async function test(){
    const t = await getTeamId("Mahmoud","Khalaf");

    console.log(t)
 
}
test()


module.exports = router;