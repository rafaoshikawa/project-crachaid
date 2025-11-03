// ===== Scroll suave para um hash, compensando o header fixo =====
function scrollToHash(hash) {
  const id = hash.slice(1); // remove o #
  const el = document.getElementById(id);
  const header = document.querySelector(".header");

  if (el) {
    setTimeout(() => {
      const headerHeight = header ? header.offsetHeight : 0;
      const elementTop = el.getBoundingClientRect().top + window.scrollY;
      const scrollTarget = elementTop - headerHeight - 20; // 20px de folga

      window.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });
    }, 100); // espera o DOM carregar completamente
  }
}

// ===== Scroll suave até o topo =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== Função principal para carregar páginas dinamicamente (SPA) =====
async function loadPage() {
  const contentContainer = document.getElementById("content");
  if (!contentContainer) return;

  let currentPath = window.location.pathname.replace(/^\/|\/$/g, "");

  // Trata index.html como home
  if (!currentPath || currentPath === "index.html") {
    currentPath = "home";
  }

  const pageMap = {
    home: "rotas/home.html",
    cracha: "rotas/cracha.html",
    credencial: "rotas/credencial.html",
    pulseiras: "rotas/pulseiras.html",
    cordoes: "rotas/cordoes.html",
    brindes: "rotas/brindes.html",
    orcamento: "rotas/orcamento.html",
  };

  const pageFile = pageMap[currentPath];
  if (!pageFile) {
    contentContainer.innerHTML = "<h2>Página não encontrada</h2>";
    return;
  }

  try {
    const pathPrefix = window.location.pathname.includes("/rotas/")
      ? "../"
      : "./";

    const response = await fetch(`${pathPrefix}${pageFile}`);
    if (!response.ok) throw new Error("Não foi possível carregar a página");

    const htmlContent = await response.text();
    contentContainer.innerHTML = htmlContent;

    // Inicializa scripts específicos da página carregada, se existirem
    if (typeof initPage === "function") initPage();

    // Scroll inteligente após carregar o conteúdo
    setTimeout(() => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      } else {
        scrollToTop();
      }
    }, 200);
  } catch (error) {
    console.error("Erro ao carregar a página:", error);
    contentContainer.innerHTML = "<h2>Erro ao carregar a página</h2>";
  }
}

// ===== Captura clicks em links internos (SPA + hash + logo) =====
document.addEventListener("click", (event) => {
  const linkElement = event.target.closest("a");
  if (!linkElement) return;

  const href = linkElement.getAttribute("href");

  // Caso seja a logo → vai pra home e sobe pro topo
  if (linkElement.classList.contains("logo") || linkElement.id === "logo") {
    event.preventDefault();
    history.pushState(null, "", "/");
    loadPage();
    scrollToTop();
    return;
  }

  // Só processa links internos (ex: /cracha)
  if (!href.startsWith("/")) return;

  event.preventDefault();
  history.pushState(null, "", href);
  loadPage();
});

// ===== Botões voltar/avançar do navegador =====
window.addEventListener("popstate", loadPage);

// ===== Carrega a primeira página =====
window.addEventListener("DOMContentLoaded", loadPage);
