const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'memory'

})

router.post('/eintragen', (req, res) => {
    const { Frage, Antwort, Set_ID } = req.body;

    // Beispiel für eine SQL-Abfrage zum Einfügen von Daten
    const sql = 'INSERT INTO karten (Frage, Antwort, Set_ID) VALUES (?, ?, ?)';


    // Führe die SQL-Abfrage aus und übergib die Werte als Parameter
    db.query(sql, [Frage, Antwort, Set_ID], (error, results) => {
        if (error) {
            console.error('Fehler beim Einfügen der Daten:', error);
            res.status(500).send('Interner Serverfehler');
            return;
        }

        console.log('Daten erfolgreich eingefügt:', results);

        // Hier könntest du optional eine Weiterleitung oder eine andere Antwort senden
        res.render('index');
    });
});

router.get('/', checkAuthenticated, (req, res) => {

    if (req.isAuthenticated()) {

        res.render("Start", { m: "angemeldet", s: req.user.name });
    } else {
        res.render("Start");
    }

});
router.get('/Memory', (req, res) => {

    if (req.isAuthenticated()) {
        res.render("Memory", { a: true });
    } else {
        res.render("Memory");
    }
    res.render("Memory");
});
router.get('/test', (req, res) => {
    res.render("test");
});

router.get('/Setwaehlen', (req, res) => {
    res.render("Setwaehlen");
});

router.get('/Setbearbeiten', checkAuthenticated, (req, res) => {
    res.render("SetBearbeiten");
});

router.get('/QuizSeterstellen', checkAuthenticated, (req, res) => {
    res.render("Seterstellen");
});


router.post('/setausgewaehlt', (req, res) => {

    set = req.body.id;
    return res.render('Memory', { Set: set });

});


router.get('/eintraegeAnzeigen', (req, res) => {
    let ergebnis = '';
    db.query('Select * from karten', (error, results) => {

        if (error) {
            console.error('Fehler beim abfragen der Daten:', error);
            res.status(500).send('Interner Serverfehler');
            return;
        }

        console.log('Daten erfolgreich abgefragt:', results);



        res.render('test', { karten: results });


    });


});

router.post('/sqlbefehl', (req, res) => {
    const sqlbefehl = req.body.sqlbefehl;

    // Beispiel für eine SQL-Abfrage zum Einfügen von Daten


    // Führe die SQL-Abfrage aus und übergib die Werte als Parameter
    db.query(sqlbefehl, (error, results) => {
        if (error) {
            console.error('Fehler beim Einfügen der Daten:', error);
            res.status(500).send('Interner Serverfehler');
            return;
        }

        console.log('Daten erfolgreich eingefügt:', results);

        // Hier könntest du optional eine Weiterleitung oder eine andere Antwort senden
        res.render('test', { karten: results });
    });
});



router.get('/abfrage/:befehl', (req, res) => {
    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.
        const befehl = req.params.befehl;
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

router.get('/abfrage1/:befehl/:werte', (req, res) => {

    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.
        var befehl = req.params.befehl;
        var werte = req.params.werte || "";
        if (befehl == "4" && !req.isAuthenticated() /*hier muss auf server noch nicht Admin sein*/) {
            befehl = ""
        }

        switch (befehl) {
            case "1":
                befehl = "SELECT * FROM karten WHERE Set_ID =" + werte;
                break;
            case "2":
                befehl = "SELECT * FROM sets";
                break;
            case "3":
                befehl = "SELECT MAX(ID) AS 'ID' FROM sets";
                break;
            case "4":
                befehl = "DELETE FROM sets WHERE Name_Set =" + werte;
                break;
            case "5":
                befehl = "select SetID from spiele where Memory ='1'";
                break;
            case "6":
                befehl = "select * from sets Where ID "+ werte;
                break;
            default:
                befehl = "SELECT * FROM karten";
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

router.post('/delete', async (req, res) => {
    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.
        const befehl = req.body.befehl;
        console.log('Ausgeführter Befehl:', befehl);

        // Hier sollte db.query sicher implementiert sein (abhängig von deinem Datenbankmodul).
        const results = await db.query(befehl);

        console.log('Daten erfolgreich gelöscht:', results);
        // Sende die Ergebnisse als JSON.
        res.redirect('/Setbearbeiten');
    } catch (error) {
        console.error('Fehler beim Abfragen der Daten:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});



router.post('/MemorySetErstellen', checkAuthenticated, (req, res) => {
    const { setID, NameSet, ThemaSet,
        Frage, Antwort,
        Frage1, Antwort1,
        Frage2, Antwort2,
        Frage3, Antwort3,
        Frage4, Antwort4,
        Frage5, Antwort5,
        Frage6, Antwort6,
        Frage7, Antwort7,
        Frage8, Antwort8,
        Frage9, Antwort9, } = req.body;
    const werte1 = [setID, NameSet, ThemaSet];
    const werte2 = [Frage, Antwort, setID,
        Frage1, Antwort1, setID,
        Frage2, Antwort2, setID,
        Frage3, Antwort3, setID,
        Frage4, Antwort4, setID,
        Frage5, Antwort5, setID,
        Frage6, Antwort6, setID,
        Frage7, Antwort7, setID,
        Frage8, Antwort8, setID,
        Frage9, Antwort9, setID];

    const werte3 = [setID, "1", "0", "0"];

    const sql1 = `INSERT INTO sets (ID, Name_Set, LernThema ) VALUES (?, ?, ?)`;
    const sql2 = `INSERT INTO karten (Frage, Antwort, Set_ID) VALUES 
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?)`;
    const sql3 = `INSERT INTO spiele (SetID, Memory, Karteikarten, Quiz) VALUES (?, ?, ?, ?)`;






    db.query(sql1, werte1, (error, results) => {
        if (error) {
            console.error('Fehler beim Einfügen der Daten:', error);
            res.status(500).send('Interner Serverfehler');
            return;
        }

        console.log('Daten erfolgreich eingefügt:', results);


    });

    setTimeout(function () {
        db.query(sql2, werte2, (error, results) => {
            if (error) {
                console.error('Fehler beim Einfügen der Daten:', error);
                res.status(500).send('Interner Serverfehler');
                return;
            }

            console.log('Daten erfolgreich eingefügt:', results);


        });

    }, 500);
    setTimeout(function () {
        db.query(sql3, werte3, (error, results) => {
            if (error) {
                console.error('Fehler beim Einfügen der Daten:', error);
                res.status(500).send('Interner Serverfehler');
                return;
            }

            console.log('Daten erfolgreich eingefügt:', results);
            res.redirect('/Setwaehlen');

        });

    }, 600);





});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function getName(email) {

    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.
        const befehl = "select name from users where email =" + email;
        console.log('Ausgeführter Befehl:', befehl);

        // Hier sollte db.query sicher implementiert sein (abhängig von deinem Datenbankmodul).
        db.query(befehl, (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);

                return [];
            }

            console.log('Daten erfolgreich abgefragt:', results);
            // Sende die Ergebnisse als JSON.
            return results;


        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);

    }

}

router.get('/session', (req, res) => {
    // Alle Inhalte der Benutzersitzung abrufen
    const sessionData = req.session;
  
    // Ausgabe der Sitzungsdaten
    res.json(sessionData);
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
    res.cookie('userId', encrypted, { maxAge: 900000, httpOnly: true, secure: true });
    res.cookie('iv', iv.toString('hex'), { maxAge: 900000, httpOnly: true, secure: true });

    // Bestätigungsnachricht senden
    res.send(`Benutzer-ID ${encrypted} wurde erfolgreich im Cookie gespeichert.`);
});

router.get('/get-cookie', (req, res) => {
    const crypto = require('crypto');

    // Cookie mit dem Namen "userId" abrufen
    const encryptedUserId = req.cookies.userId;
    const ivHex = req.cookies.iv;

    // Überprüfen, ob das Cookie vorhanden ist
    if (encryptedUserId && ivHex) {
        // Schlüssel und IV wiederherstellen
        const key = crypto.scryptSync('@MemorySpiel24', 'salt', 32); // Schlüssel muss mit dem übereinstimmen, der bei der Verschlüsselung verwendet wurde
        const iv = Buffer.from(ivHex, 'hex');

        // Text entschlüsseln
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedUserId, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        // Entschlüsselte Benutzer-ID im Response anzeigen
        res.send(`Entschlüsselte Benutzer-ID: ${decrypted}`);
    } else {
        res.send('Cookie nicht gefunden');
    }
});


  







module.exports = router;




