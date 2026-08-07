/** Menu-gaveta do celular: abre, fecha ao clicar num link e fecha com Esc. */
export function initMobileMenu() {
  const menu = document.querySelector('[data-menu]');
  const botao = document.querySelector('[data-menu-toggle]');
  if (!menu || !botao) return;

  const definirEstado = (aberto) => {
    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', aberto);
    document.body.classList.toggle('menu-open', aberto);
  };

  const estaAberto = () => botao.getAttribute('aria-expanded') === 'true';

  botao.addEventListener('click', () => definirEstado(!estaAberto()));

  // Delegacao: um listener no menu inteiro em vez de um por link.
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) definirEstado(false);
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAberto()) definirEstado(false);
  });
}
