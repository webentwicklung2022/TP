// var container = document.getElementsByClassName("container");

const hinweis = document.querySelector("#hinweis");


if(hinweis.innerHTML.trim() !== ""){
  setTimeout(() => {
    // Innerhalb der setTimeout-Funktion solltest du keine direkte Rückgabe verwenden
  location.href = "/";
}, 1000); // 1000 Millisekunden = 1 Sekunden
}

var dates = ['14.06.2024', '15.06.2024', '16.06.2024', '17.06.2024', '18.06.2024', '19.06.2024', '20.06.2024', '21.06.2024', '22.06.2024', '23.06.2024', '24.06.2024', '25.06.2024', '26.06.2024']
var index = 0;
var date = dates[index];

function schalter(richtung){

  if(richtung == "rechts"){
    if(index < 12){
      index++;
      date = dates[index]
    }else{
      return
    }
   

  }else{
    if(index > 0){
      index--;
      date = dates[index]
    }else{
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

  function datenEinfuegen(data){
    spiel_plan.innerHTML =`<div class="datum"><i id="icon" onclick="schalter('links')" class="fa-solid fa-circle-left"></i> <p class="d">${data[0].date}</p> <i id="icon" onclick="schalter('rechts')" class="fa-solid fa-circle-right"></i></div>`;
   for(var x = 0; x < data.length; x++){
    spiel_plan.innerHTML += `
    <li>
          <div class="home"><img class="home_img" src="${nameToFlag(data[x].home_name)}"><p class="home_name">${GroßSchreiben(data[x].home_name)}</p> </div> <div class="Uhrzeitundbtn"><div class="Uhrzeit">${data[x].time.substring(0, 5)} Uhr</div><button  class="tippen_btn"  onclick="tippenPopup(${x})" >Tippen</button></div> <div class="away"><img class="away_img" src="${nameToFlag(data[x].away_name)}" alt=""> <p class="away_name">${GroßSchreiben(data[x].away_name)}</p><input type="hidden" name="match_id" class="match_id" value="${data[x].id}"></div>
        </li>
    `


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
    { name: "ungarn", url: "../img/flaggen/ungarn.png" }
  ];
  
  function nameToFlag(name) {
    for (var x = 0; x < flags.length; x++) {
        if (flags[x].name.toLowerCase() === name.toLowerCase()) {
            return flags[x].url;
        }
    }
    return "Nicht gefunden";
  }

  function GroßSchreiben(name){
   return  name.charAt(0).toUpperCase() + name.slice(1);
  }

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

const popup = document.querySelector(".popup");
const box2 =  document.querySelector(".box2");
const home_name = document.getElementsByClassName("home_name");
const away_name = document.getElementsByClassName("away_name");
const datum = document.getElementsByClassName("d");
const match_id = document.getElementsByClassName("match_id");
const home_img = document.getElementsByClassName("home_img");
const away_img = document.getElementsByClassName("away_img");

function displayNone(){
  popup.style.left = "110%";
  setTimeout(function() {
    popup.style.display = "none";
   
  }, 200);

}

function tippenPopup(index){
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
  setTimeout(function() {
    popup.style.left = "0";
  }, 200);


}

const logoutform = document.querySelector("#logout")

function logout(){
  logoutform.submit();
}