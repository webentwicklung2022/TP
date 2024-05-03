// var container = document.getElementsByClassName("container");


// async function fetchData() {
//     try {
//       const response = await fetch("http://livescore-api.com/api-client/fixtures/matches.json?date=2024-06-15&key=eESdFyPgAH1H63rX&secret=170vScq0DTsav9lJNeWtMLJmtL3zOvxP&competition_id=387");
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
  
  
//       const data = await response.json();
//       // Hier kannst du mit den geladenen Daten arbeiten
   
//       console.log(data);
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   }
  
//   // Aufruf der Funktion
//   fetchData();

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
const home_img = document.getElementsByClassName("home_img");
const away_img = document.getElementsByClassName("away_img");

function displayNone(){
  popup.style.display = "none";

}

function tippenPopup(index){
  popup.style.display = "block";
  box2.innerHTML = "";
  box2.innerHTML += `

          <input type="hidden" name="home_name" value="${home_name[index].innerHTML}">
          <div class="home">
            <img src="${home_img[index].src}"> 
            <p class="name">${home_name[index].innerHTML}</p> <input class="home_resualt" name="home_resualt" placeholder="Ergebnis" type="number" required>
          </div>
          <input type="hidden" name="away_name" value="${away_name[index].innerHTML}">
           <div class="Uhrzeitundbtn"><button  class="tippen_btn2" type="submit" >Tippen</button></div>
            <div class="away">
              <img src="${away_img[index].src}" alt=""><p class="name">${away_name[index].innerHTML}</p> <input class="away_resualt" name="away_resualt" placeholder="Ergebnis" type="number" required>
            </div>
            <input type="hidden" name="datum" value="${datum[0].innerHTML}">
           

  
  `;



}