


async function fetchData() {
    try {
       
      const response = await fetch("/abfrage/3/null");
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
  
  
      const data = await response.json();
      // Hier kannst du mit den geladenen Daten arbeiten
   
      console.log(data)
      datenEinfuegen(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  // Aufruf der Funktion
  fetchData();

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");


toggleBtn.onclick = function (){
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtnIcon.classList = isOpen 
  ? 'fa-solid fa-xmark'
  : 'fa-solid fa-bars'
}

const table = document.querySelector("#table")

function datenEinfuegen(data){
table.innerHTML = "";

  table.innerHTML += `
  <tr>
  <th>Heim</th>
  <th>Score</th>
  <th>Gast</th>
  <th>Status</th>
  </tr>
`

for(var i = 0; i < data.length; i++){
  table.innerHTML += `
  <tr>
  <td><img class="home_img" src="${nameToFlag(data[i].home_team)}"></td>
  <td class="spielstand">${data[i].home_score + ":" + data[i].away_score}</th>
  <td><img class="away_img" src="${nameToFlag(data[i].away_team)}" alt=""></td>
  <td class="status"><p>${data[i].status}</p></td>
  </tr>
  `
}

if(data.length < 1){
  table.innerHTML = "<h3>Noch keine Einträge</h3>";
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


console.log(nameToFlag("frankreich"))


const logoutform = document.querySelector("#logout")

function logout(){
  logoutform.submit();
}