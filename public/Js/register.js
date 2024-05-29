var toggle = true;
function showandunshowPassword() {
    const icon = document.querySelector("#ip");
   

const input = document.querySelector("#password");
   

if (toggle) {
    icon.classList = "fa-regular fa-eye-slash"
    input.type = 'text';
    toggle = false;
}else{
    icon.classList = "fa-regular fa-eye"
    input.type = 'password';
    toggle = true;
    
}


}


const Teams = [
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
   
  ];
  


const select_box__current = document.querySelector(".select-box__current");
const select_box__list = document.querySelector(".select-box__list");





function datenEinfuegen(){
    select_box__current.innerHTML = "";
     
    for (x = 0; x < Teams.length; x++){
        select_box__current.innerHTML += `<div class="select-box__value">
        <input class="select-box__input" type="radio" id="${x + 1}" value="${Teams[x].name}" name="championship"
            checked="checked" />
        <p class="select-box__input-text"><img style="height:30px; margin-right:5px" src="${Teams[x].url}" > ${Teams[x].name}</p>
        </div>`;
    }
   
    
    select_box__current.innerHTML += `<div class="select-box__value">
    <input class="select-box__input" type="radio" id="0" value="Team auswählen" name="championship"
        checked="checked" />
    <p class="select-box__input-text">Team auswählen</p>
    </div><img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
    alt="Arrow Icon" aria-hidden="true" />`;

    select_box__list.innerHTML = "";


    for (x = 0; x < Teams.length; x++){
        select_box__list.innerHTML += `<li>
        <label class="select-box__option" for="${x + 1}" aria-hidden="aria-hidden"><img style="height:30px; margin-right:5px" src="${Teams[x].url}" > ${Teams[x].name}</label>
        </li>`;
    }
   

    
}


datenEinfuegen()
