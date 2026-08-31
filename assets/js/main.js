/* ============================================================
   INSTITUTO DIGEPP — COMPORTAMENTO DO SITE
   Lê o conteúdo de assets/js/dados.js e gerencia interatividades,
   filtros, modal lightbox, carrossel e métricas de impacto.
   ============================================================ */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (txt) => String(txt).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* ---------- 1. Ano no rodapé ---------- */
  const elAno = $('#ano');
  if (elAno) elAno.textContent = new Date().getFullYear();

  /* ---------- 2. Gerenciamento de Tema (Claro / Escuro) ---------- */
  const THEME_KEY = 'digepp-theme';
  const htmlRoot = document.documentElement;

  function aplicarTema(tema) {
    if (tema === 'dark' || tema === 'light') {
      htmlRoot.setAttribute('data-theme', tema);
    } else {
      htmlRoot.setAttribute('data-theme', 'auto');
    }
  }

  function alternarTema() {
    const temaAtual = htmlRoot.getAttribute('data-theme');
    let proximoTema = 'dark';

    if (temaAtual === 'dark') {
      proximoTema = 'light';
    } else if (temaAtual === 'light') {
      proximoTema = 'dark';
    } else {
      // Se estava em 'auto', inverte o valor da preferência do sistema
      const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
      proximoTema = prefereEscuro ? 'light' : 'dark';
    }

    localStorage.setItem(THEME_KEY, proximoTema);
    aplicarTema(proximoTema);
  }

  // Inicializar tema a partir do localStorage
  const temaSalvo = localStorage.getItem(THEME_KEY);
  if (temaSalvo) {
    aplicarTema(temaSalvo);
  }

  const btnThemeDesk = $('#themeToggle');
  const btnThemeMob = $('#themeToggleMobile');
  if (btnThemeDesk) btnThemeDesk.addEventListener('click', alternarTema);
  if (btnThemeMob) btnThemeMob.addEventListener('click', alternarTema);

  /* ---------- 3. Menu Mobile ---------- */
  const toggle = $('#navToggle');
  const menu = $('#navMenu');

  if (toggle && menu) {
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
  }

  /* ---------- 4. Sombra e Glassmorphism do cabeçalho ---------- */
  const header = $('.site-header');
  const aoRolar = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- 5. ScrollSpy (Destaque do menu de navegação) ---------- */
  const secoes = $$('section[id], header[id]');
  const linksNav = $$('.nav a[href^="#"]');

  function atualizarScrollSpy() {
    const scrollPos = window.scrollY + 120;
    let atualId = '';

    secoes.forEach((sec) => {
      const topo = sec.offsetTop;
      const altura = sec.offsetHeight;
      if (scrollPos >= topo && scrollPos < topo + altura) {
        atualId = sec.getAttribute('id');
      }
    });

    linksNav.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('ativo', href === atualId);
    });
  }

  window.addEventListener('scroll', atualizarScrollSpy, { passive: true });
  atualizarScrollSpy();

  /* ---------- 6. Links de WhatsApp e Dados de Contato ---------- */
  const linkWhats = (msg) =>
    `https://api.whatsapp.com/send?phone=${CONTATO.whatsapp}&text=${encodeURIComponent(msg)}`;

  $$('[data-whatsapp]').forEach((el) => {
    el.setAttribute('href', linkWhats(el.dataset.whatsapp));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  $$('[data-campo="endereco"]').forEach((el) => { el.textContent = CONTATO.endereco; });

  // Tooltip do WhatsApp após 3 segundos
  const tooltipWhats = $('.whatsapp-tooltip');
  if (tooltipWhats) {
    setTimeout(() => {
      tooltipWhats.classList.add('visivel');
      setTimeout(() => tooltipWhats.classList.remove('visivel'), 7000);
    }, 3000);
  }

  /* ---------- 7. Contadores Animados de Impacto Social ---------- */
  const contadores = $$('[data-contador]');
  let contadoresExecutados = false;

  function animarContadores() {
    if (contadoresExecutados) return;
    contadoresExecutados = true;

    contadores.forEach((el) => {
      const destino = parseInt(el.getAttribute('data-contador'), 10) || 0;
      const prefixo = el.getAttribute('data-prefixo') || '';
      const sufixo = el.getAttribute('data-sufixo') || '';
      const duracao = 1800; // ms
      const inicio = performance.now();

      function atualizar(tempo) {
        const decorrido = tempo - inicio;
        const progresso = Math.min(decorrido / duracao, 1);
        // Easing easeOutExpo
        const ease = progresso === 1 ? 1 : 1 - Math.pow(2, -10 * progresso);
        const valorAtual = Math.floor(ease * destino);

        el.textContent = `${prefixo}${valorAtual}${sufixo}`;

        if (progresso < 1) {
          requestAnimationFrame(atualizar);
        } else {
          el.textContent = `${prefixo}${destino}${sufixo}`;
        }
      }

      requestAnimationFrame(atualizar);
    });
  }

  const secImpacto = $('#impacto');
  if (secImpacto && 'IntersectionObserver' in window) {
    const impactoObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animarContadores();
        impactoObs.unobserve(secImpacto);
      }
    }, { threshold: 0.25 });
    impactoObs.observe(secImpacto);
  } else {
    animarContadores();
  }

  /* ---------- 8. Renderização dos Projetos ---------- */
  const listaProjetos = $('#listaProjetos');
  const filtrosProjetos = $('.filtros');
  let eixoAtivoProjetos = 'Todos';

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
    if (!listaProjetos) return;
    const visiveis = PROJETOS.filter((p) => eixoAtivoProjetos === 'Todos' || p.eixo === eixoAtivoProjetos);
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

  function renderFiltrosProjetos() {
    if (!filtrosProjetos) return;
    filtrosProjetos.innerHTML = EIXOS.map((eixo) => `
      <button type="button" class="filtro" aria-pressed="${eixo === eixoAtivoProjetos}">${esc(eixo)}</button>
    `).join('');

    $$('.filtro', filtrosProjetos).forEach((btn) => {
      btn.addEventListener('click', () => {
        eixoAtivoProjetos = btn.textContent.trim();
        $$('.filtro', filtrosProjetos).forEach((b) =>
          b.setAttribute('aria-pressed', String(b === btn)));
        renderProjetos();
        observarNovos();
      });
    });
  }

  /* ---------- 9. Galeria (Filtros, Otimização de Vídeo e Lightbox Modal) ---------- */
  const listaGaleria = $('#listaGaleria');
  const filtrosGaleria = $('.filtros-galeria');
  let eixoAtivoGaleria = 'Todos';

  // Coleta unificada de todos os itens de mídia
  function coletarItensGaleria() {
    const itens = [];
    PROJETOS.forEach((p) => {
      const videos = p.videos && p.videos.length
        ? p.videos.map((v) => (typeof v === 'string' ? { src: v } : v))
        : (p.video ? [{ src: p.video, poster: p.videoCapa }] : []);

      videos.forEach((v) => {
        itens.push({
          titulo: p.titulo,
          eixo: p.eixo,
          legenda: v.legenda || '',
          resumo: p.resumo || '',
          tipo: 'video',
          src: v.src,
          poster: v.poster || '',
        });
      });

      if (p.fotos && p.fotos.length) {
        itens.push({
          titulo: p.titulo,
          eixo: p.eixo,
          legenda: '',
          resumo: p.resumo || '',
          tipo: 'fotos',
          fotos: p.fotos,
        });
      }
    });
    return itens;
  }

  const todosItensGaleria = coletarItensGaleria();
  let itensGaleriaFiltrados = [...todosItensGaleria];

  // Lightbox Modal
  const modal = $('#lightboxModal');
  const modalBody = $('#lightboxBody');
  const modalFooter = $('#lightboxFooter');
  const modalClose = $('#lightboxClose');
  const modalPrev = $('#lightboxPrev');
  const modalNext = $('#lightboxNext');
  const modalBackdrop = $('#lightboxBackdrop');
  let indiceAtivoModal = 0;

  function abrirLightbox(indice) {
    if (!itensGaleriaFiltrados.length || !modal) return;
    indiceAtivoModal = (indice + itensGaleriaFiltrados.length) % itensGaleriaFiltrados.length;
    const item = itensGaleriaFiltrados[indiceAtivoModal];
    const cor = EIXO_COR[item.eixo] || 'red';

    if (item.tipo === 'video') {
      modalBody.innerHTML = `
        <video controls autoplay preload="auto" poster="${esc(item.poster || '')}">
          <source src="${esc(item.src)}" type="video/mp4" />
          Seu navegador não suporta a reprodução deste vídeo.
        </video>`;
    } else {
      // Fotos
      const fotoSrc = item.fotos && item.fotos.length ? item.fotos[0] : '';
      modalBody.innerHTML = `<img src="${esc(fotoSrc)}" alt="${esc(item.titulo)}" />`;
    }

    modalFooter.innerHTML = `
      <div class="titulo-linha">
        <span class="ponto" style="background:var(--${cor})"></span>
        <strong>${esc(item.titulo)}</strong>
      </div>
      <p class="eixo-nome">${esc(item.legenda ? item.legenda : item.eixo)}</p>
      ${item.resumo ? `<p style="margin-top:.4rem; font-size:.84rem; opacity:.85;">${esc(item.resumo)}</p>` : ''}
    `;

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function fecharLightbox() {
    if (!modal) return;
    // Pausar vídeo ao fechar
    const vid = $('video', modalBody);
    if (vid) { vid.pause(); vid.src = ''; }
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function anteriorLightbox() {
    abrirLightbox(indiceAtivoModal - 1);
  }

  function proximoLightbox() {
    abrirLightbox(indiceAtivoModal + 1);
  }

  if (modal) {
    if (modalClose) modalClose.addEventListener('click', fecharLightbox);
    if (modalBackdrop) modalBackdrop.addEventListener('click', fecharLightbox);
    if (modalPrev) modalPrev.addEventListener('click', anteriorLightbox);
    if (modalNext) modalNext.addEventListener('click', proximoLightbox);

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-active')) return;
      if (e.key === 'Escape') fecharLightbox();
      if (e.key === 'ArrowLeft') anteriorLightbox();
      if (e.key === 'ArrowRight') proximoLightbox();
    });
  }

  function renderGaleria() {
    if (!listaGaleria) return;

    itensGaleriaFiltrados = todosItensGaleria.filter(
      (it) => eixoAtivoGaleria === 'Todos' || it.eixo === eixoAtivoGaleria
    );

    if (!itensGaleriaFiltrados.length) {
      listaGaleria.innerHTML = '<p class="lead" style="grid-column:1/-1;">Nenhuma foto ou vídeo neste eixo por enquanto.</p>';
      return;
    }

    listaGaleria.innerHTML = itensGaleriaFiltrados.map((it, idx) => {
      const cor = EIXO_COR[it.eixo] || 'red';
      const multiplo = it.tipo === 'fotos' && it.fotos && it.fotos.length > 1;

      const midia = it.tipo === 'video'
        ? `<div class="galeria-tag">Vídeo</div>
           <video preload="none"${it.poster ? ` poster="${esc(it.poster)}"` : ''}>
             <source src="${esc(it.src)}" type="video/mp4" />
           </video>
           <div class="galeria-play-overlay">
             <div class="galeria-play-btn" aria-hidden="true">
               <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
             </div>
           </div>`
        : multiplo
          ? `<div class="galeria-tag">Fotos (${it.fotos.length})</div>
             <div class="galeria-carrossel">${it.fotos.map((src) =>
               `<img src="${esc(src)}" alt="${esc(it.titulo)}" loading="lazy" />`).join('')}</div>
             <button type="button" class="galeria-nav prev" aria-label="Foto anterior">‹</button>
             <button type="button" class="galeria-nav next" aria-label="Próxima foto">›</button>
             <div class="galeria-dots">${it.fotos.map((_, i) =>
               `<span class="${i === 0 ? 'ativo' : ''}"></span>`).join('')}</div>`
          : `<div class="galeria-tag">Foto</div>
             <img src="${esc(it.fotos[0])}" alt="${esc(it.titulo)}" loading="lazy" />`;

      return `
        <article class="card card-galeria" data-galeria-idx="${idx}" tabindex="0" role="button" aria-label="Abrir ${esc(it.titulo)} em tela cheia">
          <div class="galeria-midia">${midia}</div>
          <div class="galeria-legenda">
            <p class="titulo-linha"><span class="ponto" style="background:var(--${cor})"></span>${esc(it.titulo)}</p>
            <p class="eixo-nome">${esc(it.legenda ? it.legenda : it.eixo)}</p>
          </div>
        </article>`;
    }).join('');

    // Eventos de clique para abrir Lightbox
    $$('.card-galeria', listaGaleria).forEach((card) => {
      const idx = parseInt(card.dataset.galeriaIdx, 10);
      
      card.addEventListener('click', (e) => {
        // Se o clique foi no botão interno de navegação do carrossel da foto, não abre lightbox
        if (e.target.closest('.galeria-nav') || e.target.closest('.galeria-dots')) return;
        abrirLightbox(idx);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abrirLightbox(idx);
        }
      });

      // Carrossel interno para cartões com múltiplas fotos
      const trilho = $('.galeria-carrossel', card);
      if (trilho) {
        const pontos = $$('.galeria-dots span', card);
        const ir = (i) => trilho.scrollTo({ left: i * trilho.clientWidth, behavior: 'smooth' });

        $('.galeria-nav.prev', card)?.addEventListener('click', (e) => {
          e.stopPropagation();
          ir(Math.max(0, Math.round(trilho.scrollLeft / trilho.clientWidth) - 1));
        });
        $('.galeria-nav.next', card)?.addEventListener('click', (e) => {
          e.stopPropagation();
          ir(Math.min(pontos.length - 1, Math.round(trilho.scrollLeft / trilho.clientWidth) + 1));
        });

        trilho.addEventListener('scroll', () => {
          const i = Math.round(trilho.scrollLeft / trilho.clientWidth);
          pontos.forEach((p, pi) => p.classList.toggle('ativo', pi === i));
        }, { passive: true });
      }
    });
  }

  function renderFiltrosGaleria() {
    if (!filtrosGaleria) return;
    filtrosGaleria.innerHTML = EIXOS.map((eixo) => `
      <button type="button" class="filtro-galeria" aria-pressed="${eixo === eixoAtivoGaleria}">${esc(eixo)}</button>
    `).join('');

    $$('.filtro-galeria', filtrosGaleria).forEach((btn) => {
      btn.addEventListener('click', () => {
        eixoAtivoGaleria = btn.textContent.trim();
        $$('.filtro-galeria', filtrosGaleria).forEach((b) =>
          b.setAttribute('aria-pressed', String(b === btn)));
        renderGaleria();
        observarNovos();
      });
    });
  }

  /* ---------- 10. Parceiros ---------- */
  function renderParceiros() {
    const el = $('#listaParceiros');
    if (!el) return;
    el.innerHTML = PARCEIROS.map((p) => `
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

  /* ---------- 11. Workshops ---------- */
  const CORES_WORKSHOP = ['eixo-red', 'eixo-orange', 'eixo-brown', 'eixo-maroon'];

  function renderWorkshops() {
    const el = $('#listaWorkshops');
    if (!el) return;
    el.innerHTML = WORKSHOPS.map((w, i) => `
      <article class="card projeto ${CORES_WORKSHOP[i % CORES_WORKSHOP.length]}${w.rascunho ? ' rascunho' : ''}">
        ${w.rascunho ? '<div class="projeto-topo"><span class="badge badge-soft">A preencher</span></div>' : ''}
        <h3>${esc(w.titulo)}</h3>
        <p>${esc(w.resumo)}</p>
        <p class="projeto-meta"><strong>Formato:</strong> ${esc(w.formato)}</p>
      </article>
    `).join('');
  }

  /* ---------- 12. Depoimentos (Carrossel Interativo) ---------- */
  function renderDepoimentos() {
    const el = $('#listaDepoimentos');
    const dotsContainer = $('#depoimentosDots');
    if (!el) return;

    el.innerHTML = DEPOIMENTOS.map((d) => `
      <figure class="card${d.rascunho ? ' rascunho' : ''}">
        <blockquote class="depoimento-texto">${esc(d.texto)}</blockquote>
        <figcaption class="depoimento-autor">
          <strong>${esc(d.autor)}</strong>
          <span>${esc(d.papel)}</span>
        </figcaption>
      </figure>
    `).join('');

    // Controles do Carrossel
    const prevBtn = $('#depoimentoPrev');
    const nextBtn = $('#depoimentoNext');

    if (dotsContainer) {
      dotsContainer.innerHTML = DEPOIMENTOS.map((_, i) => `
        <button type="button" class="${i === 0 ? 'ativo' : ''}" aria-label="Ir para depoimento ${i + 1}"></button>
      `).join('');

      const dots = $$('button', dotsContainer);
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          const card = el.children[i];
          if (card) {
            el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
          }
        });
      });

      el.addEventListener('scroll', () => {
        const itemWidth = el.children[0]?.clientWidth || 300;
        const indice = Math.round(el.scrollLeft / itemWidth);
        dots.forEach((d, i) => d.classList.toggle('ativo', i === indice));
      }, { passive: true });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        el.scrollBy({ left: -el.clientWidth * 0.8, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' });
      });
    }
  }

  /* ---------- 13. Formulário de contato → WhatsApp ---------- */
  const form = $('#formContato');

  function validarCampo(input) {
    const campo = input.closest('.campo');
    const alvo = $(`[data-erro="${input.name}"]`);
    const vazio = !input.value.trim();
    if (campo) campo.classList.toggle('invalido', vazio);
    if (alvo) alvo.textContent = vazio ? 'Preencha este campo.' : '';
    return !vazio;
  }

  if (form) {
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
      if (!input) return;
      input.addEventListener('blur', () => validarCampo(input));
      input.addEventListener('input', () => {
        if (input.closest('.campo')?.classList.contains('invalido')) validarCampo(input);
      });
    });
  }

  /* ---------- 14. Animação de entrada (IntersectionObserver) ---------- */
  const observador = 'IntersectionObserver' in window
    ? new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
          }
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
    : null;

  function observarNovos() {
    $$('.grid-cards > *, .cards-stack > *, .grid-parceiros > *, .card-impacto').forEach((el, i) => {
      if (el.classList.contains('visivel') || el.dataset.obs) return;
      el.dataset.obs = '1';
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i, 6) * 50}ms`;
    });
    if (!observador) {
      $$('.reveal').forEach((el) => el.classList.add('visivel'));
      return;
    }
    $$('.reveal:not(.visivel)').forEach((el) => observador.observe(el));
  }

  /* ---------- 15. Inicialização Geral ---------- */
  renderFiltrosProjetos();
  renderProjetos();
  renderFiltrosGaleria();
  renderGaleria();
  renderParceiros();
  renderWorkshops();
  renderDepoimentos();
  observarNovos();
})();
