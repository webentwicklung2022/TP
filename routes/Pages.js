const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer'); 
const moment = require('moment');  
const cron = require('node-cron');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tipp_spiel'

})



router.get('/',  checkAuthenticated, async (req, res) => {

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

     
    try {
       
        const user = decipher(req).split(',');
        const team_Id = user[4];
       
        const befehl = `SELECT SUM(users.punkte) AS punkte
        FROM users
        JOIN team ON users.team_id = team.id
        WHERE team_id = ${team_Id}
        GROUP BY team.name
        ORDER BY punkte DESC;`;  
 
        
        db.query(befehl, (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                res.status(500).json({ error: 'Interner Serverfehler' });
                return;
            }

            console.log('Daten erfolgreich abgefragt:', results);
            // Sende die Ergebnisse als JSON.
            res.render("teams-leaderboard", {punkte: results[0].punkte});
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }

 
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

router.get('/table', checkAuthenticated, (req, res) => {

    res.render("table");


});



router.get('/abfrage/:befehl/:werte', checkAuthenticated, (req, res) => {

    try {
        // Achtung vor SQL-Injection! Verwende Parameterisierte Abfragen.

        var befehl = req.params.befehl;
        var werte = req.params.werte || "";
        const user = decipher(req).split(',');
        const user_Id = user[0];

     
        switch (befehl) {
            case "1":
                 /*Host*/
                if(werte == "Gesamt"){
                    befehl = "SELECT punkte, nickname FROM users WHERE punkte != 0 order by punkte desc";
                    break;
                }else if(werte  == "Wöchentlich"){
                    befehl = `SELECT SUM(tipp.recived_points) AS punkte, users.nickname AS nickname
                    FROM users
                    JOIN tipp ON users.id = tipp.user_id
                    WHERE tipp.recive_date >= CURRENT_DATE - INTERVAL '7' DAY
                    GROUP BY tipp.user_id, users.nickname
                    HAVING SUM(tipp.recived_points) > 0  -- Having clause to filter users with points only
                    ORDER BY SUM(tipp.recived_points) DESC;
                    `;
                    break;
                }else{
                    befehl = `SELECT SUM(tipp.recived_points) AS punkte, users.nickname AS nickname
                    FROM users
                    JOIN tipp ON users.id = tipp.user_id
                    WHERE DATE(tipp.recive_date) = CURRENT_DATE
                    GROUP BY tipp.user_id, users.nickname
                    HAVING SUM(tipp.recived_points) > 0  -- Having clause to filter users with points only
                    ORDER BY SUM(tipp.recived_points) DESC;
                    `;
                    break;
                }
                 /*Host*/
            case "2":
                 /*Host*/
                if(werte == "Gesamt"){
                    befehl = "SELECT team.name as name, sum(users.punkte) as punkte FROM users join team on users.team_id = team.id WHERE punkte != 0 group by team.name order by punkte desc";
                    break;
                }else if(werte  == "Wöchentlich"){
                    befehl = `SELECT team.name AS name, SUM(tipp.recived_points) AS punkte
                    FROM users
                    JOIN team ON users.team_id = team.id
                    JOIN tipp ON users.id = tipp.user_id
                    WHERE tipp.recive_date >= CURRENT_DATE - INTERVAL '7' DAY
                    GROUP BY team.name
                    HAVING SUM(tipp.recived_points) > 0
                    ORDER BY punkte DESC;`;
                    break;
                }else{
                    befehl = `SELECT  team.name as name, sum(tipp.recived_points) as punkte
                    FROM users 
                    join team on users.team_id = team.id 
                    join tipp on users.id = tipp.user_id
                     WHERE DATE(tipp.recive_date) = CURRENT_DATE
                     group by team.name  
                     HAVING SUM(tipp.recived_points) > 0 
                     order by punkte desc`;
                    break;
                }
                 /*Host*/
            case "3":
                befehl = "SELECT home_team, away_team, home_score, away_score, status from tipp where user_id =" + user_Id;
                break;
            case "4":
                befehl = "SELECT id, home_name, away_name, date, time, ausgang, home_score, away_score from spiele where date = '" + werte + "'";  /*Host ausgang, home_score, away_score*/
                break;
            default:
                befehl = "SELECT * FROM team";
        }
       
        // Hier sollte db.query sicher implementiert sein (abhängig von deinem Datenbankmodul).
        db.query(befehl, (error, results) => {
            if (error) {
                console.error('Fehler beim Abfragen der Daten:', error);
                res.status(500).json({ error: 'Interner Serverfehler' });
                return;
            }

            
            // Sende die Ergebnisse als JSON.
            res.json(results);
        });
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.post('/tipp', checkAuthenticated, async (req, res) => {

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

        /*Host*/
        const result = await getDateTimeByMatchId(match_id);
        if(checkDateAndTime(result.date, result.time)){
            return res.render("home", { message: "Tippzeit abgelaufen" });
        }
         /*Host*/

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

 

async function getDateTimeByMatchId(match_id) {
    // Dies ist ein Platzhalter für eine echte Datenbankabfrage.
   
    const befehl = `SELECT date, time FROM spiele WHERE id = ${match_id}`;
  
    return new Promise((resolve, reject) => {

        try {
            db.query(befehl, (error, results) => {
                if (error) {
                  console.error('Fehler beim Abfragen der Daten:', error);
                  return; reject(new Error('Fehler beim Abfragen der Daten'));
                  
                }
          
                
                return  resolve(results[0]);
              });
            
        } catch (error) {
            reject(error);
        }
     
    });
  }

/*HOST ÄNDERUNG EINFÜGEN*/
  function checkDateAndTime(date , time) {
    const now = new Date();


    
    // Optionen für die Formatierung des Datums
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    // Datum und Uhrzeit formatieren
    const formattedDate = now.toLocaleDateString('de-DE', options); // z.B. 22.05.2024
  

    const timeStr = time;
    const timeObj = moment(timeStr, 'HH:mm:ss');
    const timeMinus30 = timeObj.subtract(30, 'minutes');
    const currentTime = moment();
    const isCurrentTimeGreater = currentTime.isAfter(timeMinus30);

    const d1 = convertToDate(formattedDate);
    const d2 = convertToDate(date);
   
    // Überprüfen Sie das Datum und die Uhrzeit
    if ((formattedDate == date && isCurrentTimeGreater) || d1 > d2 ) {
        return true;
    } else {
        return false;
    }
}
/*HOST*/


function convertToDate(dateString) {
    let parts = dateString.split('.');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // Monate sind 0-basiert in JavaScript
    let year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}


/*HOST*/
async function getApiId() {
    // Dies ist ein Platzhalter für eine echte Datenbankabfrage.
   
    const befehl = `SELECT api_id FROM spiele where api_id != 0 and ausgang = 'null'`;
  
    return new Promise((resolve, reject) => {

        try {
            db.query(befehl, (error, results) => {
                if (error) {
                  console.error('Fehler beim Abfragen der Daten:', error);
                  return; reject(new Error('Fehler beim Abfragen der Daten'));
                  
                }
          
                
                return  resolve(results);
              });
            
        } catch (error) {
            reject(error);
        }
     
    });
  }






// Host: node-cron und node-fetch@2 auf server installiern mit Package.json datei 

async function CallApiandInsert(id){

try {
 
var api_id = id + "";
console.log(api_id)

const fetch = require('node-fetch');
const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${api_id}`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8a2caacbb6msh6f9da5aa04cf7c8p1a5e38jsnb03f15680a30',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};


	const response = await fetch(url, options);
	const result = await response.json();

    var Obejekt ={ id: api_id,
        home_score: result.response[0].goals.home,
        away_score: result.response[0].goals.away,
        penalty: result.response[0].score.penalty.home + " - " + result.response[0].score.penalty.away,
        home_winner: result.response[0].teams.home.winner,
        away_winner: result.response[0].teams.away.winner,
        status: result.response[0].fixture.status.long
        
    }
    insertResult(Obejekt)
    
} catch (error) {
	console.error(error);
}
}





function insertResult(apiObejekt){

    try {

        const status = apiObejekt.status;
        console.log(status);
        if(status != "Match Finished"){
            console.log("Spiel ist noch nicht zu ende");
            return;
        }
        
        const id = apiObejekt.id;
        const home_score = apiObejekt.home_score;
        const away_score = apiObejekt.away_score;
        const penalty = apiObejekt.penalty;
        const home_winner = apiObejekt.home_winner;
        const away_winner = apiObejekt.away_winner;
        var ausgang = "null";

        if(home_winner == true){
             ausgang = "hw";
        }else if (away_winner == true)
            {
                 ausgang = "aw";
            }else
            {
                 ausgang = "nw";
            }
     console.log(ausgang);

        const insertQuery =` UPDATE spiele SET home_score = ?, away_score = ?, ausgang = ?, penalty = ? WHERE api_id = ?`;

            db.query(insertQuery, [home_score, away_score, ausgang, penalty, id ], (error, results) => {
                if (error) {
                    console.error('Fehler beim Einfügen der Daten:', error);
                    return res.status(500).send('Fehler beim Einfügen der Daten');
                }

                console.log("Erfolgreich eingefügt");
                 return;
            });
      
    } catch (error) {
        console.error('Unbehandelter Fehler:', error);
        res.status(500).send('Unbehandelter Fehler');
    }

}

async function routineCheck(){
    try {
        var ids = await getApiId();
        if (ids.length < 1){
            console.log("keine Spiele gefunden")
            return;
        }
        for (var x = 0; x < ids.length; x++) {
            await CallApiandInsert(ids[x].api_id);
        }
        console.log('Routine Check completed successfully.');
    } catch (error) {
        console.error('Error in routineCheck:', error);
    }
    
 } 

//  routineCheck()


 // Planen der routineCheck für jeden Tag um 01:00 Uhr um die Ergebnisse von EM-Spiele in der Datenbank einzutragen
/*
cron.schedule('0 1 * * *', async () => {
    console.log(`Routine Check started at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    await routineCheck();
});
*/


/*host*/

module.exports = router;




