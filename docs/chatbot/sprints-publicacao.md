# Sprints de publicação do Assistente virtual

Plano iniciado em 17 de novembro de 2026.

Cada sprint termina com apresentação da entrega e pedido de autorização. Após a confirmação do usuário, executar o commit, enviar a branch e fazer o deploy no ambiente previsto para aquela sprint. Conferir o resultado publicado antes de iniciar a próxima sprint.

O repositório é SITE-DIREITO e a branch de trabalho é codex/chatbot-juridico. A configuração local da Vercel aponta para o projeto site-direito. O painel confirmou o vínculo com esse repositório e a branch main para produção.

| Sprint                                   | Entrega e ações                                                                                                                                                                                                                                               | Verificação de aceite                                                                                        | Deploy após autorização                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| 1 — Preparação do código                 | Consolidar a implementação existente, conferir os arquivos do commit, proteger credenciais e saídas temporárias, atualizar instruções e executar testes, lint, tipos e build                                                                                  | Arquivos identificados, verificações aprovadas e pacote pronto para publicar                                 | Prévia técnica na Vercel para conferir o build e as páginas. A ativação do chat depende das variáveis da sprint 2 |
| 2 — Chat em prévia pública               | Configurar OpenAI e Supabase de homologação no ambiente Preview, origem exata e segredo de sessão. Habilitar o chat. Conferir as sete áreas, perguntas, continuações e acesso pelo celular                                                                    | Conversa com fonte oficial, contexto e atendimento humano funcionando na URL de prévia                       | Prévia funcional com o banco de homologação                                                                       |
| 3 — Conteúdo e privacidade               | Apresentar as 95 respostas e os critérios de encaminhamento para revisão do escritório. Registrar as correções aprovadas. Revisar política de privacidade, mensagens de urgência e regras de retenção dos pedidos                                             | Conteúdo e decisões de privacidade revisados pelo responsável, com as correções aplicadas e verificadas      | Prévia com o conteúdo revisado                                                                                    |
| 4 — Atendimento e preparação de produção | Confirmar domínio e contatos. Preparar o banco e as migrações para produção. Configurar contas da equipe e MFA. Se o e-mail for habilitado, configurar remetente autenticado, destinatário, fila e webhook permanente do Resend. Validar os canais escolhidos | Testes completos dos canais habilitados, perfis de acesso e notificações. Configuração de produção conferida | Prévia com as integrações aprovadas e produção preparada                                                          |
| 5 — Publicação                           | Conferir a versão e as variáveis finais. Fazer a rodada final de verificação. Apresentar a versão para autorização de produção. Após autorização, publicar, verificar pelo domínio e conferir a reversão disponível                                           | Chat, fontes, encaminhamento e acesso móvel funcionando no domínio público                                   | Produção                                                                                                          |

## Sprint 1

Estado em 17 de novembro de 2026. Sprint concluída e publicada após autorização do usuário. Commit 54b805aecdbc5ab7150684e87c851a98a8560877 enviado para codex/chatbot-juridico.

O deploy 5RBKKSbikb6YSuwCaRxJJ9t8QRpM ficou Ready e a página inicial foi conferida no navegador. A [prévia técnica](https://site-direito-hhac5quoy-joaomazzei98-7432s-projects.vercel.app/) exige autenticação da Vercel e o chat depende da ativação na sprint 2.

A entrega reúne o chatbot desenvolvido nas etapas anteriores, com 95 perguntas nas sete áreas, triagem contextual, encaminhamento humano, formulário de atendimento, painel e integrações já implementadas.

Os arquivos para o primeiro commit compreendem as alterações existentes em .env.example, .gitignore, eslint.config.mjs, next.config.ts, package.json, package-lock.json, tsconfig.json, src/app/layout.tsx, src/app/politica-de-privacidade/page.tsx, src/app/robots.ts e src/components/seo/json-ld.tsx. Incluem também .vercelignore, playwright.config.ts, src/components/analytics/public-metrics.tsx e os arquivos do chatbot em src/app/admin, src/app/api, src/components/chat, src/lib/chat, src/server/chat, supabase/migrations, tests e docs/chatbot.

A seleção deve ser explícita e conferida no diff preparado para o commit. Os arquivos de ambiente local, o documento de credenciais e as saídas temporárias estão nas regras de exclusão do Git e do upload pela CLI da Vercel.

A primeira prévia serve para verificar o pacote publicado. Na sprint 2, a configuração do ambiente Preview permite habilitar a conversa e testar pelo endereço público.

Foram aprovados os 118 testes locais, o lint, a checagem de tipos e o build de produção. Os nove testes de navegador passaram no Microsoft Edge, incluindo seleção de área, tela de 320 px, resposta da API de demonstração e encaminhamento humano.

A consulta remota pelo conector falhou e a autenticação da CLI estava expirada. O acesso foi recuperado pelo painel. O deploy automático da branch foi acompanhado até concluir, com o commit e o ambiente Preview conferidos. O painel de variáveis estava vazio.

## Sprint 2

Estado em 19 de novembro de 2026. O usuário autorizou o commit, a configuração das chaves já salvas no Preview da branch codex/chatbot-juridico e o deploy da sprint 2. Após a publicação, conferir o chat pelo endereço HTTPS.

Preparação do chat para o ambiente Preview da branch codex/chatbot-juridico. As chaves já configuradas para OpenAI e Supabase de homologação foram reunidas em .env.preview.local, um arquivo ignorado pelo Git e pelo upload. O projeto de banco de teste foi conferido e foi gerado um segredo de sessão próprio para a prévia.

O servidor passa a aceitar as duas origens exatas fornecidas pela Vercel no ambiente Preview, quando CHATBOT_SITE_ORIGIN estiver vazio. Uma origem configurada explicitamente continua tendo precedência. O ambiente de produção exige a origem configurada. O comportamento e o bloqueio de origens externas têm teste de regressão.

Os 119 testes locais, o lint, a checagem de tipos e o build com o chat habilitado passaram. O projeto Supabase de homologação estava pausado e foi retomado pelo painel, com a restauração acompanhada até a confirmação de conclusão. A OpenAI respondeu à classificação real de uma pergunta sobre documentos para locação.

Após a retomada, uma pergunta de cada uma das sete áreas recebeu resposta com a fonte esperada e sem encaminhamento obrigatório no servidor local com OpenAI e Supabase reais. A origem externa foi recusada. No navegador local, foram conferidos os sete botões de área, documentos para locação, continuação sobre trabalho autônomo, telas de 393 e 320 px e encaminhamento para a página de contato em um pedido de cálculo individual. Nenhum erro de JavaScript foi registrado.

A configuração a aplicar depois da autorização compreende CHATBOT_ENABLED=1, CHATBOT_MODE=live, CHATBOT_SIGNING_SECRET, OPENAI_API_KEY, OPENAI_MODEL, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY e SUPABASE_SERVICE_KEY. CHATBOT_ADMIN_ENABLED, CHATBOT_HANDOFF_ENABLED e CHATBOT_EMAIL_ENABLED ficam em 0 nesta etapa. CHATBOT_SITE_ORIGIN fica vazio para usar as origens do Preview.

Aplicar essas variáveis somente ao ambiente Preview e à branch codex/chatbot-juridico. Guardar as chaves e o segredo de sessão como valores secretos no servidor. Depois de o usuário autorizar o commit e o deploy, publicar e conferir o chat pelo endereço HTTPS, a seleção das sete áreas, uma pergunta básica, uma continuação, o encaminhamento humano e a tela estreita. O teste pelo endereço público depende dessa publicação. A autenticação da prévia também deve ser conferida no celular.

## Revisão periódica

Os resumos jurídicos da base atual têm revisão prevista até 12 de dezembro de 2026. O código deixa de usar os resumos depois dessa data. A revisão deve atualizar o conteúdo e o período de validade antes do vencimento.
