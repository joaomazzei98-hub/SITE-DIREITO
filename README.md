# Fleming & Batista

Base profissional para site institucional em Next.js 15, preparada para SEO local, conversão por WhatsApp, Vercel e expansão futura por outras IAs/agentes.

## Marca

A grafia canônica é **Fleming & Batista** — um "m". Vale para todo texto visível, metadata e nomes de pacote.

Exceção conhecida: `siteConfig.email` usa `contato@flemmingbatista.com.br`, com dois "m", porque é o domínio já em uso. Divergência mantida deliberadamente até a definição do domínio próprio.

O escritório fica em São Paulo e atende **toda a capital** — evite copy que restrinja o alcance a um bairro ou região.

## Stack

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- ESLint
- Prettier

## Estrutura

```txt
src/
├── app/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── forms/
├── lib/
├── hooks/
├── styles/
├── data/
├── utils/
└── types/
```

## Desenvolvimento

```bash
npm install
npm run dev
```

## Qualidade

```bash
npm run lint
npm run typecheck
npm run format:check
```

## SEO e produção

- Metadata global e por página em `src/app`.
- Open Graph inicial configurado.
- `robots.txt` via `src/app/robots.ts`.
- `sitemap.xml` via `src/app/sitemap.ts`.
- Schema.org `LegalService` em `src/lib/seo.ts`.
- Domínio base: `https://mazzei-fleming.vercel.app`.

## Notas para expansão futura

- Conteúdos editáveis ficam em `src/data`.
- Componentes de layout ficam em `src/components/layout`.
- Seções reaproveitáveis ficam em `src/components/sections`.
- Elementos básicos de UI ficam em `src/components/ui`.
- Evite adicionar bibliotecas sem necessidade clara de negócio, SEO, performance ou manutenção.
