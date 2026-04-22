# Design Reference — Parte 1 (Positivus)

Fonte de verdade extraída diretamente do Figma via API (arquivo `QGCJc8PeG7Gk0rPpx8028f`).
Imagens de referência em `../figma-exports/`. JSON completo em `../figma-full.json`.

---

## Identidade visual

```
Fonte:         Space Grotesk (Google Fonts) — pesos 400, 500
Cor verde:     #B9FF66
Cor escura:    #191A23
Cor cinza:     #F3F3F3
Cor branca:    #FFFFFF
Cor texto:     #000000
Cor cinza txt: #898989  (placeholders)
```

---

## Tokens globais

```
Container max-width:          1440px
Container padding horizontal: 100px (left + right)

Sombra dos cards:    0px 5px 0px 0px #191A23
Border cards:        1px solid #191A23
Border-radius cards: 45px
Border-radius botão: 14px
Border-radius badge: 7px

Botão padding:  20px 35px (top/bottom / left/right)
```

---

## Tipografia

| Elemento              | Size   | Weight | Line-height |
|-----------------------|--------|--------|-------------|
| Hero H1               | 60px   | 500    | 76.56px     |
| Section badge label   | 40px   | 500    | —           |
| Card title (services) | 30px   | 500    | —           |
| Nav links / body      | 20px   | 400    | 28px        |
| Card text / form      | 18px   | 400    | 22.97px     |
| Section description   | 18px   | 400    | —           |
| Form labels           | 16px   | 400    | —           |

---

## Espaçamento entre seções

```
Seção anterior → próximo heading:  140px
Heading → bloco da seção:           80px
```

---

## Estrutura de seção (padrão)

Cada seção tem um "Heading & Subheading" row separado, acima do bloco principal:

```
[Heading & Subheading row]   ← layout HORIZONTAL, gap 40px, padding 100px h
  [Badge #B9FF66]              ← radius 7px, padding 7px, texto 40px w500
  [Descrição texto]            ← 18px w400 #000000, max-width ~580px
[Bloco da seção]
```

---

## Seção 1 — Navigation bar

**Frame:** 1440×68, padding 0/100 (top-bottom/sides), layout HORIZONTAL, gap 206px

```
Logo  |  gap 206px  |  Nav links (gap 40px)  |  gap ...  |  Botão
```

**Nav links:** `About us` · `Services` · `Use Cases` · `Pricing` · `Blog`
- 20px Space Grotesk w400, cor #000000

**Botão "Request a quote":**
- padding: 20px 35px, border-radius: 14px
- border: 1px solid #191A23, background: transparente

---

## Seção 2 — Hero

**Frame:** 1440×515, padding 0/100, layout HORIZONTAL, gap 206px (entre texto e ilustração)

**Coluna texto (531px wide):** layout VERTICAL, gap 35px
- H1: `Navigating the digital landscape for success`
  - 60px, w500, line-height 76.56px
- Parágrafo (498px wide):
  - `Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.`
  - 20px w400, line-height 28px
- Botão `Book a consultation`:
  - padding 20px 35px, bg #191A23, cor branca, border-radius 14px

**Ilustração:** 600×515 (círculos + elementos decorativos)

---

## Seção 2b — Logotypes

**Frame:** 1440×48, padding 0/100, layout HORIZONTAL, gap 206px

| Logo     | Tamanho  |
|----------|----------|
| Amazon   | 124×48   |
| Dribbble | 126×48   |
| HubSpot  | 129×48   |
| Notion   | 146×48   |
| Netflix  | 125×48   |
| Zoom     | 111×48   |

---

## Seção 3 — Services

**Badge heading:** `Services`
**Descrição:** `At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:`

**Bloco:** 1440×1010, layout VERTICAL, gap 40px entre linhas de cards

**Cada linha de cards:** padding 0/100, gap 40px entre cards
**Cada card:** 600×310, padding 50px todos os lados, radius 45px, border 1px solid #191A23, shadow 0 5px 0 #191A23
- Layout HORIZONTAL, gap 77px (texto ↔ ilustração)
- Coluna texto: layout VERTICAL, gap 93px (título ↔ link)
- Título: 30px w500
- "Learn more" link: 20px w400 + ícone seta em círculo

| Posição | Fundo      | Título                         |
|---------|------------|--------------------------------|
| 1       | #F3F3F3    | Search engine optimization     |
| 2       | #B9FF66    | Pay-per-click advertising      |
| 3       | #191A23    | Social Media Marketing         |
| 4       | #F3F3F3    | Email Marketing                |
| 5       | #B9FF66    | Content Creation               |
| 6       | #191A23    | Analytics and Tracking         |

Cards escuros (#191A23): título e link em branco. Ícone de seta: branco.

---

## Seção 4 — Let's make things happen (CTA)

**Bloco:** GROUP 1440×394 (sem padding próprio)
**Card interno:** bg #191A23, border-radius 45px, padding 60px / 100px

**Layout:** texto à esquerda (~60%), ilustração à direita (~40%)

**Textos:**
- H2 branco: `Let's make things happen`
- Parágrafo branco:
  `Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.`
- Botão `Get your free proposal`: bg #FFFFFF, cor #191A23, border-radius 14px, padding 20px 35px

---

## Seção 5 — Case Studies

**Badge heading:** `Case Studies`
**Descrição:** `Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies`

**Painel:** 1234×326, padding 70px top/bottom · 60px left/right, bg #191A23, radius 45px
- Layout HORIZONTAL, gap 64px entre cases
- Divisórias verticais brancas (LINE elements)

**Cada case (text 286px wide):**
- Texto: 18px w400 #FFFFFF, line-height 22.97px
- Link `Learn more →`: cor #B9FF66, 20px (ícone seta #B9FF66)

**Textos:**
1. `For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.`
2. `For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.`
3. `For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.`

---

## Seção 6 — Our Working Process

**Badge heading:** `Our Working Process`
**Descrição:** `Step-by-Step Guide to Achieving Your Business Goals`

**Bloco:** 1434×1224, padding 0/100, layout VERTICAL, gap 30px entre cards

**Cada card accordion:** 1234px wide, padding 41px top/bottom · 60px left/right, radius 45px
- Layout VERTICAL, gap 10px (collapsed) ou mais (expanded)
- Header interno: layout HORIZONTAL, gap 352px (label ↔ ícone)
  - Label: número + título, layout HORIZONTAL, gap 25px
  - Plus icon (toggle): 58×58
- Divider line: 1114px wide
- Texto descrição: 18px w400, line-height 22.97px

| Step | Estado   | Fundo      | Título                   |
|------|----------|------------|--------------------------|
| 01   | Expanded | #B9FF66    | Consultation             |
| 02   | Collapsed| #F3F3F3    | Research and Strategy    |
| 03   | Collapsed| #F3F3F3    | Implementation           |
| 04   | Collapsed| #F3F3F3    | Monitoring and Optimizing|
| 05   | Collapsed| #F3F3F3    | Reporting and Communication|
| 06   | Collapsed| #F3F3F3    | Continual Improvement    |

**Texto do step 01 (expanded):**
`During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.`

---

## Seção 7 — Testimonials

**Badge heading:** `Testimonials`
**Descrição:** `Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services`

**Bloco:** 1240×625, bg #191A23, radius 45px (overflow hidden para carrossel)

**Carrossel:** layout HORIZONTAL, gap 50px entre cards
**Cada card:** 606×335, layout VERTICAL, gap 20px
- Quote bubble: 606×266
- Texto: 18px w400 #FFFFFF, line-height 22.97px, entre aspas
- Nome/cargo: 18px w400 #FFFFFF

**Navegação:** setas esquerda/direita + dots (146px wide) centralizados abaixo

---

## Seção 8 — Contact

**Badge heading:** `Contact Us`
**Descrição:** `Connect with Us: Let's Discuss Your Digital Marketing Needs`

**Bloco outer:** 1440×773, padding 0/100
**Card interno:** 1240×773, padding 60px top · 100px sides · 80px bottom, bg #F3F3F3, radius 45px
- Layout HORIZONTAL, gap 10px
- Ilustração à direita: 692×648 (faz overflow, posicionada com margin negativa)

**Formulário (556px wide):** layout VERTICAL, gap 40px

**Radio buttons:** `Say Hi` · `Get a Quote`, gap 35px

**Campos (gap 25px entre eles):**
- Label: 16px w400 #000000 (acima do campo)
- Input placeholder: 18px w400 #898989
- Campos: `Name`, `Email*`, `Message*`
- Border: 1px solid #191A23, radius 14px, bg #FFFFFF

**Botão submit:** `Send Message`, full-width 556px, padding 20px 35px, bg #191A23, cor #FFFFFF, radius 14px

---

## Seção 9 — Footer

**Bloco outer:** 1441×514, padding 0/100
**Footer card:** 1241×514, padding 55px top · 60px sides · 50px bottom, bg #191A23, radius: nenhum (parte do layout)

**Layout VERTICAL, gap 50px**

**Linha superior:** logo + nav links (gap 155px)
- Nav links: `About us` · `Services` · `Use Cases` · `Pricing` · `Blog`
  - 18px w400 #FFFFFF

**Linha inferior:** contatos + redes sociais (layout HORIZONTAL, gap 154px)

**Linha final:**
- Divider: linha branca 1120px
- Copyright: `© 2023 Positivus. All Rights Reserved.`
  - 18px #FFFFFF
- Privacy Policy link

---

## Responsividade (mobile frame: `Home Mob`)

- Container padding: 20px
- Grid de cards → 1 coluna
- Hero: imagem vai abaixo do texto
- Case Studies: empilha verticalmente (dividers horizontais)
- Nav: colapsa em hamburguer menu
