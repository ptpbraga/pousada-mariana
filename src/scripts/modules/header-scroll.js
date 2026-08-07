const CLASSE_ROLAGEM = 'scrolled';
const LIMITE_PX = 12;

/** Sombra no cabecalho assim que a pagina sai do topo. */
export function initHeaderScroll() {
  const cabecalho = document.querySelector('[data-header]');
  if (!cabecalho) return;

  const atualizar = () => {
    cabecalho.classList.toggle(CLASSE_ROLAGEM, window.scrollY > LIMITE_PX);
  };

  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
}
