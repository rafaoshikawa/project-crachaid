// script.js

async function loadHeaderFooter() {
  try {
    // Define prefixo para caminhos relativos
    const pathPrefix = window.location.pathname.includes("/rotas/") ? "../" : "./";

    // Busca os arquivos header e footer
    const [headerResponse, footerResponse] = await Promise.all([
      fetch(`${pathPrefix}header.html`),
      fetch(`${pathPrefix}footer.html`),
    ]);

    if (!headerResponse.ok || !footerResponse.ok) {
      throw new Error("Não foi possível carregar header ou footer");
    }

    const headerHTML = await headerResponse.text();
    const footerHTML = await footerResponse.text();

    // Insere no DOM
    document.getElementById("header").innerHTML = headerHTML;
    document.getElementById("footer").innerHTML = footerHTML;

    // Inicializa scripts do header e footer
    initMenu();
    initFooter();
  } catch (err) {
    console.error("Erro ao carregar header/footer:", err);
  }
}

function initMenu() {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navbg = document.querySelector(".nav-bg");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!menuIcon) return;

  // Toggle burger menu
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
    navbg.classList.toggle("active");
  });

  // Dropdowns mobile
  dropdowns.forEach((drop) => {
    const link = drop.querySelector("a");
    if (!link) return;
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdowns.forEach((d) => d.classList.remove("active"));
        drop.classList.toggle("active");
      }
    });
  });

  // Fecha menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !e.target.closest(".header")) {
      navbar.classList.remove("active");
      navbg.classList.remove("active");
      menuIcon.classList.remove("bx-x");
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
  });

  // Reset menu ao redimensionar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove("active");
      navbg.classList.remove("active");
      menuIcon.classList.remove("bx-x");
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
  });
}

function initFooter() {
  const whatsappLinks = document.querySelectorAll(".footer-1 .btn-2");
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Clicou no WhatsApp do footer!");
    });
  });
}

// Executa o carregamento ao abrir a página
document.addEventListener("DOMContentLoaded", loadHeaderFooter);
