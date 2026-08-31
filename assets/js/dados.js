/* ============================================================
   INSTITUTO DIGEPP — ARQUIVO DE CONTEÚDO
   ------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para atualizar
   projetos, workshops e depoimentos do site.

   Não é preciso saber programar: copie um bloco { ... } inteiro,
   cole abaixo dele e troque os textos entre aspas.

   Cards com  rascunho: true  aparecem no site com visual tracejado
   de "a preencher". Depois de escrever o conteúdo real, apague a
   linha  rascunho: true  e o card vira um card normal.
   ============================================================ */

/* ---------- EIXOS (usados nos filtros dos projetos e nas cores dos cartões) ----------
   Cada eixo tem uma cor da marca associada (ver EIXO_COR logo abaixo). */
const EIXOS = [
  'Todos',
  'Inclusão digital',
  'Educação e cidadania',
  'Geração de renda',
  'Saúde e bem-estar',
  'Comunidade',
  'Cultura e Tradição',
];

const EIXO_COR = {
  'Inclusão digital':      'red',
  'Educação e cidadania':  'brown',
  'Geração de renda':      'orange',
  'Saúde e bem-estar':     'crimson',
  'Comunidade':            'maroon',
  'Cultura e Tradição':    'peach',
};

/* ---------- PROJETOS ----------
   status: 'Presença institucional' identifica ações/eventos organizados por outras
   instituições, dos quais o Instituto participou (não foram criados pelo Digepp).

   Os cards aqui em "Nossos projetos" são só texto (sem foto nem vídeo) —
   isso é proposital, para ficar mais fácil de ler e comparar os projetos.
   Toda foto e vídeo entra na seção "Galeria", automaticamente, identificada
   com o nome e o eixo do projeto. Não precisa mexer na Galeria à parte.

   Para adicionar fotos a um projeto: salve as imagens em assets/img/projetos/
   e liste os caminhos no campo `fotos` (aceita 1 ou mais — todas aparecem
   juntas, num único cartão da Galeria).

   Para adicionar 1 vídeo a um projeto: salve o arquivo (.mp4) em
   assets/videos/ e preencha o campo `video` com esse caminho. `videoCapa` é
   opcional (imagem de capa; sem ela, o navegador usa o primeiro frame).

   Para adicionar MAIS DE 1 vídeo ao mesmo projeto (ex: o mesmo projeto
   apresentado em lugares diferentes), use o campo `videos` no lugar de
   `video`, com um item por vídeo. Cada item pode ter `legenda` (aparece
   embaixo do título na Galeria, ex: o nome do local) e `poster` (capa):

     videos: [
       { src: 'assets/videos/nome1.mp4' },
       { src: 'assets/videos/nome2.mp4', legenda: 'Nome do local ou ocasião' },
     ],
   -------------------------------------------------------------------------- */
const PROJETOS = [
  {
    titulo: 'Conecta Idoso',
    eixo: 'Inclusão digital',
    status: 'Em andamento',
    destaque: true,
    fotos: [
      'assets/img/projetos/conecta-idoso-1.jpg',
      'assets/img/projetos/conecta-idoso-2.jpg',
    ],
    video: 'assets/videos/conecta-idoso.mp4',
    videoCapa: 'assets/img/projetos/conecta-idoso-1.jpg',
    resumo:
      'Inclusão digital da pessoa idosa: oficinas práticas de celular, aplicativos e redes ' +
      'sociais, com orientação sobre segurança on-line e prevenção a golpes. O objetivo é ' +
      'autonomia — que cada participante saia usando a tecnologia com confiança.',
    publico: 'Pessoas com 60 anos ou mais',
  },
  {
    titulo: 'Escolinha Solidária de Informática',
    eixo: 'Inclusão digital',
    status: 'Parceria ADRA',
    video: 'assets/videos/escolinha-solidaria-informatica.mp4',
    videoCapa: 'assets/img/capas/escolinha-solidaria-informatica.jpg',
    resumo:
      'Escola gratuita de informática básica, inaugurada no Núcleo ADRA de Desenvolvimento em ' +
      'parceria com a coordenação da ADRA, levando letramento digital e preparação para o ' +
      'mercado de trabalho à comunidade.',
    publico: 'Crianças, jovens e adultos da comunidade',
  },
  {
    titulo: 'Oficina de Sons',
    eixo: 'Educação e cidadania',
    status: 'Em andamento',
    videos: [
      { src: 'assets/videos/oficina-de-sons.mp4', poster: 'assets/img/capas/oficina-de-sons.jpg' },
      { src: 'assets/videos/oficina-de-sons-creche-joao-e-maria.mp4', legenda: 'Creche Escola João e Maria', poster: 'assets/img/capas/oficina-de-sons-creche-joao-e-maria.jpg' },
    ],
    resumo:
      'Projeto do Instituto, conduzido pelo colaborador Ricardo Passos, que transforma ' +
      'materiais recicláveis em instrumentos musicais, unindo musicalização, educação ambiental ' +
      'e transformação social. Já foi apresentado no Festival do Estudante 2025 (Prefeitura de ' +
      'São Luís), no Coral Vozes da Limpeza — formado por agentes da limpeza da SEMOSP — e na ' +
      'Creche Escola João e Maria, no bairro do João Paulo.',
    publico: 'Estudantes, agentes públicos e crianças da comunidade',
  },
  {
    titulo: 'Agricultura Familiar Quilombola — Bequimão',
    eixo: 'Geração de renda',
    status: 'Em andamento',
    video: 'assets/videos/quilombolas-bequimao.mp4',
    videoCapa: 'assets/img/capas/quilombolas-bequimao.jpg',
    resumo:
      'Primeira reunião entre o Instituto e as comunidades quilombolas Boa Vista e Iriritiua, ' +
      'no município de Bequimão, para apresentar o diagnóstico e a avaliação de necessidades ' +
      'que vão fortalecer a agricultura familiar e o desenvolvimento sustentável da região.',
    publico: 'Comunidades quilombolas Boa Vista e Iriritiua (Bequimão)',
  },
  {
    titulo: 'Desenvolvimento Quilombola — Baixada Maranhense',
    eixo: 'Geração de renda',
    status: 'Em andamento',
    video: 'assets/videos/quilombolas-peri-mirim.mp4',
    videoCapa: 'assets/img/capas/quilombolas-peri-mirim.jpg',
    resumo:
      'Projetos desenvolvidos junto às comunidades quilombolas de Pericumã, em Peri Mirim, na ' +
      'Baixada Maranhense, com foco em empoderamento, desenvolvimento econômico e subsistência ' +
      'dessas comunidades.',
    publico: 'Comunidades quilombolas de Pericumã (Peri Mirim)',
  },
  {
    titulo: 'Cidade Solidária',
    eixo: 'Comunidade',
    status: 'Presença institucional',
    video: 'assets/videos/cidade-solidaria.mp4',
    videoCapa: 'assets/img/capas/cidade-solidaria.jpg',
    resumo:
      'A convite da TV Cidade, o Instituto marca presença há três anos consecutivos no evento ' +
      'Cidade Solidária, levando cuidado, atenção e apoio às famílias da comunidade em um dia ' +
      'de serviços essenciais e solidariedade.',
    publico: 'Famílias da comunidade',
  },
  {
    titulo: 'Cozinha Solidária',
    eixo: 'Comunidade',
    status: 'Presença institucional',
    fotos: ['assets/img/projetos/cozinha-solidaria.jpg'],
    video: 'assets/videos/cozinha-solidaria.mp4',
    videoCapa: 'assets/img/capas/cozinha-solidaria.jpg',
    resumo:
      'O Instituto participou da inauguração da Cozinha Solidária no Núcleo ADRA de ' +
      'Desenvolvimento, uma conquista para a comunidade construída em parceria constante com a ' +
      'coordenação da ADRA.',
    publico: 'Comunidade atendida pelo Núcleo ADRA',
  },
  {
    titulo: 'Setembro Amarelo',
    eixo: 'Saúde e bem-estar',
    status: 'Presença institucional',
    resumo:
      'A convite do Instituto Mais Digno, o Instituto Digepp participou de uma ação conjunta ' +
      'com diversos parceiros em alusão ao Setembro Amarelo, mês de prevenção ao suicídio, em ' +
      'um momento de união, conscientização e cuidado com a vida.',
    publico: 'Comunidade em geral',
  },
  {
    titulo: 'Pelo Cliente Hoje, Pelo Futuro Todo Dia',
    eixo: 'Comunidade',
    status: 'Presença institucional',
    video: 'assets/videos/pelo-cliente-hoje-pelo-futuro-todo-dia.mp4',
    videoCapa: 'assets/img/capas/pelo-cliente-hoje-pelo-futuro-todo-dia.jpg',
    resumo:
      'Parceria na ação social promovida pela Equatorial e pela TV Cidade no Centro Educa Mais ' +
      'Dorilene Silva Castro, no Coroadinho. O Instituto disponibilizou seu departamento ' +
      'jurídico e voluntários para atendimentos gratuitos em Direito do Trabalho, Curatela, ' +
      'Direito do Consumidor e outras áreas.',
    publico: 'Comunidade do Coroadinho',
  },
  {
    titulo: 'Ouvidoria nos Bairros',
    eixo: 'Educação e cidadania',
    status: 'Presença institucional',
    video: 'assets/videos/ouvidoria-nos-bairros.mp4',
    videoCapa: 'assets/img/capas/ouvidoria-nos-bairros.jpg',
    resumo:
      'Presença na ação "Ouvidoria nos Bairros", promovida pelo Ministério Público do Maranhão, ' +
      'na Associação Carente São Benedito do Bairro de Fátima — aproximando os canais da ' +
      'Ouvidoria da população, com consultas oftalmológicas, testes de glicemia, aulão de ' +
      'Zumba e atividades para crianças.',
    publico: 'Moradores do Bairro de Fátima',
  },
  {
    titulo: 'Campanha de Dia das Crianças',
    eixo: 'Comunidade',
    status: 'Campanha anual',
    fotos: ['assets/img/projetos/dia-das-criancas.jpg'],
    video: 'assets/videos/dia-das-criancas.mp4',
    videoCapa: 'assets/img/capas/dia-das-criancas.jpg',
    resumo:
      'Celebração do Dia das Crianças na Vila Embratel, com brincadeiras, sorrisos e doação de ' +
      'brinquedos — um gesto de cuidado e solidariedade que transforma o presente e o futuro ' +
      'das crianças atendidas.',
    publico: 'Crianças da Vila Embratel e comunidades atendidas',
  },
  {
    titulo: 'Campanha de Natal — Adote um Idoso',
    eixo: 'Saúde e bem-estar',
    status: 'Campanha anual',
    resumo:
      'Campanha natalina de arrecadação de kits de higiene e cuidado pessoal, distribuídos ' +
      'por meio do programa Adote um Idoso a pessoas idosas atendidas pelo Instituto.',
    publico: 'Pessoas idosas atendidas pelo programa Adote um Idoso',
  },
  {
    titulo: 'Oficina de Sonhos',
    eixo: 'Educação e cidadania',
    status: 'Fomento 343/2024',
    resumo:
      'Iniciativa realizada através de termo de fomento com o Governo do Estado do Maranhão ' +
      '(Fomento 343/2024), proporcionando oficinas formativas, desenvolvimento de habilidades ' +
      'e cidadania para crianças e jovens da comunidade.',
    publico: 'Crianças, jovens e famílias atendidas',
  },
  {
    titulo: 'Feira Cultural do Anil',
    eixo: 'Cultura e Tradição',
    status: 'Fomento 366/2024',
    resumo:
      'Projeto fomentado pelo Governo do Estado do Maranhão (Fomento 366/2024), valorizando ' +
      'a identidade comunitária, a economia criativa, o artesanato, a gastronomia e as manifestações ' +
      'culturais no bairro do Anil e região.',
    publico: 'Empreendedores locais, artistas e moradores do Anil e adjacências',
  },
  {
    titulo: 'São João Vai Brasil',
    eixo: 'Cultura e Tradição',
    status: 'Fomento 746/2026',
    resumo:
      'Celebração e valorização dos tradicionais festejos juninos maranhenses com fomento ' +
      'do Governo do Estado do Maranhão e SECMA (Fomento 746/2026), fortalecendo as raízes populares, ' +
      'o turismo cultural e a integração comunitária.',
    publico: 'Comunidade em geral, artistas, brincantes e visitantes',
  },
  {
    titulo: 'Projeto Mãos Solidárias (6ª Edição)',
    eixo: 'Comunidade',
    status: 'Parceria SEMSA',
    resumo:
      'Ação contínua executada em parceria com a Secretaria Municipal de Segurança Alimentar (SEMSA), ' +
      'promovendo assistência nutricional, cidadania e apoio alimentar direto a famílias em vulnerabilidade social.',
    publico: 'Famílias em situação de vulnerabilidade e insegurança alimentar',
  },
];

/* ---------- PARCEIROS ----------
   Organizações que apoiam ou executam projetos em conjunto com o Instituto.

   Para adicionar a logo de um parceiro:
   1. Salve o arquivo de imagem (PNG/SVG, de preferência com fundo transparente)
      dentro de assets/img/parceiros/, por exemplo: assets/img/parceiros/adra.png
   2. Preencha o campo `logo` abaixo com esse caminho.
   3. Apague a linha `logoPendente: true` do parceiro.
   ---------------------------------------------------------------------- */
const PARCEIROS = [
  {
    nome: 'Governo do Estado do Maranhão',
    logo: 'assets/img/parceiros/governo-ma.png',
    descricao: 'Apoio e fomento a projetos sociais, culturais e formativos em benefício da população maranhense.',
  },
  {
    nome: 'SECMA',
    logo: 'assets/img/parceiros/secma.jpg',
    descricao: 'Secretaria de Estado da Cultura do Maranhão: fomento aos projetos culturais, tradicionais e comunitários.',
  },
  {
    nome: 'Prefeitura de São Luís',
    logo: 'assets/img/parceiros/prefeitura-sao-luis.png',
    descricao: 'Promotora do Festival do Estudante e de ações com os agentes da limpeza da SEMOSP.',
  },
  {
    nome: 'ADRA',
    logo: 'assets/img/parceiros/adra.png',
    descricao: 'Parceria no Núcleo de Desenvolvimento: Escolinha Solidária de Informática e Cozinha Solidária.',
  },
  {
    nome: 'TV Cidade',
    logo: 'assets/img/parceiros/tv-cidade.png',
    descricao: 'Parceria de três anos consecutivos no evento Cidade Solidária e na ação Pelo Cliente Hoje, Pelo Futuro Todo Dia.',
  },
  {
    nome: 'Instituto Mais Digno',
    logo: 'assets/img/parceiros/instituto-mais-digno.png',
    descricao: 'Parceria em ação conjunta pelo Setembro Amarelo, mês de prevenção ao suicídio.',
  },
  {
    nome: 'Equatorial',
    logo: 'assets/img/parceiros/equatorial.svg',
    descricao: 'Parceria na ação social Pelo Cliente Hoje, Pelo Futuro Todo Dia, no Coroadinho.',
  },
  {
    nome: 'Ministério Público do Maranhão',
    logo: 'assets/img/parceiros/mpma.png',
    descricao: 'Parceria na ação Ouvidoria nos Bairros, no Bairro de Fátima.',
  },
  {
    nome: 'Creche Escola João e Maria',
    logo: 'assets/img/parceiros/joao-e-maria.png',
    descricao: 'Parceria no projeto de desenvolvimento e musicalização junto à União Beneficente dos Moradores do João Paulo.',
  },
  {
    nome: 'Associação Carente São Benedito do Bairro de Fátima',
    logo: 'assets/img/parceiros/acsbbf.jpg',
    descricao: 'Parceria em ações sociais, cidadania, saúde e atendimento direto aos moradores do Bairro de Fátima.',
  },
];

/* ---------- WORKSHOPS / CAPACITAÇÕES ---------- */
const WORKSHOPS = [
  {
    titulo: 'Segurança digital para a terceira idade',
    resumo:
      'Como reconhecer golpes por WhatsApp, links falsos e ligações fraudulentas — com ' +
      'prática guiada no próprio celular do participante.',
    formato: 'Presencial · 10h',
  },
];

/* ---------- DEPOIMENTOS ---------- */
const DEPOIMENTOS = [
  {
    texto: 'Esse projeto me deu mais segurança para usar o celular.',
    autor: 'Participante do Conecta Idoso',
    papel: 'Inclusão Digital da Pessoa Idosa',
  },
  {
    texto: 'Deixei de depender de parentes para certos serviços por conta do projeto CONECTA IDOSO.',
    autor: 'Participante do Conecta Idoso',
    papel: 'Inclusão Digital da Pessoa Idosa',
  },
  {
    texto: 'Aprendi muito sobre a prevenção de golpes no projeto conecta idoso.',
    autor: 'Participante do Conecta Idoso',
    papel: 'Inclusão Digital da Pessoa Idosa',
  },
];

/* ---------- CONTATO ---------- */
const CONTATO = {
  telefone: '+55 98 98916-8073',
  whatsapp: '5598989168073', // somente números, com código do país
  instagram: 'institutodigepp',
  endereco: 'Rua Paraná, nº 6, Bairro de Fátima, São Luís - MA, CEP 65031-295',
};
