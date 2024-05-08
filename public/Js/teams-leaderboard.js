

async function fetchData() {
    try {
        
      const response = await fetch("/abfrage/2/null");
  
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
<th>Platz</th>
<th>Team</th>
<th>Punkte</th>
</tr>
`

for(var i = 0; i < data.length; i++){
  table.innerHTML += `
  <tr>
  <td>${i + 1}</td>
  <td>${data[i].name}</td>
  <td>${data[i].punkte}</td>
 
  `
}

}


const logoutform = document.querySelector("#logout")

function logout(){
  logoutform.submit();
}