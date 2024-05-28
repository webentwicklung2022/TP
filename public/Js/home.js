// var container = document.getElementsByClassName("container");

const hinweis = document.querySelector("#hinweis");


if (hinweis.innerHTML.trim() !== "") {
  setTimeout(() => {
    // Innerhalb der setTimeout-Funktion solltest du keine direkte Rückgabe verwenden
    location.href = "/";
  }, 1000); // 1000 Millisekunden = 1 Sekunden
}





/*Host erste Date[0] ist Test-Date muss immer gewünschte Datum sein, um zu testen */ 
var dates = ['23.05.2024', '14.06.2024', '15.06.2024', '16.06.2024', '17.06.2024', '18.06.2024', '19.06.2024', '20.06.2024', '21.06.2024', '22.06.2024', '23.06.2024', '24.06.2024', '25.06.2024', '26.06.2024']
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
    // Hier kannst du mit den geladenen Daten arbeiten
    datenEinfuegen(data)
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}


fetchData();

const spiel_plan = document.querySelector(".spiel_plan")

function datenEinfuegen(data) {
  spiel_plan.innerHTML = `<div class="datum"><i id="icon" onclick="schalter('links')" class="fa-solid fa-circle-left"></i> <p class="d">${data[0].date}</p> <i id="icon" onclick="schalter('rechts')" class="fa-solid fa-circle-right"></i></div>`;
  for (var x = 0; x < data.length; x++) {

    if (data[x].ausgang == "null") {
      spiel_plan.innerHTML += `
      <li>
            <div class="home"><img class="home_img" src="${nameToFlag(data[x].home_name)}"><p class="home_name">${GroßSchreiben(data[x].home_name)}</p> </div> <div class="Uhrzeitundbtn"><div class="Uhrzeit">${data[x].time.substring(0, 5)} Uhr</div><button  class="tippen_btn"  onclick="tippenPopup(${x})" >Tippen</button></div> <div class="away"><img class="away_img" src="${nameToFlag(data[x].away_name)}" alt=""> <p class="away_name">${GroßSchreiben(data[x].away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${data[x].id}"></div>
          </li>
      `
    } else if(data[x].home_penalty === "null" && data[x].away_penalty === "null") {
      spiel_plan.innerHTML += `
      <li>
            <div class="home"><img class="home_img" src="${nameToFlag(data[x].home_name)}"><p class="home_name">${GroßSchreiben(data[x].home_name)}</p> </div> <div class="Uhrzeitundbtn"><div class="Uhrzeit">Ausgang</div><h3 style="font-size: 1.6rem">${data[x].home_score} - ${data[x].away_score}</h3></div> <div class="away"><img class="away_img" src="${nameToFlag(data[x].away_name)}" alt=""> <p class="away_name">${GroßSchreiben(data[x].away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${data[x].id}"></div>
          </li>
      `

    }else{
      spiel_plan.innerHTML += `
      <li>
            <div class="home"><img class="home_img" src="${nameToFlag(data[x].home_name)}"><p class="home_name">${GroßSchreiben(data[x].home_name)}</p> </div> <div class="Uhrzeitundbtn"><div class="Uhrzeit">Ausgang</div><h3 style="font-size: 1.6rem">${data[x].home_score} - ${data[x].away_score}</h3><small>P ${data[x].home_penalty} - ${data[x].away_penalty}</small></div> <div class="away"><img class="away_img" src="${nameToFlag(data[x].away_name)}" alt=""> <p class="away_name">${GroßSchreiben(data[x].away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${data[x].id}"></div>
          </li>
      `
    }



  }
}


const flags = [
  { name: "deutschland", url: "../img/flaggen/deutschland.png" },
  { name: "albanien", url: "../img/flaggen/albanien.png" },
  { name: "belgien", url: "../img/flaggen/belgien.png" },
  { name: "danemark", url: "../img/flaggen/danemark.png" },
  { name: "england", url: "../img/flaggen/england.png" },
  { name: "frankreich", url: "../img/flaggen/frankreich.png" },
  { name: "georgien", url: "../img/flaggen/georgien.png" },
  { name: "italien", url: "../img/flaggen/italien.png" },
  { name: "kroatien", url: "../img/flaggen/kroatien.png" },
  { name: "niederlande", url: "../img/flaggen/niederlande.png" },
  { name: "osterreich", url: "../img/flaggen/osterreich.png" },
  { name: "polen", url: "../img/flaggen/polen.png" },
  { name: "portugal", url: "../img/flaggen/portugal.png" },
  { name: "rumanien", url: "../img/flaggen/rumanien.png" },
  { name: "schottland", url: "../img/flaggen/schottland.png" },
  { name: "schweiz", url: "../img/flaggen/schweiz.png" },
  { name: "serbien", url: "../img/flaggen/serbien.png" },
  { name: "slowakei", url: "../img/flaggen/slowakei.png" },
  { name: "slowenien", url: "../img/flaggen/slowenien.png" },
  { name: "spanien", url: "../img/flaggen/spanien.png" },
  { name: "tschechien", url: "../img/flaggen/tschechien.png" },
  { name: "turkei", url: "../img/flaggen/turkei.png" },
  { name: "ukraine", url: "../img/flaggen/ukraine.png" },
  { name: "ungarn", url: "../img/flaggen/ungarn.png" },
  { name: "Fragezeichen", url: "../img/flaggen/Fragezeichen.png" } /*Host*/ 
];

function nameToFlag(name) {
  for (var x = 0; x < flags.length; x++) {
    if (flags[x].name.toLowerCase() === name.toLowerCase()) {
      return flags[x].url;
    }
  }
  return "../img/flaggen/Fragezeichen.png";
}

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

function tippenPopup(index) {
  popup.style.display = "block";
  box2.innerHTML = "";
  box2.innerHTML += `

          <input type="hidden" name="home_team" value="${home_name[index].innerHTML}">
          <div class="home">
            <img src="${home_img[index].src}"> 
            <p class="name">${home_name[index].innerHTML}</p> <input class="home_resualt" name="home_score" placeholder="Ergebnis" type="number" required>
          </div>
          <input type="hidden" name="away_team" value="${away_name[index].innerHTML}">
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


// async function fetchData3() {


// const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=4&season=2024';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '8a2caacbb6msh6f9da5aa04cf7c8p1a5e38jsnb03f15680a30',
//     'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

// }

// fetchData3()


function isIOS() {
  const userAgent = window.navigator.userAgent;

  // Überprüfen, ob der userAgent String 'iPhone', 'iPad' oder 'iPod' enthält
  console.log(userAgent);
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