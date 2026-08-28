# Site do Instituto Digepp

Site institucional estático (HTML/CSS/JS puro — sem build, sem dependências).

## Como abrir

Dê dois cliques em `index.html`. É só isso.

Para publicar: suba a pasta inteira em qualquer hospedagem estática
(Netlify, Vercel, GitHub Pages, Hostinger, ou a hospedagem do domínio
`institutodigepp.org.br`). Arraste a pasta e pronto.

## Estrutura

```
index.html              → todas as seções do site
assets/css/styles.css   → aparência (cores, tipografia, layout)
assets/js/dados.js      → ⭐ CONTEÚDO: projetos, workshops, depoimentos, contato
assets/js/main.js       → funcionamento (menu, filtros, formulário)
assets/img/logo-simbolo.png  → símbolo (sem texto), fundo transparente — usado no cabeçalho, favicon e marca-d'água do hero
assets/img/logo-completo.png → marca completa (símbolo + nome), fundo transparente — usada no rodapé e no compartilhamento (Open Graph)
```

## O que falta preencher

Este site foi montado a partir das informações públicas do Instagram
[@institutodigepp](https://instagram.com/institutodigepp) e do cartão digital
[meuairgo.com.br/institutodigepp](https://meuairgo.com.br/institutodigepp).
As legendas dos posts do Instagram não são acessíveis automaticamente, então
os itens abaixo ficaram como rascunho — eles aparecem no site com borda
tracejada e a etiqueta **"A preencher"**.

Abra `assets/js/dados.js` e complete o que ainda falta:

1. **Depoimentos** — os 3 ainda são texto de exemplo. Troque pelas falas reais
   de participantes, voluntários e parceiros.
2. **Workshops** — só tem 1 cadastrado ("Segurança digital para a terceira
   idade"). Adicione outros que o Instituto realmente ofereça.

Projetos, parceiros e endereço já estão preenchidos com informações reais.

Para cada bloco em rascunho: escreva os textos e **apague a linha `rascunho: true`**.
O card deixa de ser tracejado e passa a aparecer como conteúdo publicado.

### Adicionar a logo de um parceiro (ex: ADRA)

1. Salve o arquivo de imagem (PNG ou SVG, de preferência com fundo transparente)
   dentro de `assets/img/parceiros/` — por exemplo: `assets/img/parceiros/adra.png`.
2. Abra `assets/js/dados.js`, ache o bloco `PARCEIROS` e preencha o campo `logo`
   com esse caminho.
3. Apague a linha `logoPendente: true` desse parceiro.

Até isso ser feito, o cartão do parceiro aparece com uma caixa tracejada escrito
"Logo em breve" no lugar da imagem.

### Adicionar um projeto novo

Copie um bloco inteiro entre `{` e `}`, cole logo abaixo e edite os textos:

```js
{
  titulo: 'Nome do projeto',
  eixo: 'Educação e cidadania',   // precisa existir na lista EIXOS, no topo do arquivo
  status: 'Em andamento',
  resumo: 'O que o projeto faz, para quem, e o resultado que gera.',
  publico: 'Quem é atendido',
},
```

A cor do cartão é definida automaticamente pelo eixo escolhido (mapa `EIXO_COR`, logo
abaixo da lista `EIXOS` em `dados.js`) — não é preciso escolher ícone nem cor manualmente.

## Informações já configuradas

| Item | Valor |
|---|---|
| Telefone / WhatsApp | +55 98 3237-0870 |
| Instagram | @institutodigepp |
| Fundação | 2016 |
| Lema | "Transformando vidas" |

Todos os botões de contato e o formulário abrem uma conversa no WhatsApp com a
mensagem já escrita — não é preciso servidor nem back-end.

## Cores e logotipo

O logotipo usado é o arquivo oficial enviado (`logo/digepp logo.jpg`). A partir
dele foram geradas duas versões com fundo transparente:

- `assets/img/logo-simbolo.png` — recorte só do símbolo (sem o nome escrito),
  usado no cabeçalho, na aba do navegador (favicon) e como marca-d'água no hero.
- `assets/img/logo-completo.png` — símbolo + "INSTITUTO DIGEPP" + subtítulo,
  usado no rodapé (sobre uma placa clara, já que o texto do logo é escuro) e
  como imagem de pré-visualização ao compartilhar o link (Open Graph).

A paleta de cores do site usa versões mais suaves das seis cores da marca —
como as camadas translúcidas do logotipo se misturam com o papel branco, o
efeito real é mais claro do que a cor "pura" de cada folha. Os tokens ficam no
topo de `assets/css/styles.css`, no bloco `:root`:

```css
--maroon:  #7D1A1A;
--red:     #C11F2A;
--crimson: #E2454A;
--brown:   #8C5A38;
--orange:  #DD7A35;
--peach:   #EFA868;
```

Se o Instituto tiver um manual de marca com esses valores definidos oficialmente
(hexadecimais exatos, Pantone etc.), vale substituir esses seis tokens pelos
valores oficiais — os nomes das variáveis (`--maroon`, `--red`...) podem
continuar os mesmos, só os valores de cor mudam.

Se um dia trocarem a logo, basta gerar novos recortes com fundo transparente e
sobrescrever os dois arquivos PNG acima (mesmos nomes) — nenhuma outra parte do
site precisa mudar.

## Recursos incluídos

- Responsivo (celular, tablet e desktop) com menu hambúrguer
- Modo escuro automático conforme a preferência do sistema
- Acessibilidade: link "pular para o conteúdo", foco visível, rótulos ARIA,
  respeito a `prefers-reduced-motion`
- Filtro de projetos por eixo de atuação
- Botão flutuante de WhatsApp
- Metatags de SEO e Open Graph para compartilhamento em redes sociais
