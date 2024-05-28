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

const hinweis = document.querySelector("#hinweis");


if (hinweis.innerHTML.trim() !== "") {
  setTimeout(() => {
    // Innerhalb der setTimeout-Funktion solltest du keine direkte Rückgabe verwenden
    location.href = "/login";
  }, 1000); // 1000 Millisekunden = 1 Sekunden
}