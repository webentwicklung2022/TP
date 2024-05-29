// var container = document.getElementsByClassName("container");
/*Host*/

var cats = ['Gesamt', 'Woche','Gestern', 'Heute']
var index = 0;
var cat = cats[index];

function schalter(richtung){

  if(richtung == "rechts"){
    if(index < cats.length - 1){ /*Host dates.length - 1*/
      index++;
      cat = cats[index]
    }else{
      return
    }
   

  }else{
    if(index > 0){
      index--;
      cat = cats[index]
    }else{
      return
    }
   
  }


  fetchData()
}

/*Host*/


async function fetchData() {
    try {
       
      const response = await fetch("/abfrage/1/" + cat); 
  
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
const listing = document.querySelector(".listing");
function datenEinfuegen(data){
table.innerHTML = "";

listing.innerHTML =`<i id="icon" onclick="schalter('links')" class="fa-solid fa-circle-left"></i> <p class="d">${cat}</p> <i id="icon" onclick="schalter('rechts')" class="fa-solid fa-circle-right"></i>`;

table.innerHTML += `
  <tr>
<th>Platz</th>
<th>Nickname</th>
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
if(data.length < 1){
  table.innerHTML = "<h3>Noch keine Einträge</h3>";
}

}



const logoutform = document.querySelector("#logout")
function logout(){
  logoutform.submit();
}