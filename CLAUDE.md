# CLAUDE.md — Asimov Academy Teste Técnico

Leia este arquivo antes de qualquer ação.
Detalhes de design da parte-1 estão em `parte-1/design-reference.md` — leia antes de codar.

---

## O que é o projeto

Teste técnico para vaga de Designer/Frontend Dev na Asimov Academy.
Prazo: 24/04/2026 até 12h (horário de Brasília).

**Parte 1:** Reproduzir 4 seções de uma landing page existente (Figma → código)
**Parte 2:** Criar uma seção de hero do zero para um curso de Python

---

## Stack

| Tecnologia    | Versão  | Para que serve              |
|---------------|---------|-----------------------------|
| Next.js       | 15      | Framework (App Router)      |
| TypeScript    | latest  | Linguagem                   |
| Tailwind CSS  | latest  | Estilização                 |
| Framer Motion | latest  | Animações                   |
| Vercel        | —       | Deploy gratuito             |

---

## Estrutura de pastas

```
Azimov/
├── CLAUDE.md
├── parte-1/
│   ├── design-reference.md   ← tokens e estrutura do design (leia antes de codar)
│   └── (projeto Next.js)
└── parte-2/
    └── (projeto Next.js)
```

---

## Comandos

```bash
npm run dev      # servidor local
npm run build    # build de produção
npm run start    # roda o build localmente
```

Deploy: push para GitHub → Vercel detecta automaticamente e publica.

---

## Checklist pós-implementação

- [ ] O resultado é visualmente indistinguível do design?
- [ ] Responsivo (mobile + desktop)?
- [ ] Está publicado online (link funcionando)?
- [ ] Código está no repositório público no GitHub?
- [ ] README com as 3 perguntas respondidas (IA usada, onde ajudou, o que ajustou)?
- [ ] Repositório organizado em /parte-1 e /parte-2?

---

## Armadilhas conhecidas

> Adicione aqui sempre que resolver algo não óbvio.

---

## Links de referência (não fazer fetch — usar design-reference.md)

- Figma original: https://www.figma.com/design/QGCJc8PeG7Gk0rPpx8028f/Positivus-Landing-Page-Design--Community-?node-id=333-1290
- Demo ao vivo (parte-1): https://positivustheme.vercel.app/
- Site da Asimov (identidade visual parte-2): https://asimov.academy
- Referências de design parte-2: https://linear.app · https://frame.io · https://antimetal.com
