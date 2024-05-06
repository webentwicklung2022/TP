const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tipp_spiel'

})



router.get('/', checkAuthenticated, (req, res) => {

        const user = decipher(req).split(',');
       
        res.render("home" , {nickname: user[2]});
  

});

function checkAuthenticated(req, res, next){
    if(decipher(req) !== null){
        return next()
    }

    res.redirect('/login')
}


router.get('/user-leaderboard', checkAuthenticated , (req, res) => {

    res.render("user-leaderboard");


});


router.get('/teams-leaderboard', checkAuthenticated , (req, res) => {

    res.render("teams-leaderboard");


});

router.get('/test',  (req, res) => {
    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.
        const befehl = "select * from users";
        console.log('Ausgeführter Befehl:', befehl);

        // Hier sollte db.query sicher implementiert sein (abhängig von deinem Datenbankmodul).
        db.query(befehl, (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                res.status(500).json({ error: 'Interner Serverfehler' });
                return;
            }

            console.log('Daten erfolgreich abgefragt:', results);
            // Sende die Ergebnisse als JSON.
            res.json(results);
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }


});

router.get('/abfrage/:befehl/:werte', (req, res) => {

    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.
        var befehl = req.params.befehl;
        var werte = req.params.werte || "";
       

        switch (befehl) {
            case "1":
                befehl = "SELECT punkte, nickname FROM users WHERE punkte != 0 order by punkte desc";
                break;
            case "2":
                befehl = "SELECT team.name as name, sum(users.punkte) as punkte FROM users join team on users.team_id = team.id WHERE punkte != 0 group by team.name order by punkte desc";
                break;
            default:
                befehl = "SELECT * FROM team";
        }
        console.log('Ausgeführter Befehl:', befehl);
        // Hier sollte db.query sicher implementiert sein (abhängig von deinem Datenbankmodul).
        db.query(befehl, (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                res.status(500).json({ error: 'Interner Serverfehler' });
                return;
            }

            console.log('Daten erfolgreich abgefragt:', results);
            // Sende die Ergebnisse als JSON.
            res.json(results);
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});






 router.get('/set-user-id/:userId', (req, res) => {
    // Benutzer-ID aus den URL-Parametern abrufen
    const userId = req.params.userId;
    const crypto = require('crypto');

    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync('@MemorySpiel24', 'salt', 32); // Schlüssel auf 32 Bytes vergrößern

    // Initialisierungsvektor erzeugen
    const iv = crypto.randomBytes(16);

    // Text verschlüsseln
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(userId, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Cookie mit der Benutzer-ID und IV setzen
    res.cookie('user', encrypted, { maxAge: 900000, httpOnly: true, secure: true });
    res.cookie('iv', iv.toString('hex'), { maxAge: 900000, httpOnly: true, secure: true });

    // Bestätigungsnachricht senden
    res.send(`Benutzer-ID ${encrypted} wurde erfolgreich im Cookie gespeichert.`);
});


router.get('/get-cookie', (req, res) => {
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
        res.send(`Entschlüsselte Benutzer-ID: ${decrypted}`);
    } else {
        res.send('Cookie nicht gefunden');
    }
});


function decipher(req){

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
}


  







module.exports = router;




