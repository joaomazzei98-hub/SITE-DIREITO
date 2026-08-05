# Sprint 01 — Identidade, alcance estadual e fundação de crescimento

**Status:** em andamento — T1, T2, T3, T4, T5 e T7 concluídas. Restam T6 e T8
**Criado em:** 2026-08-04
**Base:** commit `80d3d00`

Sprint derivado da análise inicial do projeto. Cada tarefa resolve uma lacuna identificada e tem critério de aceite objetivo.

---

## Insumos do cliente

Atualizado em 2026-08-04.

| # | Insumo | Status | Efeito |
| --- | --- | --- | --- |
| I1 | E-mail `contato@flemmingbatista.com.br` (dois "m") vs. marca "Fleming & Batista" | **Adiado** — não mexer por ora | T1 mantém o e-mail intacto e registra a divergência como pendência conhecida |
| I2 | Inscrição OAB/SP da sociedade e dos advogados | **Parcial:** Ivani Mazzei Batista — OAB/SP 255.429 | T4 entregue com essa advogada. Falta o registro da sociedade e demais advogados — basta acrescentar em `lawyers` |
| I3 | Endereço e horário | **Recebido:** Av. Tucuruvi, 873 – Sala 5 · CEP 02305-002 · seg a sex, 14h às 19h30 | T5 entregue |
| I4 | Logo em vetor | **Não existe** | T3 segue com marca tipográfica (Playfair Display), sem depender de arquivo externo |
| I5 | Fotos reais | **Adiado** — não mexer por ora | T3 e T8 ficam sem fotografia; identidade se apoia em tipografia, cor e composição |

Observação sobre I3: o escritório fica no Tucuruvi (Zona Norte), mas o posicionamento passa a ser a capital inteira (T2). Isso não é contradição — endereço físico real é justamente o que sustenta o Google Business Profile e o schema local, enquanto o copy fala de São Paulo como área atendida.

---

## T1 — Consolidar a marca "Fleming & Batista" ✅

**Lacuna:** grafia inconsistente entre código, e-mail e domínio.

Escopo:
- `package.json` → `"name": "fleming-batista"`
- Auditar toda ocorrência de `Flemming` / `flemming` no repositório
- Alinhar `siteConfig.email` conforme I1
- Registrar em `README.md` a grafia canônica da marca

**Aceite:** `grep -rin "flemming" src package.json README.md` retorna vazio (exceto se I1 confirmar o domínio com dois "m", caso em que fica documentado como exceção deliberada).

**Entregue:** `package.json` renomeado para `fleming-batista`. A única ocorrência remanescente de "flemming" é `siteConfig.email` em `src/data/site.ts:12`, mantida por decisão do cliente (I1 adiado) — reavaliar quando o domínio for confirmado.

---

## T2 — Ampliar o alcance para toda São Paulo ✅

**Lacuna:** o site se posiciona como "São Paulo - Zona Norte"; o foco real é a capital inteira.

14 ocorrências mapeadas em 8 arquivos:

| Arquivo | O que muda |
| --- | --- |
| `src/data/site.ts` | `location` e `description` |
| `src/app/layout.tsx` | title default, title do OG, e as 2 keywords com "zona norte" |
| `src/components/sections/hero-section.tsx` | eyebrow e parágrafo de apoio |
| `src/components/layout/site-footer.tsx` | parágrafo institucional |
| `src/app/sobre/page.tsx` | description do metadata |
| `src/app/contato/page.tsx` | description do metadata |
| `src/app/faq/page.tsx` | pergunta e resposta sobre área de atendimento |
| `src/data/practice-areas.ts` | `seoDescription` de imobiliário, previdenciário e trabalhista |

Direção editorial: trocar por "São Paulo" / "capital paulista" sem inventar alcance nacional. A pergunta do FAQ passa a tratar de **atendimento presencial vs. remoto** em vez de recorte de bairro.

Também ajustar `areaServed` no schema (ver T5).

**Aceite:** `grep -rin "zona norte" src README.md` retorna vazio; `npm run build` passa.

**Entregue:** todas as 14 ocorrências removidas. Decisões editoriais tomadas:
- `siteConfig.location` passou a "São Paulo - SP" (aparece no rodapé e em `/contato`)
- Keywords: as duas de "zona norte" viraram "advocacia são paulo" e "escritório de advocacia são paulo", escolhidas para não duplicar a já existente "direito imobiliário são paulo"
- A pergunta do FAQ deixou de tratar de recorte geográfico e passou a tratar de **presencial vs. a distância**, que é a dúvida real de quem está fora da Zona Norte
- Rodapé e `/contato` agora dizem "toda São Paulo"; títulos e OG dizem "Advocacia em São Paulo"

O `areaServed` do schema já apontava para a cidade de São Paulo — nada a corrigir ali.

---

## T3 — Identidade visual e assets ✅

**Lacuna:** `public/` está vazio — sem favicon, logo ou imagem de compartilhamento. O metadata declara `twitter:card = summary_large_image` sem imagem existir, então todo link compartilhado sai com card em branco.

Escopo:
1. **Favicon** — `src/app/icon.svg` + `apple-icon.png` (o App Router resolve automaticamente)
2. **Imagem OG** — gerar via `next/og` em `src/app/opengraph-image.tsx`: fundo petrol, marca em Playfair, tagline. Vantagem sobre PNG estático: acompanha mudanças de marca sem reexportar
3. **OG por página** — variante dinâmica com o título da área/atividade
4. **Logo no header/footer** — se I4 trouxer vetor, substituir o texto atual; senão manter tipográfico e refinar
5. Declarar `openGraph.images` e `icons` no `layout.tsx`

**Aceite:** validação no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) e no preview do WhatsApp renderizando card completo; favicon visível na aba.

**Entregue:** 33 de 33 páginas HTML agora servem `og:image` — antes eram zero. O build passou de 37 para 71 rotas, sendo 34 imagens geradas.

- `src/app/icon.svg` — favicon monograma FB em petrol com filete dourado.
- `src/app/apple-icon.tsx` — 180×180 via `next/og`, em Playfair para bater com o favicon.
- `src/lib/og.tsx` — renderizador compartilhado do card 1200×630: fundo petrol, marca no topo, filete dourado, eyebrow em dourado e título em Playfair. O tamanho do título cai de 76px para 62px acima de 46 caracteres, para não estourar a caixa.
- Um `opengraph-image.tsx` por rota: home, 6 áreas, 22 atividades e as 4 páginas estáticas. Áreas e atividades usam o próprio título, então cada link compartilhado mostra o assunto correto.

Marca tipográfica mantida no header e no rodapé, já que não há logo em vetor (I4). Sem fotografia (I5) — a identidade se apoia em tipografia, cor e composição.

**Duas armadilhas encontradas:**

1. `params` é `Promise` também nas rotas de imagem no Next 15. Acessar `params.areaSlug` direto compila e falha só no prerender.
2. O satori, motor do `next/og`, **não parseia fonte variável**. O `PlayfairDisplay[wght].ttf` do repositório google/fonts quebra com `Cannot read properties of undefined (reading '256')`. A solução foi baixar uma instância estática SemiBold (121 KB) para `src/assets/fonts/`, com a licença OFL ao lado. A fonte fica versionada no repo de propósito: assim o build não depende de acesso ao Google Fonts.

**Nota sobre herança:** no App Router a imagem OG vale só para o segmento onde o arquivo está — não é herdada por rotas irmãs. Por isso `/sobre`, `/faq`, `/contato` e `/politica-de-privacidade` precisaram de arquivo próprio. Página nova sem `opengraph-image.tsx` sai sem card.

---

## T4 — Conformidade com o Provimento 205/2021 (CFOAB) ✅

**Lacuna:** nenhum número de OAB exibido e nenhum aviso de publicidade.

O provimento exige que a publicidade advocatícia seja **informativa e discreta**, veda mercantilização, captação de clientela e promessa de resultado.

**Decisão do cliente (2026-08-04): implementar A e B.** A opção C (bloco de dados em `/contato`) foi descartada — a página segue só com WhatsApp, e-mail e localização.

Onde apresentar:

**a) Rodapé — obrigatório e principal.** Bloco discreto na faixa inferior:
> Fleming & Batista Sociedade de Advogados · OAB/SP nº XXXX
> Advogado responsável: Nome Completo — OAB/SP XXX.XXX

**b) Página `/sobre` — seção de equipe.** Cada advogado com nome, OAB e áreas. É o lugar natural para credibilidade e ajuda no schema `Person`.

**c) Schema.org.** Adicionar `legalName` e `identifier` (registro OAB) ao `LegalService`.

**d) Disclaimer.** O rodapé já traz *"Conteúdo informativo. A atuação profissional depende de análise do caso."* — manter e reforçar na Política de Privacidade.

**Auditoria de linguagem:** varrer o copy atrás de superlativos, promessa de resultado, menção a preço ou termos como "melhor/líder/especialista". Na leitura inicial o texto já está conservador, mas precisa de passada formal.

**Aceite:** OAB visível em todas as páginas via rodapé; checklist do provimento revisado item a item e registrado neste doc.

**Entregue:**
- Advogados centralizados em `lawyers`, em `src/data/site.ts`. Acrescentar alguém é adicionar um objeto ao array — rodapé, `/sobre` e schema absorvem sozinhos.
- Rodapé: razão social + `Advogada Ivani Mazzei Batista — OAB/SP 255.429`, na faixa inferior, ao lado do disclaimer já existente.
- `/sobre`: nova seção "Quem conduz o seu caso", com card por advogado (iniciais, nome, OAB, cargo). Fecha o buraco de a página não ter nenhuma pessoa.
- Schema: `legalName` e `employee[].identifier` com a OAB.

**Pendências:** número de registro da sociedade na OAB/SP e demais advogados. O rodapé hoje exibe a razão social sem número — quando o registro chegar, ele entra ali.

---

## T5 — SEO local completo ✅

**Lacuna:** `LegalService` sem endereço de rua, horário, geo ou perfis; `/faq` sem `FAQPage`.

Escopo em `src/lib/seo.ts`:
- `address` completo (I3), `openingHoursSpecification`, `geo`, `sameAs` (Instagram/LinkedIn), `areaServed` → São Paulo capital
- Incluir `phoneSecondaryDisplay`, hoje ausente do schema
- **`FAQPage` schema** na `/faq` — ganho de rich result com esforço baixo, o conteúdo já existe
- `BreadcrumbList` nas páginas de atividade

Fora do código, mas parte do resultado: criar/reivindicar o **Google Business Profile** — é o que mais move ranqueamento local.

**Aceite:** [Rich Results Test](https://search.google.com/test/rich-results) reconhece `LegalService`, `FAQPage` e `BreadcrumbList` sem erro.

**Entregue:**
- `LegalService` com `legalName`, endereço completo, `openingHoursSpecification` (seg–sex, 14:00–19:30), `employee` e os **dois** telefones (antes só o principal entrava).
- `FAQPage` em `/faq` e `BreadcrumbList` nas rotas de área e atividade, via novo componente `src/components/seo/json-ld.tsx`.
- FAQs extraídas para `src/data/faq.ts`. Estavam duplicadas em dois componentes com conteúdos diferentes: 9 perguntas temáticas na home e 3 sobre atendimento em `/faq`. Agora `/faq` exibe as 12 e carrega o schema, enquanto a home mantém as 9 temáticas como seção de marketing. Um único `FAQPage` canônico, sem schema duplicado entre páginas.

**Bug encontrado e corrigido (anterior a este sprint):** o `layout.tsx` injetava o `LegalService` com `next/script`, cuja estratégia padrão `afterInteractive` só cria a tag após a hidratação. O schema existia apenas dentro do payload RSC, e **nenhuma página servia uma tag `application/ld+json` real no HTML inicial**. Trocado pelo componente `JsonLd`, que renderiza no servidor.

Verificado no HTML gerado:

| Página | Tags `ld+json` no HTML |
| --- | --- |
| `/` | `LegalService` |
| `/faq` | `LegalService` + `FAQPage` |
| `/direito-imobiliario` | `LegalService` + `BreadcrumbList` |
| `/sobre` | `LegalService` |

**Deixado de fora, por decisão:** `geo` (não temos as coordenadas e o Google geocodifica pelo endereço) e `sameAs` (sem perfis sociais informados). Preencher inventando dado seria pior que omitir.

**Fora do código, ainda pendente:** criar/reivindicar o Google Business Profile — é o que mais move ranqueamento local, e agora o endereço do site bate com o que será cadastrado lá.

---

## T6 — Analytics e medição de conversão

**Lacuna:** impossível medir quantas visitas viram conversa no WhatsApp.

**Decisão: Vercel Web Analytics**, não GA4. Motivo: é cookieless e sem fingerprint, então **não exige banner de consentimento** nem reescrita da política de privacidade — que é exatamente o cenário que a política atual antecipa. Custo de integração: uma linha. GA4 traria mais recursos ao preço de banner de cookies e atrito de conversão, o que não se paga num site de 37 páginas cujo único objetivo é o clique no WhatsApp.

Escopo:
- `@vercel/analytics` e `@vercel/speed-insights` no `layout.tsx`
- Evento customizado em cada clique de WhatsApp, com origem (`header`, `hero`, `cta`, `flutuante`, `formulário`), centralizado em `src/utils/whatsapp.ts`
- Documentar as métricas do sprint: sessões, taxa de clique no WhatsApp, área mais visitada

**Aceite:** eventos aparecendo no painel da Vercel; nenhum banner de cookie necessário; atualizar a Política de Privacidade mencionando analytics anônimo.

---

## T7 — Unificar as páginas de área numa rota dinâmica ✅

**Lacuna:** 6 arquivos wrapper idênticos de 15 linhas. Adicionar uma área hoje exige criar mais um arquivo à mão.

Substituir `src/app/{direito-imobiliario,direito-civil,...}/page.tsx` por um único `src/app/[areaSlug]/page.tsx` com `generateStaticParams` e `dynamicParams = false`. Rotas estáticas (`/sobre`, `/faq`, `/contato`, `/politica-de-privacidade`) têm precedência sobre o segmento dinâmico no App Router, então não há conflito.

**Aceite:** as 6 URLs continuam SSG no output do build; `/rota-inexistente` retorna 404; `npm run build` mantém 37 páginas.

**Entregue:** 6 arquivos (90 linhas) substituídos por `src/app/[areaSlug]/page.tsx` (44 linhas). Build mantém 37 páginas, com as 6 áreas listadas como SSG sob `● /[areaSlug]`.

Verificado no servidor de produção (`next start`):

| Rota | Status |
| --- | --- |
| `/`, `/sobre`, `/faq`, `/contato` | 200 — rotas estáticas têm precedência, sem conflito |
| `/direito-imobiliario`, `/trabalhista` | 200 |
| `/direito-imobiliario/usucapiao-e-posse` | 200 |
| `/rota-inexistente`, `/nao-existe-mesmo` | 404 |

Nota de manutenção: `npm run typecheck` falha se rodado logo após deletar rotas, porque `.next/types` fica obsoleto. Rodar `npm run build` antes do typecheck, ou limpar `.next`.

---

## T8 — Blog / central de conteúdo

**Lacuna:** maior alavanca de tráfego orgânico não explorada.

Sprint 01 entrega a **fundação**, não o volume de artigos:
- Tipo `Article` e rota `/artigos` + `/artigos/[slug]`
- Fonte em MDX (`content/artigos/*.mdx`) para o cliente escrever sem tocar em componente
- Schema `Article` + `author` vinculado ao advogado (reforça E-E-A-T, que pesa em conteúdo jurídico)
- Entrada no sitemap e no rodapé
- 2 artigos-semente ligados ao carro-chefe imobiliário, ex.: "Documentos necessários para regularizar um imóvel" e "O que verificar antes de assinar um contrato de compra e venda"

Meta sugerida pós-sprint: 2 artigos/mês, sempre respondendo dúvida real de cliente.

**Aceite:** `/artigos` lista os posts, cada post renderiza com schema `Article` válido e aparece no sitemap.

---

## Ordem sugerida de execução

Agrupada por dependência e por quanto destrava o resto:

1. **T1 + T2** — decisões de marca e posicionamento. Tudo que vier depois herda esse texto, então mexer antes evita retrabalho.
2. **T7** — refactor estrutural. Feito antes de T3/T8 para que as novas páginas já nasçam no formato final.
3. **T5 + T4** — SEO e compliance andam juntos (ambos tocam `seo.ts` e rodapé).
4. **T3** — identidade visual, depois que a marca está congelada.
5. **T6** — analytics, para começar a medir com o site já ajustado.
6. **T8** — blog, a peça de maior fôlego.

## Validação do sprint

```bash
npm run typecheck && npm run lint && npm run build
```

Baseline em `80d3d00`: os três passam limpos, 37 páginas estáticas geradas. Nenhuma tarefa pode regredir isso.
