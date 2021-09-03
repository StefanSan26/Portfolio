const navOpen = document.getElementById("nav-open")
const navMenu = document.getElementById("nav-menu")
const navLink = document.querySelectorAll(".nav__link")

function switchMenu(){
	navMenu.classList.toggle('show')
	navMenu.style.transition = '0.5s'
}

navOpen.addEventListener("click",switchMenu)


navLink.forEach(link => link.addEventListener("click",switchMenu))

