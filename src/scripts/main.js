import '../styles/main.css';

import { initHeaderScroll } from './modules/header-scroll.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initReveal } from './modules/reveal.js';
import { initTourFilters } from './modules/tour-filters.js';
import { initCurrentYear } from './modules/current-year.js';

/**
 * Ponto de entrada unico das tres paginas.
 * Cada modulo verifica sozinho se os elementos dele existem e sai
 * na hora se nao existirem, entao nao ha nenhum "if pagina X" aqui.
 */
const modulos = [
  initHeaderScroll,
  initMobileMenu,
  initReveal,
  initTourFilters,
  initCurrentYear,
];

modulos.forEach((iniciar) => iniciar());
