const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");


const hinweis = document.querySelector("#hinweis");

if(hinweis.innerHTML.trim() !== ""){
    setTimeout(() => {
      // Innerhalb der setTimeout-Funktion solltest du keine direkte Rückgabe verwenden
    location.href = "/contact";
  }, 1000); // 1000 Millisekunden = 1 Sekunden
  }

toggleBtn.onclick = function (){
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtnIcon.classList = isOpen 
  ? 'fa-solid fa-xmark'
  : 'fa-solid fa-bars'
}

const logoutform = document.querySelector("#logout")

function logout(){
  logoutform.submit();
}