# Sprints de publicação do Assistente virtual

Plano iniciado em 17 de novembro de 2026.

Cada sprint termina com apresentação da entrega e pedido de autorização. Após a confirmação do usuário, executar o commit, enviar a branch e fazer o deploy no ambiente previsto para aquela sprint. Conferir o resultado publicado antes de iniciar a próxima sprint.

O repositório é SITE-DIREITO e a branch de trabalho é codex/chatbot-juridico. A configuração local da Vercel aponta para o projeto site-direito. O destino remoto e suas variáveis precisam ser conferidos antes do deploy.

| Sprint                                   | Entrega e ações                                                                                                                                                                                                                                               | Verificação de aceite                                                                                        | Deploy após autorização                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| 1 — Preparação do código                 | Consolidar a implementação existente, conferir os arquivos do commit, proteger credenciais e saídas temporárias, atualizar instruções e executar testes, lint, tipos e build                                                                                  | Arquivos identificados, verificações aprovadas e pacote pronto para publicar                                 | Prévia técnica na Vercel para conferir o build e as páginas. A ativação do chat depende das variáveis da sprint 2 |
| 2 — Chat em prévia pública               | Configurar OpenAI e Supabase de homologação no ambiente Preview, origem exata e segredo de sessão. Habilitar o chat. Conferir as sete áreas, perguntas, continuações e acesso pelo celular                                                                    | Conversa com fonte oficial, contexto e atendimento humano funcionando na URL de prévia                       | Prévia funcional com o banco de homologação                                                                       |
| 3 — Conteúdo e privacidade               | Apresentar as 95 respostas e os critérios de encaminhamento para revisão do escritório. Registrar as correções aprovadas. Revisar política de privacidade, mensagens de urgência e regras de retenção dos pedidos                                             | Conteúdo e decisões de privacidade revisados pelo responsável, com as correções aplicadas e verificadas      | Prévia com o conteúdo revisado                                                                                    |
| 4 — Atendimento e preparação de produção | Confirmar domínio e contatos. Preparar o banco e as migrações para produção. Configurar contas da equipe e MFA. Se o e-mail for habilitado, configurar remetente autenticado, destinatário, fila e webhook permanente do Resend. Validar os canais escolhidos | Testes completos dos canais habilitados, perfis de acesso e notificações. Configuração de produção conferida | Prévia com as integrações aprovadas e produção preparada                                                          |
| 5 — Publicação                           | Conferir a versão e as variáveis finais. Fazer a rodada final de verificação. Apresentar a versão para autorização de produção. Após autorização, publicar, verificar pelo domínio e conferir a reversão disponível                                           | Chat, fontes, encaminhamento e acesso móvel funcionando no domínio público                                   | Produção                                                                                                          |

## Sprint 1

Estado em 17 de novembro de 2026. Preparação concluída. O usuário autorizou o commit, o envio da branch e o deploy em prévia técnica. Após a publicação, conferir o endereço gerado e o resultado do build.

A entrega reúne o chatbot desenvolvido nas etapas anteriores, com 95 perguntas nas sete áreas, triagem contextual, encaminhamento humano, formulário de atendimento, painel e integrações já implementadas.

Os arquivos para o primeiro commit compreendem as alterações existentes em .env.example, .gitignore, eslint.config.mjs, next.config.ts, package.json, package-lock.json, tsconfig.json, src/app/layout.tsx, src/app/politica-de-privacidade/page.tsx, src/app/robots.ts e src/components/seo/json-ld.tsx. Incluem também .vercelignore, playwright.config.ts, src/components/analytics/public-metrics.tsx e os arquivos do chatbot em src/app/admin, src/app/api, src/components/chat, src/lib/chat, src/server/chat, supabase/migrations, tests e docs/chatbot.

A seleção deve ser explícita e conferida no diff preparado para o commit. Os arquivos de ambiente local, o documento de credenciais e as saídas temporárias estão nas regras de exclusão do Git e do upload pela CLI da Vercel.

A primeira prévia serve para verificar o pacote publicado. Na sprint 2, a configuração do ambiente Preview permite habilitar a conversa e testar pelo endereço público.

Foram aprovados os 118 testes locais, o lint, a checagem de tipos e o build de produção. Os nove testes de navegador passaram no Microsoft Edge, incluindo seleção de área, tela de 320 px, resposta da API de demonstração e encaminhamento humano.

A consulta remota pelo conector da Vercel falhou ao estabelecer a conexão. Conferir o projeto, o destino Preview e as variáveis remotas ao recuperar o acesso, antes de enviar a branch e publicar.

## Revisão periódica

Os resumos jurídicos da base atual têm revisão prevista até 12 de dezembro de 2026. O código deixa de usar os resumos depois dessa data. A revisão deve atualizar o conteúdo e o período de validade antes do vencimento.
