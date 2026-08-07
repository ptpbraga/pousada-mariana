/**
 * Ampliacao das fotos dos quartos.
 * A imagem grande e lida do proprio <img> do botao, entao continua
 * funcionando depois que o Vite renomeia os arquivos com hash.
 */
export function initLightbox() {
  const dialogo = document.querySelector('[data-lightbox-dialog]');
  const imagemAmpliada = document.querySelector('[data-lightbox-image]');
  const galeria = document.querySelector('[data-gallery]');
  if (!dialogo || !imagemAmpliada || !galeria) return;

  const abrir = (botao) => {
    const original = botao.querySelector('img');
    if (!original) return;

    imagemAmpliada.src = original.currentSrc || original.src;
    imagemAmpliada.alt = original.alt;
    dialogo.showModal();
  };

  galeria.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-lightbox]');
    if (botao) abrir(botao);
  });

  dialogo.addEventListener('click', (evento) => {
    const fechou = evento.target === dialogo || evento.target.closest('[data-lightbox-close]');
    if (fechou) dialogo.close();
  });
}
