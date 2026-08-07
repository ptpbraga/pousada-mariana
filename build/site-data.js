/**
 * Fonte unica de verdade para dados que aparecem em varias paginas.
 * Mudou o telefone ou o link do Booking? Troque aqui e vale para o site inteiro.
 */

const WHATSAPP_NUMERO = '553835411569';

function whatsapp(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const shared = {
  siteUrl: 'https://pousadamariana.com.br',
  ogImage: 'https://pousadamariana.com.br/assets/webp/cabecalho01.wJ-o35nG.webp',
  telefonePrincipal: '(38) 3541-1569',
  telefoneSecundario: '',
  telefoneLink: '+553835411569',
  telefoneSecundarioLink: '+553835412627',

  urlBooking: 'https://www.booking.com/hotel/br/pousada-mariana-serro.pt-br.html',
  urlInstagram: 'https://www.instagram.com/pousadamarianaserro/',
  urlMapa:
    'https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+Floriano+Peixoto%2C+44%2C+Serro%2C+MG',

  urlWhatsappReserva: whatsapp(
    'Olá! Gostaria de consultar a disponibilidade na Pousada Mariana, em Serro.',
  ),
  urlWhatsappCafe: whatsapp(
    'Olá! Gostaria de saber mais sobre a hospedagem e o café da manhã da Pousada Mariana.',
  ),
  urlWhatsappPasseios: whatsapp(
    'Olá! Gostaria de consultar a disponibilidade na Pousada Mariana e planejar passeios na região.',
  ),
};

export const pages = {
  'index.html': {
    pagina: 'inicio',
    titulo: 'Pousada no Serro MG | Centro Histórico & Café Mineiro',
    descricao:
      'Hospede-se na Pousada Mariana no centro histórico do Serro, MG. Quartos confortáveis com ar-condicionado, café da manhã mineiro artesanal e recepção 24h. Reserve direto!',
    urlCanonical: 'https://pousadamariana.com.br/',
    ogImage: 'https://pousadamariana.com.br/assets/webp/cabecalho01.wJ-o35nG.webp',
    // Na home os links de seção são âncoras puras; nas outras páginas precisam do arquivo.
    inicioHref: '',
  },
  'passeios.html': {
    pagina: 'passeios',
    titulo: 'Guia de Passeios no Serro MG e Região | Pousada Mariana',
    descricao:
      'Guia completo de passeios no Serro MG: pontos históricos, cachoeiras em Milho Verde, São Gonçalo do Rio das Pedras e Pico do Itambé. Planeje sua viagem!',
    urlCanonical: 'https://pousadamariana.com.br/passeios.html',
    ogImage: 'https://pousadamariana.com.br/assets/webp/cabecalho01.wJ-o35nG.webp',
    inicioHref: 'index.html',
  },
  'creditos.html': {
    pagina: 'creditos',
    titulo: 'Créditos das Imagens | Pousada Mariana Serro MG',
    descricao: 'Créditos e licenças das imagens e fotografias usadas no site da Pousada Mariana em Serro, MG.',
    urlCanonical: 'https://pousadamariana.com.br/creditos.html',
    ogImage: 'https://pousadamariana.com.br/assets/webp/cabecalho01.wJ-o35nG.webp',
    inicioHref: 'index.html',
  },
};
