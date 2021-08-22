const navOpen = document.getElementById("nav-open")
const navMenu = document.getElementById("nav-menu")
const navLink = document.querySelectorAll(".nav__link")
console.log(navLink)

function switchMenu(){
	navMenu.classList.toggle('show')
}

navOpen.addEventListener("click",switchMenu);
navLink.forEach(link => link.addEventListener("click",switchMenu))