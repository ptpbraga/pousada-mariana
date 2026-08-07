/**
 * Fonte unica de verdade para dados que aparecem em varias paginas.
 * Mudou o telefone ou o link do Booking? Troque aqui e vale para o site inteiro.
 */

const WHATSAPP_NUMERO = '553835411569';

function whatsapp(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const shared = {
  telefonePrincipal: '(38) 3541-1569',
  telefoneSecundario: '(38) 3541-2627',
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
    titulo: 'Pousada Mariana | Hospedagem no Centro Histórico do Serro',
    descricao:
      'Pousada Mariana, no centro histórico do Serro-MG. Quartos acolhedores, café da manhã mineiro, atendimento 24 horas e reservas por WhatsApp ou Booking.',
    // Na home os links de seção são âncoras puras; nas outras páginas precisam do arquivo.
    inicioHref: '',
  },
  'passeios.html': {
    pagina: 'passeios',
    titulo: 'Passeios no Serro e Região | Pousada Mariana',
    descricao:
      'Guia de passeios da Pousada Mariana: pontos históricos, cachoeiras, bares e restaurantes no Serro, Milho Verde, São Gonçalo do Rio das Pedras e Santo Antônio do Itambé.',
    inicioHref: 'index.html',
  },
  'creditos.html': {
    pagina: 'creditos',
    titulo: 'Créditos das imagens | Pousada Mariana',
    descricao: 'Créditos e licenças das imagens usadas no site da Pousada Mariana.',
    inicioHref: 'index.html',
  },
};
