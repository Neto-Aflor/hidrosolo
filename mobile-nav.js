const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu-principal");
const mobile = window.matchMedia("(max-width: 767px)");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menu.hidden = mobile.matches && !open;
}

function updateLayout() {
  const menuHadFocus = menu.contains(document.activeElement);
  const buttonHadFocus = document.activeElement === menuButton;
  menuButton.hidden = !mobile.matches;
  setMenuOpen(false);

  if (mobile.matches && menuHadFocus) menuButton.focus();
  if (!mobile.matches && buttonHadFocus) menu.querySelector("a").focus();
}

mobile.addEventListener("change", updateLayout);
menuButton.addEventListener("click", () => {
  setMenuOpen(menu.hidden);
});

menu.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !mobile.matches) return;

  setMenuOpen(false);
  const section = link.origin === window.location.origin && link.pathname === window.location.pathname
    ? document.getElementById(link.hash.slice(1))
    : null;
  if (section) {
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  }
});

document.addEventListener("click", (event) => {
  if (mobile.matches && !menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobile.matches && !menu.hidden) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

updateLayout();
