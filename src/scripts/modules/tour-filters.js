const FILTRO_TODOS = 'all';

function aplicarVisibilidade(elementos, chaveDataset, filtro) {
  elementos.forEach((elemento) => {
    elemento.hidden = filtro !== FILTRO_TODOS && elemento.dataset[chaveDataset] !== filtro;
  });
}

function rolarAteSecao(filtro) {
  if (filtro === FILTRO_TODOS) return;

  document
    .querySelector(`[data-location-section="${filtro}"]`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Filtro por localidade na pagina de passeios. */
export function initTourFilters() {
  const botoes = document.querySelectorAll('[data-filter]');
  if (botoes.length === 0) return;

  const cartoes = document.querySelectorAll('[data-category]');
  const secoes = document.querySelectorAll('[data-location-section]');

  const marcarAtivo = (selecionado) => {
    botoes.forEach((botao) => {
      const ativo = botao === selecionado;
      botao.classList.toggle('active', ativo);
      botao.setAttribute('aria-pressed', String(ativo));
    });
  };

  const filtrar = (botao) => {
    const filtro = botao.dataset.filter;

    marcarAtivo(botao);
    aplicarVisibilidade(cartoes, 'category', filtro);
    aplicarVisibilidade(secoes, 'locationSection', filtro);
    rolarAteSecao(filtro);
  };

  botoes.forEach((botao) => botao.addEventListener('click', () => filtrar(botao)));
}
