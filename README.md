# Pousada Mariana

Site institucional da **Pousada Mariana**, no centro histórico do Serro, Minas Gerais.

Três páginas estáticas construídas com [Vite](https://vite.dev): a página inicial,
um guia de passeios da região e a página de créditos das imagens.

## Como rodar

```bash
npm install   # só na primeira vez
npm run dev   # http://localhost:5173
```

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor local com recarga automática |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve o `dist/` para conferir antes de publicar |
| `npm run imagens` | Converte `originais/imagens/` em WebP otimizado |

Para publicar, envie o **conteúdo** da pasta `dist/` para a hospedagem.

## Estrutura

```
index.html, passeios.html, creditos.html   páginas (o conteúdo de texto fica aqui)
build/site-data.js                         telefone, WhatsApp, Booking, títulos e descrições
build/html-partials.js                     plugin que expande os includes e as variáveis
src/partials/                              cabeçalho, rodapé e menu compartilhados
src/styles/                                CSS modular (base, components, pages)
src/scripts/modules/                       um módulo por comportamento
src/assets/images/                         imagens otimizadas em WebP
originais/                                 fotos originais e o site anterior
public/                                    .htaccess, _headers e robots.txt
```

### Onde mexer

- **Trocar telefone, WhatsApp ou link do Booking** → `build/site-data.js` (vale para o site inteiro)
- **Editar cabeçalho, rodapé ou menu** → `src/partials/`
- **Mudar cores e fontes** → `src/styles/base/tokens.css`
- **Adicionar uma foto** → coloque em `originais/imagens/`, rode `npm run imagens`
  e use o caminho `/src/assets/images/....webp`

## Decisões técnicas

- **HTML modular sem dependências.** Um plugin próprio de ~50 linhas
  (`build/html-partials.js`) resolve `<!-- include: header.html -->` e `{{variavel}}`
  em tempo de build. O HTML final é estático, sem JavaScript montando a página.
- **Um só CSS e um só JS** compartilhados pelas três páginas, para aproveitar o cache
  entre elas.
- **Fontes auto-hospedadas** (Fraunces e DM Sans), eliminando a chamada ao Google Fonts.
- **Imagens em WebP** com largura máxima de 1200px: 4,9 MB → 2,1 MB.
- **Cache de longo prazo**: os arquivos em `assets/` levam hash no nome, então podem ser
  guardados por um ano (`.htaccess` e `_headers` já configurados).
- **O site funciona sem JavaScript.** As animações de entrada só são aplicadas quando a
  classe `js` está presente no `<html>`; sem ela, o conteúdo aparece normalmente.

## Antes de publicar

- Trocar `og:image` em `src/partials/head.html` por uma URL absoluta.
- Definir o valor da diária: hoje o topo diz "Sob consulta" e a seção de contato
  diz "R$ 220 por pessoa".
- Confirmar horários do café da manhã e contatos dos guias locais.

## Créditos das imagens

Fotos da pousada e do café da manhã: acervo da Pousada Mariana.
Imagens da região: Wikimedia Commons, sob licenças Creative Commons —
detalhes e links das fontes em `creditos.html`.
