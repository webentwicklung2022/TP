const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tipp_spiel'

})



router.get('/', checkAuthenticated, (req, res) => {

    const user = decipher(req).split(',');

    res.render("home", { nickname: user[2] });


});

function checkAuthenticated(req, res, next) {
    if (decipher(req) !== null) {
        return next()
    }

    res.redirect('/login')
}


router.get('/user-leaderboard', checkAuthenticated, (req, res) => {
  

    try {
       
        const user = decipher(req).split(',');
        const user_Id = user[0];
        const befehl = "SELECT punkte FROM users WHERE id = " + user_Id ;  
 
        
        db.query(befehl, (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                res.status(500).json({ error: 'Interner Serverfehler' });
                return;
            }

            console.log('Daten erfolgreich abgefragt:', results);
            // Sende die Ergebnisse als JSON.
            res.render("user-leaderboard", {punkte: results[0].punkte});
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
    


});


router.get('/teams-leaderboard', checkAuthenticated, (req, res) => {

    res.render("teams-leaderboard");


});

router.get('/tipp-history', checkAuthenticated, (req, res) => {

    res.render("tipp-history");


});

router.get('/contact', checkAuthenticated, (req, res) => {

    res.render("contact");


});

router.post('/contact', checkAuthenticated, (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;
    console.log(name + " " + email + " " + comment);


    // Transporter-Konfiguration
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Sie können jeden anderen E-Mail-Service verwenden
        auth: {
            user: 'tippspiel2024@gmail.com',
            pass: 'msxy qxbj trey mcgv'
        }
    });

    // E-Mail-Optionen
    let mailOptions = {
        from: email,
        to: 'webentwicklung2022@gmail.com',
        subject: `Kontaktformular Nachricht von Tipp-Spiel`,
        html: `<b>Email: ${email}</b> <br> <b>Name: ${name}</b> <br> <b>Nachricht:</b> ${comment}`
    };

    // E-Mail senden
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.render("contact" , {msg: "die Nachricht wurde erfolgreich gesendet."});
    });

});


router.get('/abfrage/:befehl/:werte', checkAuthenticated, (req, res) => {

    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.

        var befehl = req.params.befehl;
        var werte = req.params.werte || "";
        const user = decipher(req).split(',');
        const user_Id = user[0];

        console.log(werte)
        switch (befehl) {
            case "1":
                befehl = "SELECT punkte, nickname FROM users WHERE punkte != 0 order by punkte desc";
                break;
            case "2":
                befehl = "SELECT team.name as name, sum(users.punkte) as punkte FROM users join team on users.team_id = team.id WHERE punkte != 0 group by team.name order by punkte desc";
                break;
            case "3":
                befehl = "SELECT home_team, away_team, home_score, away_score, status from tipp where user_id =" + user_Id;
                break;
            case "4":
                befehl = "SELECT id, home_name, away_name, date, time from spiele where date = '" + werte + "'";
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

router.post('/tipp', checkAuthenticated, (req, res) => {

    try {
        const user = decipher(req).split(',');
        const user_Id = user[0];
        const match_id = req.body.match_id;
        const match_date = req.body.match_date;
        const home_team = req.body.home_team;
        const away_team = req.body.away_team;
        const home_score = req.body.home_score;
        const away_score = req.body.away_score;
        const status = "offen";
        const recive_date = "null";

        console.log(user_Id + " " + match_id + " " + match_date + " " + home_team + " " + away_team + " " + home_score + " " + away_score + " " + status + " " + recive_date)

        const selectQuery = "SELECT match_id FROM tipp WHERE match_id = ? and user_id = ?";
        const insertQuery = "INSERT INTO tipp (user_Id, match_id, match_date, home_team, away_team, home_score, away_score, status, recive_date ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )";

        console.log('Ausgeführter Befehl:', selectQuery);

        db.query(selectQuery, [match_id, user_Id], (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                return res.status(500).send('Fehler beim Abfragen der Daten');
            }

            if (results.length > 0) {
                return res.render("home", { message: "Bereits getippt" });
            }

            db.query(insertQuery, [user_Id, match_id, match_date, home_team, away_team, home_score, away_score, status, recive_date], (error, results) => {
                if (error) {
                    console.error('Fehler beim Einfügen der Daten:', error);
                    return res.status(500).send('Fehler beim Einfügen der Daten');
                }

                console.log("Erfolgreich eingefügt");
                res.redirect('/');
            });
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).send('Unbehandelter Fehler');
    }


});





function decipher(req) {

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




