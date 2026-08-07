/** Preenche o ano no rodape, para nunca ficar desatualizado. */
export function initCurrentYear() {
  const alvos = document.querySelectorAll('[data-year]');
  if (alvos.length === 0) return;

  const ano = String(new Date().getFullYear());
  alvos.forEach((alvo) => {
    alvo.textContent = ano;
  });
}
