(() => {
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menu && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-year]').forEach(item => {
    item.textContent = new Date().getFullYear();
  });

  const dialog = document.querySelector('[data-lightbox-dialog]');
  const dialogImage = document.querySelector('[data-lightbox-image]');
  const dialogClose = document.querySelector('[data-lightbox-close]');

  if (dialog && dialogImage) {
    document.querySelectorAll('[data-lightbox]').forEach(button => {
      button.addEventListener('click', () => {
        dialogImage.src = button.dataset.lightbox;
        const sourceImage = button.querySelector('img');
        dialogImage.alt = sourceImage?.alt || 'Foto ampliada da acomodação';
        dialog.showModal();
      });
    });

    dialogClose?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const placeCards = document.querySelectorAll('[data-category]');
  const placeSections = document.querySelectorAll('[data-location-section]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      placeCards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });

      placeSections.forEach(section => {
        section.hidden = filter !== 'all' && section.dataset.locationSection !== filter;
      });

      if (filter !== 'all') {
        document.querySelector(`[data-location-section="${filter}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
