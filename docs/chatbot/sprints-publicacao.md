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

Estado em 19 de novembro de 2026. Sprint concluída e publicada após autorização do usuário. Commit 9241372ff717c47671c40d371675e83698e77b6b enviado para a branch codex/chatbot-juridico. O deploy dpl_H8bQGXXaXGsduUjCVr5pv3JhKqxn ficou Ready no ambiente Preview.

A [prévia da branch](https://site-direito-git-codex-chatb-1006ad-joaomazzei98-7432s-projects.vercel.app/) e o endereço imutável foram conferidos no navegador autenticado. As sete áreas responderam com fontes, a continuação sobre renda de autônomo manteve contexto e um pedido de cálculo individual explicou a regra geral antes do acesso ao contato humano. Telas de 393 e 320 px foram simuladas. A prévia exige autenticação da Vercel. O acesso em aparelho celular físico ainda depende de conferência pelo usuário.

Preparação do chat para o ambiente Preview da branch codex/chatbot-juridico. As chaves já configuradas para OpenAI e Supabase de homologação foram reunidas em .env.preview.local, um arquivo ignorado pelo Git e pelo upload. O projeto de banco de teste foi conferido e foi gerado um segredo de sessão próprio para a prévia.

O servidor passa a aceitar as duas origens exatas fornecidas pela Vercel no ambiente Preview, quando CHATBOT_SITE_ORIGIN estiver vazio. Uma origem configurada explicitamente continua tendo precedência. O ambiente de produção exige a origem configurada. O comportamento e o bloqueio de origens externas têm teste de regressão.

Os 119 testes locais, o lint, a checagem de tipos e o build com o chat habilitado passaram. O projeto Supabase de homologação estava pausado e foi retomado pelo painel, com a restauração acompanhada até a confirmação de conclusão. A OpenAI respondeu à classificação real de uma pergunta sobre documentos para locação.

Após a retomada, uma pergunta de cada uma das sete áreas recebeu resposta com a fonte esperada e sem encaminhamento obrigatório no servidor local com OpenAI e Supabase reais. A origem externa foi recusada. No navegador local, foram conferidos os sete botões de área, documentos para locação, continuação sobre trabalho autônomo, telas de 393 e 320 px e encaminhamento para a página de contato em um pedido de cálculo individual. Nenhum erro de JavaScript foi registrado.

A configuração aplicada compreende CHATBOT_ENABLED=1, CHATBOT_MODE=live, CHATBOT_SIGNING_SECRET, OPENAI_API_KEY, OPENAI_MODEL, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY e SUPABASE_SERVICE_KEY. CHATBOT_ADMIN_ENABLED, CHATBOT_HANDOFF_ENABLED e CHATBOT_EMAIL_ENABLED ficam em 0 nesta etapa. CHATBOT_SITE_ORIGIN fica vazio para usar as origens do Preview.

As 11 variáveis foram guardadas como Secret somente no ambiente Preview e na branch codex/chatbot-juridico. Nenhuma configuração de produção foi alterada.

## Sprint 3

Estado em 19 de novembro de 2026. O usuário autorizou o commit e o deploy desta sprint em Preview para revisão do escritório. A publicação e a conferência do ambiente serão executadas com essa autorização. A revisão jurídica institucional e as decisões de privacidade permanecem pendentes do responsável. A autorização de publicação da prévia não equivale a essa aprovação.

O [caderno de revisão](revisao-sprint3.html) reúne as 95 respostas nas sete áreas, cada uma com sua fonte e condição de encaminhamento, além da matriz de dados, proposta de retenção e pontos que precisam do escritório. O comando npm run review:chatbot gera esse arquivo e os dois documentos de FAQ a partir do mesmo catálogo. O modo --check verifica se os documentos continuam sincronizados. A validade original até 12 de dezembro foi preservada, sem prorrogação automática.

O usuário escolheu preparar a proposta de exclusão em 90 dias após o encerramento de pedidos sem contratação. A proposta está no caderno e não foi ativada. Não foram apagados registros nem modificadas migrações. Antes da implementação, definir registro confiável de encerramento, contratação, conservação excepcional, auditoria e autorização, além dos ciclos de backup e dos provedores.

A política de privacidade descreve a pergunta e até quatro trocas recentes enviadas à OpenAI, a filtragem limitada de identificadores, a sessão, os pedidos confirmados, os provedores e o canal de direitos do titular. O link da política permanece disponível durante a conversa e abre em outra aba. O aviso de atendimento passou para atendimento-v2 e exige nova revisão para confirmações da versão anterior. Mensagens urgentes esclarecem que o chat não monitora emergências nem suspende prazos.

A filtragem passou a cobrir também CNPJ, número de processo no padrão CNJ, CEP e identificadores rotulados como RG, passaporte e NIS. O formulário rejeita esses identificadores no resumo, mantendo o campo próprio de contato. As duas chamadas à IA e todo o contexto recente têm verificação da remoção. A filtragem não reconhece todos os nomes, documentos ou relatos sensíveis e não promete anonimização.

As 52 URLs distintas do catálogo foram consultadas. Houve 46 respostas HTTP 200 e seis HTTP 403 na Câmara dos Deputados. Os bloqueios da consulta direta não foram tratados como revogação da norma. As páginas da Lei do Inquilinato, CDC e CLT ficaram disponíveis pela pesquisa web. A disponibilidade de uma URL não atesta a correção jurídica de cada resumo. Foram conferidos também o material de locação do Procon-SP, a Resolução CNJ 35 e alterações, orientação de cidadania italiana e portuguesa e documentação dos provedores. A referência de locação foi direcionada à página SAC do Procon-SP, que contém as perguntas pertinentes.

Os 136 testes locais e os dez testes de navegador passaram. Lint, tipos e sincronização do caderno passaram. O build com o chat habilitado foi conferido. Uma verificação visual adicional no Edge passou, com capturas da abertura e urgência em 320 px e do caderno em 320 e 1280 px, 95 itens no documento, sem transbordamento horizontal nem erros de JavaScript. Esses testes de navegador usam o modo de demonstração e serviços simulados. Não houve nova rodada de conversa com a IA real nesta sprint.

A tentativa de abrir um servidor local com as credenciais de homologação foi bloqueada pela revisão automática com a mensagem blocked by policy. A conferência visual foi concluída pelo servidor de demonstração do Playwright, sem serviços externos. A verificação global de formatação aponta 54 arquivos anteriores à sprint. A formatação dos arquivos desta entrega foi conferida separadamente, sem alteração dos demais arquivos do site. O fechamento desta sprint depende da revisão do escritório e da autorização do usuário para commit e deploy em Preview.

## Revisão periódica

Os resumos jurídicos da base atual têm revisão prevista até 12 de dezembro de 2026. O código deixa de usar os resumos depois dessa data. A revisão deve atualizar o conteúdo e o período de validade antes do vencimento.
