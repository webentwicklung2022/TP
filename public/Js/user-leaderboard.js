// var container = document.getElementsByClassName("container");


async function fetchData() {
    try {

      var url = "http://localhost:5050" 
       
      if(navigator.platform == "Win32"){
          url = "http://localhost:5050";
      }else{
          url = "http://192.168.178.58:5050"; 
      }
      const response = await fetch(url + "/abfrage/1/null");
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
  
  
      const data = await response.json();
      // Hier kannst du mit den geladenen Daten arbeiten
   
      
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
<th>User</th>
<th>Punkte</th>
</tr>
`

for(var i = 0; i < data.length; i++){
  table.innerHTML += `
  <tr>
  <td>${i + 1}</td>
  <td>${data[i].nickname}</td>
  <td>${data[i].punkte}</td>
 
  `
}

}




