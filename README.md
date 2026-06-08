# Mazzei e Fleming Advocacia

Base profissional para landing page institucional em Next.js 15, preparada para SEO local, conversão por WhatsApp, Vercel e expansão futura por outras IAs/agentes.

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
- Domínio base: `https://mazzeiefleming.com.br`.

## Notas para expansão futura

- Conteúdos editáveis ficam em `src/data`.
- Componentes de layout ficam em `src/components/layout`.
- Seções reaproveitáveis ficam em `src/components/sections`.
- Elementos básicos de UI ficam em `src/components/ui`.
- Evite adicionar bibliotecas sem necessidade clara de negócio, SEO, performance ou manutenção.
