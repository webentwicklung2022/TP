


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
var dates = ['14.06.2024', '15.06.2024', '16.06.2024', '17.06.2024', '18.06.2024', '19.06.2024', '20.06.2024', '21.06.2024', '22.06.2024', '23.06.2024', '24.06.2024', '25.06.2024', '26.06.2024']
var index = 0;
function navToMatch(d){
 index = dates.indexOf(d);
sessionStorage.setItem("index", index.toString());
location.href = "/"; 
}




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
/*Host*/ 
for(var i = 0; i < data.length; i++){
  table.innerHTML += `
  <tr onclick="navToMatch('${data[i].match_date}')">
  <td><li><img class="home_img" src="${abbrToFlag(data[i].home_abbr)}"><small>${data[i].home_abbr}</small></li></td>
  <td class="spielstand">${data[i].home_score + ":" + data[i].away_score}</th>
  <td><li><img class="away_img" src="${abbrToFlag(data[i].away_abbr)}" alt=""><small>${data[i].away_abbr}</small></li></td>
  <td class="status"><p>${data[i].status}</p></td>
  </tr>
  `
}
/*Host*/ 
if(data.length < 1){
  table.innerHTML = "<h3>Noch keine Einträge</h3>";
}
}
/*Host*/ 
const flags = [
  { name: "deutschland", url: "../img/flaggen/deutschland.png", abbr: "DE" },
  { name: "albanien", url: "../img/flaggen/albanien.png", abbr: "AL" },
  { name: "belgien", url: "../img/flaggen/belgien.png", abbr: "BE"  },
  { name: "danemark", url: "../img/flaggen/danemark.png", abbr: "DK" },
  { name: "england", url: "../img/flaggen/england.png", abbr: "EN" },
  { name: "frankreich", url: "../img/flaggen/frankreich.png", abbr: "FR"  },
  { name: "georgien", url: "../img/flaggen/georgien.png", abbr: "GE" },
  { name: "italien", url: "../img/flaggen/italien.png", abbr: "IT"  },
  { name: "kroatien", url: "../img/flaggen/kroatien.png", abbr: "HR" },
  { name: "niederlande", url: "../img/flaggen/niederlande.png", abbr: "NL" },
  { name: "osterreich", url: "../img/flaggen/osterreich.png", abbr: "AT" },
  { name: "polen", url: "../img/flaggen/polen.png", abbr: "PL"  },
  { name: "portugal", url: "../img/flaggen/portugal.png", abbr: "PT" },
  { name: "rumanien", url: "../img/flaggen/rumanien.png", abbr: "RO" },
  { name: "schottland", url: "../img/flaggen/schottland.png", abbr: "SCO" },
  { name: "schweiz", url: "../img/flaggen/schweiz.png", abbr: "CH" },
  { name: "serbien", url: "../img/flaggen/serbien.png",  abbr: "SRB" },
  { name: "slowakei", url: "../img/flaggen/slowakei.png", abbr: "SK" },
  { name: "slowenien", url: "../img/flaggen/slowenien.png", abbr: "SLO" },
  { name: "spanien", url: "../img/flaggen/spanien.png", abbr: "ES" },
  { name: "tschechien", url: "../img/flaggen/tschechien.png", abbr: "CZ" },
  { name: "turkei", url: "../img/flaggen/turkei.png", abbr: "TR"  },
  { name: "ukraine", url: "../img/flaggen/ukraine.png", abbr: "UA" },
  { name: "ungarn", url: "../img/flaggen/ungarn.png", abbr: "HU" },
  { name: "Fragezeichen", url: "../img/flaggen/Fragezeichen.png", abbr: "???" } /*Host*/ 
];


function abbrToFlag(abbr) {
  for (var x = 0; x < flags.length; x++) {
      if (flags[x].abbr.toLowerCase() === abbr.toLowerCase()) {
          return flags[x].url;
      }
  }
  return "../img/flaggen/Fragezeichen.png";
}
/*Host*/ 




const logoutform = document.querySelector("#logout")

function logout(){
  logoutform.submit();
}