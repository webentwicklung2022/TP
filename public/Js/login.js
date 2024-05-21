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