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
      e.preventDefault(); // previne seguir link

      // Se já está ativo, fecha; senão abre e fecha os outros
      if (drop.classList.contains("active")) {
        drop.classList.remove("active");
      } else {
        dropdowns.forEach((d) => d.classList.remove("active"));
        drop.classList.add("active");
      }
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

// Ajusta sanfona ao redimensionar tela
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    // garante que tudo fique fechado no desktop
    navbar.classList.remove("active");
    navbg.classList.remove("active");
    menuIcon.classList.remove("bx-x");
    dropdowns.forEach((d) => d.classList.remove("active"));
  }
});
