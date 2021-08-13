const navOpen = document.getElementById("nav-open")
const navMenu = document.getElementById("nav-menu")

function openMenu(){
	navMenu.classList.toggle('show')
}

navOpen.addEventListener("click",openMenu)