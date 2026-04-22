# Design Reference — Parte 1 (Positivus)

Fonte de verdade extraída de implementações públicas do design Positivus.
Use este arquivo em vez de fazer fetch de URLs externas.

---

## Identidade visual

```
Fonte:       Space Grotesk (Google Fonts) — pesos 300, 400, 500, 600, 700
Cor verde:   #B9FF66
Cor escura:  #191A23
Cor cinza:   #F3F3F3
Cor branca:  #FFFFFF
Cor texto:   #000000 / #191A23
```

## Tokens de componente

```
Sombra dos cards:      0px 5px 0px 0px #191A23
Border-radius cards:   45px
Border-radius botões:  14px
Border cards:          1px solid #191A23
Container max-width:   1440px
Container padding:     0 100px
Espaçamento seções:    ~136px (margin-bottom entre seções)
```

## Tipografia

```
Hero H1:         60px, font-weight 500
Section title:   40px
Card title:      30px
Body text:       20px, line-height 28px
```

---

## Seção 1 — Header / Navigation

**Layout:** flex row, space-between, items center
**Fundo:** branco

```html
<header>
  <a class="logo">Positivus</a>
  <nav>
    <a>About us</a>
    <a>Services</a>
    <a>Use Cases</a>
    <a>Pricing</a>
    <a>Blog</a>
  </nav>
  <button class="btn-outline">Request a quote</button>
</header>
```

**Botão "Request a quote":** border 1px solid #191A23, bg transparente, border-radius 14px, padding 20px 35px

---

## Seção 2 — Hero

**Layout:** flex row (60% texto / 40% imagem), imagem alinhada à direita
**Fundo:** branco

**Textos:**
- H1: `Navigating the digital landscape for success`
- Parágrafo: `Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.`
- Botão: `Book a consultation` — bg #191A23, cor branca, border-radius 14px

**Logos abaixo do hero (linha horizontal):**
Amazon · Dribbble · HubSpot · Notion · Netflix · Zoom

---

## Seção 3 — Services

**Header da seção:** badge verde (#B9FF66) com texto "Services" + descrição à direita
- Descrição: `At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:`

**Grid:** 2 colunas, gap 40px

**Cards (ordem):**

| Posição | Fundo      | Título                       |
|---------|------------|------------------------------|
| 1       | #F3F3F3    | Search engine optimization   |
| 2       | #B9FF66    | Pay-per-click advertising    |
| 3       | #191A23    | Social Media Marketing       |
| 4       | #F3F3F3    | Email Marketing              |
| 5       | #B9FF66    | Content Creation             |
| 6       | #191A23    | Analytics and Tracking       |

**Cada card:**
- border-radius: 45px
- border: 1px solid #191A23
- box-shadow: 0px 5px 0px 0px #191A23
- padding: ~50px
- Layout: título + link "Learn more →" à esquerda, ilustração decorativa à direita (top-right)
- Cards escuros (#191A23): título e link em branco
- Link "Learn more": tem ícone de seta em círculo (preto nos cards claros, branco nos cards escuros)

---

## Seção 4 — Let's make things happen (CTA)

**Fundo externo:** branco (container da seção)
**Card interno:** bg #191A23, border-radius 45px, padding ~60px

**Layout:** texto à esquerda (~60%), ilustração à direita (~40%)

**Textos:**
- H2: `Let's make things happen`
- Parágrafo (branco): `Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.`
- Botão: `Get your free proposal` — bg branco, cor #191A23, border-radius 14px

---

## Seção 5 — Case Studies

**Header da seção:** badge verde (#B9FF66) com texto "Case Studies" + descrição à direita
- Descrição: `Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies`

**Painel:** bg #191A23, border-radius 45px, padding 70px
**Layout interno:** 3 colunas separadas por linhas verticais brancas

**Case 1:**
`For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.`
Link: `Learn more →` (cor #B9FF66)

**Case 2:**
`For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.`
Link: `Learn more →` (cor #B9FF66)

**Case 3:**
`For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.`
Link: `Learn more →` (cor #B9FF66)

---

## Responsividade

- Mobile: todos os grids viram coluna única
- Cards de serviços: 1 coluna no mobile
- Case Studies: empilhados verticalmente no mobile (dividers horizontais)
- Hero: imagem some ou vai abaixo do texto no mobile
- Container padding reduz para ~20px no mobile
