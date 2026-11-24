# Sprints de publicação do Assistente virtual

Plano iniciado em 17 de novembro de 2026.

Cada sprint termina com apresentação da entrega e pedido de autorização. Após a confirmação do usuário, executar o commit, enviar a branch e fazer o deploy no ambiente previsto para aquela sprint. Conferir o resultado publicado antes de iniciar a próxima sprint.

Em 19 de novembro de 2026, o usuário pediu implementar as sprints restantes antes de validar juridicamente as respostas. A revisão do conteúdo passa para depois da implementação. Isso não registra aprovação jurídica das FAQs nem altera a autorização ao final de cada sprint para commit e deploy. A publicação de produção continua sendo uma ação separada, apresentada com o destino e a configuração concretos.

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

Estado em 19 de novembro de 2026. Implementação publicada após autorização, no commit 65a7b8f5f9d22f3a912e7c246f6e83c07384e389. O deploy dpl_6rdj9iFXvkqQ3dySEUQVua1iSDDn ficou Ready em Preview, com build de 49 segundos. A resposta de documentos para locação, a continuação sobre renda de autônomo, o aviso de urgência, o contato humano e o acesso à política sem perder a conversa foram conferidos no ambiente publicado. A tela de 320 px e o endereço estável da branch também foram conferidos, sem erros de JavaScript observados. A revisão jurídica institucional permanece pendente e foi adiada pelo usuário.

O [caderno de revisão](revisao-sprint3.html) reúne as 95 respostas nas sete áreas, cada uma com sua fonte e condição de encaminhamento, além da matriz de dados, proposta de retenção e pontos que precisam do escritório. O comando npm run review:chatbot gera esse arquivo e os dois documentos de FAQ a partir do mesmo catálogo. O modo --check verifica se os documentos continuam sincronizados. A validade original até 12 de dezembro foi preservada, sem prorrogação automática.

O usuário escolheu preparar a proposta de exclusão em 90 dias após o encerramento de pedidos sem contratação. A proposta está no caderno e não foi ativada. Não foram apagados registros nem modificadas migrações. Antes da implementação, definir registro confiável de encerramento, contratação, conservação excepcional, auditoria e autorização, além dos ciclos de backup e dos provedores.

A política de privacidade descreve a pergunta e até quatro trocas recentes enviadas à OpenAI, a filtragem limitada de identificadores, a sessão, os pedidos confirmados, os provedores e o canal de direitos do titular. O link da política permanece disponível durante a conversa e abre em outra aba. O aviso de atendimento passou para atendimento-v2 e exige nova revisão para confirmações da versão anterior. Mensagens urgentes esclarecem que o chat não monitora emergências nem suspende prazos.

A filtragem passou a cobrir também CNPJ, número de processo no padrão CNJ, CEP e identificadores rotulados como RG, passaporte e NIS. O formulário rejeita esses identificadores no resumo, mantendo o campo próprio de contato. As duas chamadas à IA e todo o contexto recente têm verificação da remoção. A filtragem não reconhece todos os nomes, documentos ou relatos sensíveis e não promete anonimização.

As 52 URLs distintas do catálogo foram consultadas. Houve 46 respostas HTTP 200 e seis HTTP 403 na Câmara dos Deputados. Os bloqueios da consulta direta não foram tratados como revogação da norma. As páginas da Lei do Inquilinato, CDC e CLT ficaram disponíveis pela pesquisa web. A disponibilidade de uma URL não atesta a correção jurídica de cada resumo. Foram conferidos também o material de locação do Procon-SP, a Resolução CNJ 35 e alterações, orientação de cidadania italiana e portuguesa e documentação dos provedores. A referência de locação foi direcionada à página SAC do Procon-SP, que contém as perguntas pertinentes.

Os 136 testes locais e os dez testes de navegador passaram. Lint, tipos e sincronização do caderno passaram. O build com o chat habilitado foi conferido. Uma verificação visual adicional no Edge passou, com capturas da abertura e urgência em 320 px e do caderno em 320 e 1280 px, 95 itens no documento, sem transbordamento horizontal nem erros de JavaScript. Os testes locais de navegador usam o modo de demonstração e serviços simulados. Após a publicação, perguntas de locação e continuação também foram conferidas com a IA real, conforme registrado no estado da sprint.

A tentativa de abrir um servidor local com as credenciais de homologação foi bloqueada pela revisão automática com a mensagem blocked by policy. A conferência visual local foi concluída pelo servidor de demonstração do Playwright, sem serviços externos. A verificação global de formatação apontou 54 arquivos anteriores à sprint. A formatação dos arquivos da entrega foi conferida separadamente. O commit e o deploy em Preview foram autorizados e concluídos. A revisão jurídica foi adiada a pedido do usuário.

## Sprint 4 — preparação técnica

Em 20 de novembro de 2026, o usuário autorizou o commit e o deploy da preparação técnica desta etapa no ambiente Preview. A publicação e a conferência serão executadas com essa autorização. Foi corrigida a criação do Request das ações do painel para aceitar CHATBOT_SITE_ORIGIN vazio no Preview da Vercel. O bloqueio de origens externas e a exigência de origem configurada em produção permanecem. Toda a equipe passa a precisar de segundo fator, incluindo atendentes e advogados.

O painel da Vercel confirmou www.flemingbatista.com.br com configuração válida e atribuição a Production. O código e os modelos de ambiente usam esse domínio como canônico. O usuário escolheu WhatsApp e painel da equipe para o lançamento, sem notificações por e-mail. O WhatsApp mantém o número já usado pelo site, 5511973508868. A configuração de Resend, remetente, destinatário, webhook e agendamento de e-mail fica fora desta etapa.

O painel Supabase mostrou fleming-batista-homologacao e um projeto de outra aplicação, rachar, pausado. Não foi identificado banco de produção para este site. O outro projeto não foi alterado. O Resend abriu sem sessão autenticada. As credenciais locais encontradas são de homologação. Não foi criado projeto, alterada senha, emitida credencial, enviada notificação ou aplicada migração externa nesta preparação.

O comando npm run prepare:database monta .tools/banco-producao.sql com as três migrações existentes, seus resumos SHA-256 e uma transação única para um banco novo e vazio. Não inclui contatos, contas, fontes sintéticas ou credenciais e não executa o SQL. O pacote foi testado em PostgreSQL descartável, incluindo o enum de Cidadania, tabelas vazias e bloqueio de leitura pelos papéis públicos.

O modelo .env.production.example explicita a origem HTTPS, painel, atendimento e o canal WhatsApp. O e-mail fica desativado conforme a escolha do usuário. O primeiro administrador ainda será decidido pelo escritório. Nenhuma conta foi criada em nome de uma pessoa não indicada. O cadastro e o autenticador real deverão ser conferidos no projeto de destino antes de ativar o recebimento de pedidos no painel. A prévia publicada continua usando o contato existente, com os controles de painel e pedidos armazenados desativados até a preparação operacional ser autorizada e concluída.

Os 145 testes locais passaram e os 11 cenários de navegador foram conferidos, com serviços externos simulados. O fluxo de WhatsApp exige revisão e confirmação, gera uma única solicitação mesmo em reenvio e inclui somente o protocolo no link. A opção de e-mail não é exibida quando desativada, e o processador de e-mails fica indisponível mesmo com credenciais antigas presentes. O teste de navegador não abre o WhatsApp nem envia mensagens. Lint, tipos e build com chat habilitado passaram. A primeira tentativa de build esbarrou na cadeia de certificados ao buscar as fontes Google. A execução com NODE_USE_SYSTEM_CA=1 usou as autoridades do sistema e concluiu, sem desativar a verificação TLS. Nenhuma integração real nova foi ativada nesta etapa.

## Sprint 5 — preparação da publicação

Implementação da checagem de configuração e roteiro de publicação preparada localmente. Não houve merge na main, alteração de variáveis de produção ou publicação no domínio público.

O comando npm run check:release lê um arquivo .local explicitamente informado e imprime apenas o resultado das checagens, sem valores de variáveis. Produção exige origem canônica, URL pública consistente, banco diferente da homologação, segredo de sessão independente, controles explícitos e configuração compatível dos canais. Se e-mail estiver habilitado, verifica dependências, remetente e destinatário fora do modo de teste, assinatura do webhook e segredo da fila. Verificações de contas reais, migrações aplicadas, entregas, autorização e conteúdo ficam identificadas separadamente como manuais. configurationValid não atesta prontidão operacional ou aprovação jurídica.

A configuração atual de Preview passou na checagem. A configuração de produção ainda não existe e não foi inventada. A próxima execução em Preview e o teste de canais reais dependem do fechamento operacional da sprint 4. Após a autorização de produção, a sprint 5 deve usar o roteiro em operacao.md para publicar o commit aprovado e conferir a reversão.

## Preparação operacional — 24 de novembro de 2026

Com autorização do usuário, o projeto fleming-batista-producao (inrzwodhofxkznfibdtd, sa-east-1) foi criado em 23 de novembro. As três migrações foram aplicadas pelo conector Supabase, com versões remotas e correspondência local registradas em operacao.md. Não reaplicar o pacote para banco vazio nem usar db push antes de reconciliar esses históricos. Homologação e rachar não foram alterados.

As duas contas indicadas pelo usuário têm perfis de administrador ativos. As senhas foram definidas manualmente fora do chat. O cadastro público foi desativado e TOTP está habilitado; os dois autenticadores e o primeiro acesso ainda precisam de validação. Dados pessoais e identificadores das contas permanecem em arquivos locais ignorados.

A conferência de 24 de novembro encontrou dez tabelas com RLS, nenhuma permissão SELECT para anon ou authenticated e zero pedidos. A chamada real à Data API com a chave publicável de produção confirmou o bloqueio de leitura de perfis (HTTP 401, permissão negada). Isso não substitui a validação das operações do servidor com a chave secreta correta.

Os 145 testes, os 11 cenários de navegador no Edge, lint, tipos e a sincronização do caderno passaram novamente. O build com o chat habilitado também passou, usando NODE_USE_SYSTEM_CA=1. Os testes de navegador usam demonstração e integrações simuladas. Em seguida, duas perguntas gerais, sobre documentos para locação e conceito de FGTS, foram verificadas com a OpenAI real e a busca no banco de produção. Ambas tiveram resposta com fonte e sem encaminhamento humano obrigatório. Essa amostra confirma a integração nesses casos, sem substituir avaliação ampla ou revisão jurídica. Nenhum pedido foi gravado e nenhuma mensagem foi enviada a pessoas.

O usuário confirmou o armazenamento das credenciais em .env.production.local, ignorado pelo Git e pela Vercel. Foram preenchidos o domínio canônico, WhatsApp, URL e chaves do banco correto, a chave OpenAI existente e um novo segredo independente de sessão. Não foi emitida uma nova chave dos provedores. A conexão real de servidor confirmou os dois administradores ativos e a checagem de configuração de produção passou. Isso não atesta login com MFA, backup, autorização de publicação ou validação do site publicado. O e-mail permanece desativado.

O usuário autorizou o login da ferramenta local da Vercel pelo celular. O CLI confirmou o projeto site-direito, prj_AuAOt9gUnbZtFBde9l1xcVW2V8su, do time joaomazzei98-7432s-projects. Não há variáveis configuradas no ambiente Production. O domínio www.flemingbatista.com.br continua no deploy Ready dpl_Y99DQ3So8BJhRSBk1TCSrBHRy29P, URL site-direito-dk5pmzv9j-joaomazzei98-7432s-projects.vercel.app, do commit ca5cadaaab49b147f38ab49157f10587e8923960, registrado para reversão. A implementação candidata permanece no commit c4486068c9339db6572fd7f8d1a6522b088b7527, com a atualização documental local desta preparação.

Como o usuário pediu continuar antes da configuração dos autenticadores, a publicação mantém CHATBOT_ENABLED=1, CHATBOT_MODE=live e CHATBOT_ADMIN_ENABLED=1, com CHATBOT_HANDOFF_ENABLED=0 e CHATBOT_EMAIL_ENABLED=0. O chat usa a IA e oferece o contato existente pelo WhatsApp; o login permite que os titulares configurem o segundo fator, e o acesso aos dados continua exigindo MFA. O formulário de pedidos armazenados só deverá ser habilitado depois de validar os acessos e a operação da fila. A checagem local passou com essa configuração.

Após a apresentação desse escopo, o usuário autorizou explicitamente o commit, a configuração das credenciais em Production na Vercel e a publicação em www.flemingbatista.com.br. A publicação usará o fluxo Git da main. Esta autorização não habilita o formulário, o envio de e-mails nem dispensa MFA para acessar dados do painel. Registrar o resultado do deploy e das verificações públicas no fechamento da publicação.

## Revisão periódica

Os resumos jurídicos da base atual têm revisão prevista até 12 de dezembro de 2026. O código deixa de usar os resumos depois dessa data. A revisão deve atualizar o conteúdo e o período de validade antes do vencimento.
