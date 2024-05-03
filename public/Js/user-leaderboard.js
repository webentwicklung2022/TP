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
