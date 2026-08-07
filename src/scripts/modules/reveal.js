const CLASSE_VISIVEL = 'is-visible';
const OPCOES_OBSERVADOR = { threshold: 0.08, rootMargin: '0px 0px -50px' };

function preferereduzirMovimento() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function mostrarTodos(elementos) {
  elementos.forEach((elemento) => elemento.classList.add(CLASSE_VISIVEL));
}

function observarEntrada(elementos) {
  const observador = new IntersectionObserver((entradas) => {
    entradas
      .filter((entrada) => entrada.isIntersecting)
      .forEach((entrada) => {
        entrada.target.classList.add(CLASSE_VISIVEL);
        observador.unobserve(entrada.target);
      });
  }, OPCOES_OBSERVADOR);

  elementos.forEach((elemento) => observador.observe(elemento));
}

/** Elementos .reveal aparecem suavemente ao entrar na tela. */
export function initReveal() {
  const elementos = document.querySelectorAll('.reveal');
  if (elementos.length === 0) return;

  if (preferereduzirMovimento()) {
    mostrarTodos(elementos);
    return;
  }

  observarEntrada(elementos);
}
