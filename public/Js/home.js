// var container = document.getElementsByClassName("container");

const hinweis = document.querySelector("#hinweis");



if (hinweis.innerHTML.trim() !== "") {
  setTimeout(() => {
    // Innerhalb der setTimeout-Funktion solltest du keine direkte Rückgabe verwenden
    location.href = "/";
  }, 1000); // 1000 Millisekunden = 1 Sekunden
}





/*Host erste Date[0] ist Test-Date muss immer gewünschte Datum sein, um zu testen */ 
var dates = ['14.06.2024', '15.06.2024', '16.06.2024', '17.06.2024', '18.06.2024', '19.06.2024', '20.06.2024', '21.06.2024', '22.06.2024', '23.06.2024', '24.06.2024', '25.06.2024', '26.06.2024']
var index = sessionStorage.getItem("index");

if(index === null){
  index = 0;
}


var date = dates[index];




function schalter(richtung) {

  if (richtung == "rechts") {
    if (index < dates.length - 1) { /*Host dates.length - 1*/
      index++;
      date = dates[index]
      sessionStorage.setItem("index", index.toString());
    } else {
      return
    }


  } else {
    if (index > 0) {
      index--;
      date = dates[index]
      sessionStorage.setItem("index", index.toString());
    } else {
      return
    }

  }


  fetchData()
}

async function fetchData() {
  try {
    const response = await fetch("/abfrage/4/" + date);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }



    const data = await response.json();
    const Ids  = await fetchDataID();
    // Hier kannst du mit den geladenen Daten arbeiten
    datenEinfuegen(data , Ids);
    
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function fetchDataID() {
  try {
    const response = await fetch("/abfrage/5/null");

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data1 = await response.json();
    // Hier kannst du mit den geladenen Daten arbeiten
   
    return data1; // Korrigiert von 'date1' zu 'data1'
    
  } catch (error) {
    console.error('Fetch error:', error);
  }
}


fetchData();

const spiel_plan = document.querySelector(".spiel_plan")

function datenEinfuegen(data, Ids) {
  spiel_plan.innerHTML = `<div class="datum"><i id="icon" onclick="schalter('links')" class="fa-solid fa-circle-left"></i> <p class="d">${data[0].date}</p> <i id="icon" onclick="schalter('rechts')" class="fa-solid fa-circle-right"></i></div>`;

  data.forEach((item, x) => {
    let matchIdExists = Ids.some(id => id.match_id === item.id);

    if (!matchIdExists) {
      if (item.ausgang === "null") {
        spiel_plan.innerHTML += `
        <li>
          <div class="home"><img class="home_img" src="${nameToFlag(item.home_name)}"><p class="home_name">${GroßSchreiben(item.home_name)}</p></div>
          <div class="Uhrzeitundbtn"><div class="Uhrzeit">${item.time.substring(0, 5)} Uhr</div><button class="tippen_btn" onclick="tippenPopup(${x})">Tippen</button></div>
          <div class="away"><img class="away_img" src="${nameToFlag(item.away_name)}"><p class="away_name">${GroßSchreiben(item.away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${item.id}"></div>
        </li>`;
      } else if (item.home_penalty === "null" && item.away_penalty === "null") {
        spiel_plan.innerHTML += `
        <li>
          <div class="home"><img class="home_img" src="${nameToFlag(item.home_name)}"><p class="home_name">${GroßSchreiben(item.home_name)}</p></div>
          <div class="Uhrzeitundbtn"><div class="Uhrzeit">Ausgang</div><h3 style="font-size: 1.6rem">${item.home_score} - ${item.away_score}</h3></div>
          <div class="away"><img class="away_img" src="${nameToFlag(item.away_name)}"><p class="away_name">${GroßSchreiben(item.away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${item.id}"></div>
        </li>`;
      } else {
        spiel_plan.innerHTML += `
        <li>
          <div class="home"><img class="home_img" src="${nameToFlag(item.home_name)}"><p class="home_name">${GroßSchreiben(item.home_name)}</p></div>
          <div class="Uhrzeitundbtn"><div class="Uhrzeit">Ausgang</div><h3 style="font-size: 1.6rem">${item.home_score} - ${item.away_score}</h3><small>P ${item.home_penalty} - ${item.away_penalty}</small></div>
          <div class="away"><img class="away_img" src="${nameToFlag(item.away_name)}"><p class="away_name">${GroßSchreiben(item.away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${item.id}"></div>
        </li>`;
      }
    } else {
      if (item.home_penalty === "null" && item.away_penalty === "null" && item.ausgang !== "null") {
        spiel_plan.innerHTML += `
        <li>
          <div class="home"><img class="home_img" src="${nameToFlag(item.home_name)}"><p class="home_name">${GroßSchreiben(item.home_name)}</p></div>
          <div class="Uhrzeitundbtn"><div class="Uhrzeit">Ausgang</div><h3 style="font-size: 1.6rem">${item.home_score} - ${item.away_score}</h3></div>
          <div class="away"><img class="away_img" src="${nameToFlag(item.away_name)}"><p class="away_name">${GroßSchreiben(item.away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${item.id}"></div>
        </li>`;
      } else if (item.home_penalty !== "null" && item.away_penalty !== "null" && item.ausgang !== "null") {
        spiel_plan.innerHTML += `
        <li>
          <div class="home"><img class="home_img" src="${nameToFlag(item.home_name)}"><p class="home_name">${GroßSchreiben(item.home_name)}</p></div>
          <div class="Uhrzeitundbtn"><div class="Uhrzeit">Ausgang</div><h3 style="font-size: 1.6rem">${item.home_score} - ${item.away_score}</h3><small>P ${item.home_penalty} - ${item.away_penalty}</small></div>
          <div class="away"><img class="away_img" src="${nameToFlag(item.away_name)}"><p class="away_name">${GroßSchreiben(item.away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${item.id}"></div>
        </li>`;
      }else{
        spiel_plan.innerHTML += `
        <li>
          <div class="home"><img class="home_img" src="${nameToFlag(item.home_name)}"><p class="home_name">${GroßSchreiben(item.home_name)}</p></div>
          <div class="Uhrzeitundbtn"><div>Bereits getippt</div><button class="tippen_ändern_btn" onclick="tippenPopup2(${x})">Ändern</button></div>
          <div class="away"><img class="away_img" src="${nameToFlag(item.away_name)}"><p class="away_name">${GroßSchreiben(item.away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${item.id}"></div>
        </li>`;
      }
      
     
    }
  });
}



/*Host*/ 
const flags = [
  { name: "deutschland", url: "../img/flaggen/deutschland.png", kuerzel: "DE" },
  { name: "albanien", url: "../img/flaggen/albanien.png", kuerzel: "AL" },
  { name: "belgien", url: "../img/flaggen/belgien.png", kuerzel: "BE"  },
  { name: "danemark", url: "../img/flaggen/danemark.png", kuerzel: "DK" },
  { name: "england", url: "../img/flaggen/england.png", kuerzel: "EN" },
  { name: "frankreich", url: "../img/flaggen/frankreich.png", kuerzel: "FR"  },
  { name: "georgien", url: "../img/flaggen/georgien.png", kuerzel: "GE" },
  { name: "italien", url: "../img/flaggen/italien.png", kuerzel: "IT"  },
  { name: "kroatien", url: "../img/flaggen/kroatien.png", kuerzel: "HR" },
  { name: "niederlande", url: "../img/flaggen/niederlande.png", kuerzel: "NL" },
  { name: "osterreich", url: "../img/flaggen/osterreich.png", kuerzel: "AT" },
  { name: "polen", url: "../img/flaggen/polen.png", kuerzel: "PL"  },
  { name: "portugal", url: "../img/flaggen/portugal.png", kuerzel: "PT" },
  { name: "rumanien", url: "../img/flaggen/rumanien.png", kuerzel: "RO" },
  { name: "schottland", url: "../img/flaggen/schottland.png", kuerzel: "SCO" },
  { name: "schweiz", url: "../img/flaggen/schweiz.png", kuerzel: "CH" },
  { name: "serbien", url: "../img/flaggen/serbien.png",  kuerzel: "SRB" },
  { name: "slowakei", url: "../img/flaggen/slowakei.png", kuerzel: "SK" },
  { name: "slowenien", url: "../img/flaggen/slowenien.png", kuerzel: "SLO" },
  { name: "spanien", url: "../img/flaggen/spanien.png", kuerzel: "ES" },
  { name: "tschechien", url: "../img/flaggen/tschechien.png", kuerzel: "CZ" },
  { name: "turkei", url: "../img/flaggen/turkei.png", kuerzel: "TR"  },
  { name: "ukraine", url: "../img/flaggen/ukraine.png", kuerzel: "UA" },
  { name: "ungarn", url: "../img/flaggen/ungarn.png", kuerzel: "HU" },
  { name: "Fragezeichen", url: "../img/flaggen/Fragezeichen.png", kuerzel: "???" } /*Host*/ 
];
/*Host*/ 
function nameToFlag(name) {
  for (var x = 0; x < flags.length; x++) {
    if (flags[x].name.toLowerCase() === name.toLowerCase()) {
      return flags[x].url;
    }
  }
  return "../img/flaggen/Fragezeichen.png";
}

/*Host*/ 
function nameToKr(name) {
  for (var x = 0; x < flags.length; x++) {
    if (flags[x].name.toLowerCase() === name.toLowerCase()) {
      return flags[x].kuerzel;
    }
  }
  return "???";
}
/*Host*/ 

function GroßSchreiben(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");


toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}

const popup = document.querySelector(".popup");
const box2 = document.querySelector(".box2");
const home_name = document.getElementsByClassName("home_name");
const away_name = document.getElementsByClassName("away_name");
const datum = document.getElementsByClassName("d");
const match_id = document.getElementsByClassName("match_id");
const home_img = document.getElementsByClassName("home_img");
const away_img = document.getElementsByClassName("away_img");

function displayNone() {
  popup.style.left = "110%";
  setTimeout(function () {
    popup.style.display = "none";

  }, 200);

}
/*Host*/ 
function tippenPopup(index) {
  popup.style.display = "block";
  box2.action = "/tipp";/*Host*/ 
  box2.innerHTML = "";
  box2.innerHTML += `

          <input type="hidden" name="home_abbr" value="${nameToKr(home_name[index].innerHTML)}">
          <div class="home">
            <img src="${home_img[index].src}"> 
            <p class="name">${home_name[index].innerHTML}</p> <input class="home_resualt" name="home_score" placeholder="Ergebnis" type="number" required>
          </div>
          <input type="hidden" name="away_abbr" value="${nameToKr(away_name[index].innerHTML)}">
           <div class="Uhrzeitundbtn"><button  class="tippen_btn2" type="submit" >Tippen</button></div>
            <div class="away">
              <img src="${away_img[index].src}" alt=""><p class="name">${away_name[index].innerHTML}</p> <input class="away_resualt" name="away_score" placeholder="Ergebnis" type="number" required>
            </div>
            <input type="hidden" name="match_date" value="${datum[0].innerHTML}">
            <input type="hidden" name="match_id" class="match_id" value="${match_id[index].value}">
           

  
  `;
  setTimeout(function () {
    popup.style.left = "0";
  }, 200);


}
/*Host*/ 
/*Host*/ 
function tippenPopup2(index) {
  popup.style.display = "block";
  box2.action = "/tippaendern";
  box2.innerHTML = "";
  box2.innerHTML += `

          <input type="hidden" name="home_team" value="${home_name[index].innerHTML}">
          <div class="home">
            <img src="${home_img[index].src}"> 
            <p class="name">${home_name[index].innerHTML}</p> <input class="home_resualt" name="home_score" placeholder="Ergebnis" type="number" required>
          </div>
          <input type="hidden" name="away_team" value="${away_name[index].innerHTML}">
           <div class="Uhrzeitundbtn"><button  class="tippen_ändern_btn2" type="submit" >Tipp ändern</button></div>
            <div class="away">
              <img src="${away_img[index].src}" alt=""><p class="name">${away_name[index].innerHTML}</p> <input class="away_resualt" name="away_score" placeholder="Ergebnis" type="number" required>
            </div>
            <input type="hidden" name="match_date" value="${datum[0].innerHTML}">
            <input type="hidden" name="match_id" class="match_id" value="${match_id[index].value}">
           

  
  `;
  setTimeout(function () {
    popup.style.left = "0";
  }, 200);


}
/*Host*/ 
const logoutform = document.querySelector("#logout")

function logout() {
  logoutform.submit();
}


// async function fetchData2() {

//   const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?id=1196544';
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '8a2caacbb6msh6f9da5aa04cf7c8p1a5e38jsnb03f15680a30',
//       'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error);

//   }

// }

// fetchData2()





function isIOS() {
  const userAgent = window.navigator.userAgent;

  // Überprüfen, ob der userAgent String 'iPhone', 'iPad' oder 'iPod' enthält
  
  return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
}

document.addEventListener("DOMContentLoaded", function() {
  if (isIOS()) {
    var d = document.getElementsByClassName("dropdown_menu");
    console.log("Der Benutzer verwendet ein iOS-Gerät.");
    if (d.length > 0) {
      d[0].style.backgroundColor = "rgba(1, 1, 1, 0.7)"; // Korrigierte Zuweisung
      d[0].style.backdropFilter = "blur(15px)";
      d[0].style.webkitBackdropFilter = "blur(15px)";
    }
  } else {
    console.log("Der Benutzer verwendet kein iOS-Gerät.");
  }
});