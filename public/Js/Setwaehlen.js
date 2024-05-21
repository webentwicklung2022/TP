/*document.getElementById("");*/
/*document.getElementsByClassName*/

var db1= [];
var db2= [];
var SetIDs;
var setsContainer = document.getElementById("SetsContainer");



async function fetchData() {
    try {
const response = await fetch("/abfrage1/5/null");


if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  

  const data2 = await response.json();
  // Hier kannst du mit den geladenen Daten arbeiten
  db2 = data2;
  console.log("data2: " + data2[0].SetID);
  
} catch (error) {
  console.error('Fetch error:', error);
}
}


fetchData();

setTimeout(function () {

    SetIDs = "";
    SetIDs += "in("
   
   for(var x = 0; x < db2.length; x++){

    SetIDs += db2[x].SetID;
    if(x < db2.length -1){
        SetIDs += ", ";
    }
    

    // "in(1, 2, 3, 4, 5)"
   }

    // console.log("db2: " + db2[0].SetID);
    SetIDs += ")"

    console.log(SetIDs);
    
    

}, 100);



async function fetchData2() {
    try {
const response = await fetch(`/abfrage1/6/${SetIDs}`);


if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  

  const data = await response.json();
  // Hier kannst du mit den geladenen Daten arbeiten
  db1 = data;

  console.log("fetchData2 data.length: " + data.length);
  console.log("fetchData2 db1: " + db1);
  
} catch (error) {
  console.error('Fetch error:', error);
}
}


setTimeout(function () {
fetchData2();
}, 300);

setTimeout(function () {
   
   
    console.log("db1.lenth: " + db1.length);
    console.log("db1[1]: " + db1[1]);

    for(var i = 0; i < db1.length; i++){

        FensterHinzufuegen(db1[i].Name_Set,db1[i].ID);  
        
    }
    console.log("db1: " + db1);

}, 400);










function FensterHinzufuegen(Ueberschrift,ID) {
    setsContainer.innerHTML += `
        <div class="Set">
            <div class="SetUeberschrift" onclick="SendID(${ID})">
                <p>${Ueberschrift}</p>
            </div>
            <form action="/setausgewaehlt" method="post" class ="forms">
            <input type="hidden" id="ID" name="id" value="${ID}">
            </form>
        </div>
    `;

}





function SendID(ID){

   var forms = document.getElementsByClassName("forms");
   

       forms[ID-1].submit();
    
   
//   form_ID.submit()
   

   
}




/* Funktion die die seite Memory öffnet und alle nötigen infos übergibt
function MemoryOEffnen("Json mit memory Infos"){

}*/

function goBack() {
    window.history.back();
  }



  setTimeout(function () {
   
   var cover = document.getElementsByClassName("cover");
    cover[0].style.opacity = "0";

    setTimeout(function () {
        cover[0].style.display = "none";
    }, 600);
}, 600);

