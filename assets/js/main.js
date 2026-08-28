/* ============================================================
   INSTITUTO DIGEPP — COMPORTAMENTO DO SITE
   Lê o conteúdo de assets/js/dados.js e monta as seções.
   Em geral você não precisa mexer neste arquivo.
   ============================================================ */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (txt) => String(txt).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* ---------- Ano no rodapé ---------- */
  $('#ano').textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const toggle = $('#navToggle');
  const menu = $('#navMenu');

  toggle.addEventListener('click', () => {
    const aberto = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!aberto));
    menu.classList.toggle('is-open', !aberto);
  });

  const fecharMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) fecharMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharMenu(); });

  /* ---------- Sombra do cabeçalho ao rolar ---------- */
  const header = $('.site-header');
  const aoRolar = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- Links de WhatsApp ---------- */
  const linkWhats = (msg) =>
    `https://api.whatsapp.com/send?phone=${CONTATO.whatsapp}&text=${encodeURIComponent(msg)}`;

  $$('[data-whatsapp]').forEach((el) => {
    el.setAttribute('href', linkWhats(el.dataset.whatsapp));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  $$('[data-campo="endereco"]').forEach((el) => { el.textContent = CONTATO.endereco; });

  /* ---------- Renderização dos projetos ---------- */
  const listaProjetos = $('#listaProjetos');
  const filtros = $('.filtros');
  let eixoAtivo = 'Todos';

  function cardProjeto(p) {
    const cor = EIXO_COR[p.eixo] || 'red';
    const classes = ['card', 'projeto', `eixo-${cor}`];
    if (p.rascunho) classes.push('rascunho');
    if (p.destaque) classes.push('destaque');

    return `
      <article class="${classes.join(' ')}" data-eixo="${esc(p.eixo)}">
        <div class="projeto-topo">
          <span class="badge ${p.rascunho ? 'badge-soft' : ''}">${esc(p.rascunho ? 'A preencher' : p.status)}</span>
        </div>
        <h3>${esc(p.titulo)}</h3>
        <p>${esc(p.resumo)}</p>
        <p class="projeto-meta">
          <strong>Público:</strong> ${esc(p.publico)}<br />
          <strong>Eixo:</strong> ${esc(p.eixo)}
        </p>
      </article>`;
  }

  function renderProjetos() {
    const visiveis = PROJETOS.filter((p) => eixoAtivo === 'Todos' || p.eixo === eixoAtivo);
    const temRascunho = visiveis.some((p) => p.rascunho);

    listaProjetos.innerHTML =
      (temRascunho
        ? `<p class="aviso-rascunho">
             <strong>Nota para o administrador do site:</strong> os cards tracejados ainda
             não têm conteúdo. Edite <code>assets/js/dados.js</code>, escreva o texto de cada
             projeto e apague a linha <code>rascunho: true</code> para publicá-lo.
           </p>`
        : '') +
      (visiveis.length
        ? visiveis.map(cardProjeto).join('')
        : '<p class="lead">Nenhum projeto neste eixo por enquanto.</p>');
  }

  function renderFiltros() {
    filtros.innerHTML = EIXOS.map((eixo) => `
      <button type="button" class="filtro" aria-pressed="${eixo === eixoAtivo}">${esc(eixo)}</button>
    `).join('');

    $$('.filtro', filtros).forEach((btn) => {
      btn.addEventListener('click', () => {
        eixoAtivo = btn.textContent.trim();
        $$('.filtro', filtros).forEach((b) =>
          b.setAttribute('aria-pressed', String(b === btn)));
        renderProjetos();
        observarNovos();
      });
    });
  }

  /* ---------- Galeria (fotos e vídeos dos projetos) ----------
     Reúne, de cada projeto, os vídeos (campo `video` ou `videos`) e as fotos
     (campo `fotos`) em cartões separados, todos identificados pelo nome do
     projeto e pelo eixo. */
  function renderGaleria() {
    const lista = $('#listaGaleria');
    if (!lista) return;

    const itens = [];

    PROJETOS.forEach((p) => {
      const videos = p.videos && p.videos.length
        ? p.videos.map((v) => (typeof v === 'string' ? { src: v } : v))
        : (p.video ? [{ src: p.video, poster: p.videoCapa }] : []);

      videos.forEach((v) => {
        itens.push({
          titulo: p.titulo,
          eixo: p.eixo,
          legenda: v.legenda,
          tipo: 'video',
          src: v.src,
          poster: v.poster,
        });
      });

      if (p.fotos && p.fotos.length) {
        itens.push({ titulo: p.titulo, eixo: p.eixo, tipo: 'fotos', fotos: p.fotos });
      }
    });

    if (!itens.length) {
      lista.innerHTML = '<p class="lead">Nenhuma foto ou vídeo publicado por enquanto.</p>';
      return;
    }

    lista.innerHTML = itens.map((it, idx) => {
      const cor = EIXO_COR[it.eixo] || 'red';
      const multiplo = it.tipo === 'fotos' && it.fotos.length > 1;

      const midia = it.tipo === 'video'
        ? `<video controls preload="metadata"${it.poster ? ` poster="${esc(it.poster)}"` : ''}>
             <source src="${esc(it.src)}" type="video/mp4" />
           </video>`
        : multiplo
          ? `<div class="galeria-carrossel">${it.fotos.map((src) =>
              `<img src="${esc(src)}" alt="${esc(it.titulo)}" loading="lazy" />`).join('')}</div>
             <button type="button" class="galeria-nav prev" aria-label="Foto anterior">‹</button>
             <button type="button" class="galeria-nav next" aria-label="Próxima foto">›</button>
             <div class="galeria-dots">${it.fotos.map((_, i) =>
               `<span class="${i === 0 ? 'ativo' : ''}"></span>`).join('')}</div>`
          : `<img src="${esc(it.fotos[0])}" alt="${esc(it.titulo)}" loading="lazy" />`;

      return `
        <article class="card card-galeria" data-idx="${idx}">
          <div class="galeria-midia">${midia}</div>
          <div class="galeria-legenda">
            <p class="titulo-linha"><span class="ponto" style="background:var(--${cor})"></span>${esc(it.titulo)}</p>
            <p class="eixo-nome">${esc(it.legenda ? it.legenda : it.eixo)}</p>
          </div>
        </article>`;
    }).join('');

    /* Carrossel: arrasta/rola com scroll-snap; os botões e pontinhos só ajudam. */
    $$('.card-galeria', lista).forEach((card) => {
      const trilho = $('.galeria-carrossel', card);
      if (!trilho) return;
      const pontos = $$('.galeria-dots span', card);
      const ir = (i) => trilho.scrollTo({ left: i * trilho.clientWidth, behavior: 'smooth' });

      $('.galeria-nav.prev', card)?.addEventListener('click', () =>
        ir(Math.max(0, Math.round(trilho.scrollLeft / trilho.clientWidth) - 1)));
      $('.galeria-nav.next', card)?.addEventListener('click', () =>
        ir(Math.min(pontos.length - 1, Math.round(trilho.scrollLeft / trilho.clientWidth) + 1)));

      trilho.addEventListener('scroll', () => {
        const i = Math.round(trilho.scrollLeft / trilho.clientWidth);
        pontos.forEach((p, pi) => p.classList.toggle('ativo', pi === i));
      }, { passive: true });
    });
  }

  /* ---------- Parceiros ---------- */
  function renderParceiros() {
    $('#listaParceiros').innerHTML = PARCEIROS.map((p) => `
      <article class="card parceiro">
        <div class="parceiro-logo${p.logoPendente ? ' pendente' : ''}">
          ${p.logoPendente
            ? 'Logo em breve'
            : `<img src="${esc(p.logo)}" alt="${esc(p.nome)}" loading="lazy" />`}
        </div>
        <h3>${esc(p.nome)}</h3>
        ${p.descricao ? `<p>${esc(p.descricao)}</p>` : ''}
      </article>
    `).join('');
  }

  /* ---------- Workshops ---------- */
  const CORES_WORKSHOP = ['eixo-red', 'eixo-orange', 'eixo-brown', 'eixo-maroon'];

  function renderWorkshops() {
    $('#listaWorkshops').innerHTML = WORKSHOPS.map((w, i) => `
      <article class="card projeto ${CORES_WORKSHOP[i % CORES_WORKSHOP.length]}${w.rascunho ? ' rascunho' : ''}">
        ${w.rascunho ? '<div class="projeto-topo"><span class="badge badge-soft">A preencher</span></div>' : ''}
        <h3>${esc(w.titulo)}</h3>
        <p>${esc(w.resumo)}</p>
        <p class="projeto-meta"><strong>Formato:</strong> ${esc(w.formato)}</p>
      </article>
    `).join('');
  }

  /* ---------- Depoimentos ---------- */
  function renderDepoimentos() {
    $('#listaDepoimentos').innerHTML = DEPOIMENTOS.map((d) => `
      <figure class="card${d.rascunho ? ' rascunho' : ''}">
        <blockquote class="depoimento-texto">${esc(d.texto)}</blockquote>
        <figcaption class="depoimento-autor">
          <strong>${esc(d.autor)}</strong>
          <span>${esc(d.papel)}</span>
        </figcaption>
      </figure>
    `).join('');
  }

  /* ---------- Formulário de contato → WhatsApp ---------- */
  const form = $('#formContato');

  function validarCampo(input) {
    const campo = input.closest('.campo');
    const alvo = $(`[data-erro="${input.name}"]`);
    const vazio = !input.value.trim();
    campo.classList.toggle('invalido', vazio);
    if (alvo) alvo.textContent = vazio ? 'Preencha este campo.' : '';
    return !vazio;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = $('#nome');
    const mensagem = $('#mensagem');
    const ok = [nome, mensagem].map(validarCampo).every(Boolean);
    if (!ok) { (validarCampo(nome) ? mensagem : nome).focus(); return; }

    const texto =
      `Olá, Instituto Digepp!\n\n` +
      `*Nome:* ${nome.value.trim()}\n` +
      `*Assunto:* ${$('#assunto').value}\n\n` +
      `${mensagem.value.trim()}`;

    window.open(linkWhats(texto), '_blank', 'noopener');
  });

  [$('#nome'), $('#mensagem')].forEach((input) => {
    input.addEventListener('blur', () => validarCampo(input));
    input.addEventListener('input', () => {
      if (input.closest('.campo').classList.contains('invalido')) validarCampo(input);
    });
  });

  /* ---------- Animação de entrada ---------- */
  const observador = 'IntersectionObserver' in window
    ? new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 })
    : null;

  function observarNovos() {
    $$('.grid-cards > *, .cards-stack > *, .grid-parceiros > *').forEach((el, i) => {
      if (el.classList.contains('visivel') || el.dataset.obs) return;
      el.dataset.obs = '1';
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
    });
    if (!observador) { $$('.reveal').forEach((el) => el.classList.add('visivel')); return; }
    $$('.reveal:not(.visivel)').forEach((el) => observador.observe(el));
  }

  /* ---------- Inicialização ---------- */
  renderFiltros();
  renderProjetos();
  renderGaleria();
  renderParceiros();
  renderWorkshops();
  renderDepoimentos();
  observarNovos();
})();
