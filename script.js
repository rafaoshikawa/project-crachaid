const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const navbg = document.querySelector(".nav-bg");
const dropdowns = document.querySelectorAll(".dropdown");

// Abrir/fechar menu burger
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
  navbg.classList.toggle("active");
});

// Mobile: abrir/fechar dropdowns (sanfona)
dropdowns.forEach((drop) => {
  const link = drop.querySelector("a");
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // previne abrir link
      // fecha os outros
      dropdowns.forEach((d) => {
        if (d !== drop) d.classList.remove("active");
      });
      // abre/fecha atual
      drop.classList.toggle("active");
    }
  });
});

// Fechar menu e dropdowns ao clicar fora
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!e.target.closest(".header")) {
      navbar.classList.remove("active");
      navbg.classList.remove("active");
      menuIcon.classList.remove("bx-x");
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
  }
});
