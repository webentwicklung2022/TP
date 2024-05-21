var InputFrage = document.getElementsByClassName("InputFrage");
var inputAntwort = document.getElementsByClassName("InputAntwort");
var nameSet= document.getElementById("NameSet");
var themaSet= document.getElementById("ThemaSet");
var FormMemorySeterstellen = document.getElementById("FormMemorySeterstellen");
var setID = document.getElementById("setID");
var park;




async function fetchData() {
    try {
const response = await fetch("/abfrage1/3/null");


if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  

  const data = await response.json();
  park = data[0].ID;
  // Hier kannst du mit den geladenen Daten arbeiten

  console.log(data[0].ID);
} catch (error) {
  console.error('Fetch error:', error);
}
}


fetchData();

setTimeout(function () {

    setID.value = park + 1;

    console.log("setID.Valu: " + setID.value);
    

}, 100);



function checkFull(){

    if( nameSet.value == "" || nameSet.value == null || nameSet.value == " "){
        window.alert("Bitte gib deinem Set ein Namen");
        return false;
    }

    if( themaSet.value == "" || themaSet.value == null || themaSet.value == " "){
        window.alert("Bitte gib deinem Set ein Thema");
        return false;
    }

    for(var i = 0; i < InputFrage.length; i++){

        if(InputFrage[i].value == "" || InputFrage[i].value == null || InputFrage[i].value == " "){
 
            window.alert("Bitte fülle alle Fragen aus")
            return false;
        }

        if(inputAntwort[i].value == "" || inputAntwort[i].value == null || inputAntwort[i].value == " "){

            window.alert("Bitte fülle alle Antworten aus")

            return false;
        }

    }


   formSubmit();


}


 function formSubmit(){

    // window.alert("alles klappt");
    FormMemorySeterstellen.submit();


    
 }