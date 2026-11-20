# Assistente jurídico da Fleming & Batista

O assistente atende as áreas do site e mantém Direito do Consumidor, que já fazia parte do escopo do chat. Cidadania Europeia cobre procedimentos italianos e portugueses e a documentação relacionada. O chat abre sob demanda. A conversa fica em memória no navegador. O contexto enviado ao servidor contém até quatro pares recentes de pergunta e resposta, além da mensagem atual. O formato anterior, com até duas perguntas, continua aceito pela API.

A escolha de uma das áreas abre uma introdução breve e pede a dúvida do visitante. Essa etapa usa uma resposta local e dispensa a consulta às fontes. A pergunta seguinte segue para a resposta contextualizada e para as referências disponíveis.

## Demonstração local

Use Node.js 24 e execute a instalação com o arquivo de versões do projeto. No terminal do PowerShell, rode:

```powershell
$env:CHATBOT_ENABLED='1'
$env:CHATBOT_MODE='demo'
$env:CHATBOT_SITE_ORIGIN='http://127.0.0.1:3217'
npm run dev -- --hostname 127.0.0.1 --port 3217
```

Abra a página local e escolha **Assistente virtual**. A demonstração usa classificação por regras. Ela não usa o saldo da OpenAI, não grava solicitações e não envia mensagens. Para experimentar a classificação, pergunte “Dúvida sobre a escritura de um imóvel”, “Como pedir cidadania portuguesa?” ou “A audiência é amanhã”.

Execute os testes com npm test, npm run lint e npm run build. Para navegador, instale o Chromium do Playwright ou defina PLAYWRIGHT_CHANNEL=chrome se o Chrome estiver instalado. Execute npm run test:e2e. A migração é executada em um PostgreSQL descartável nos testes, com papéis sintéticos que representam os papéis do Supabase.

## Fluxo com integrações

1. Prepare um projeto Supabase separado para homologação. Revise e aplique a migração em supabase/migrations, habilite MFA TOTP e desabilite o cadastro público. Valide os papéis e os avisos de segurança no painel Supabase.
2. Configure o ambiente conforme .env.example. Guarde OPENAI_API_KEY, SUPABASE_SERVICE_KEY, CHATBOT_SIGNING_SECRET, RESEND_API_KEY, RESEND_WEBHOOK_SECRET e CRON_SECRET apenas no servidor. Use valores aleatórios independentes para assinar sessões e autorizar o processador da fila. CHATBOT_SITE_ORIGIN precisa corresponder à origem exata da aplicação, sem caminho ou barra final.
3. Crie contas de equipe no Supabase Auth e associe cada UUID a um registro em chatbot_admin_profiles, com nome de exibição, perfil e situação ativa. Todos os perfis configuram e verificam o autenticador TOTP antes de acessar os dados. A senha e o código do autenticador são preenchidos pelo próprio titular, fora do chat. Advogados veem somente os pedidos atribuídos a eles. Atendentes podem operar a fila, e apenas administradores podem mudar atribuições.
4. Use CHATBOT_MODE=live e CHATBOT_ENABLED=1 somente no ambiente revisado. Os encaminhamentos, o painel e o e-mail têm controles independentes, desativados por padrão. Alterações de flags em páginas estáticas exigem novo build para atualizar a interface. Os endpoints também verificam as flags no servidor.
5. Para WhatsApp, configure o número confirmado em CHATBOT_WHATSAPP_NUMBER. A URL contém uma mensagem genérica e o protocolo, sem resumo ou telefone do visitante. A pessoa decide se envia. A geração do link não significa abertura nem entrega.
6. Para e-mail, confirme remetente autenticado e destinatário do escritório. Agende a rota GET /api/internal/chat-delivery com o cabeçalho Authorization: Bearer <CRON_SECRET>. Cada chamada processa até uma notificação. Associe /api/delivery-events ao webhook assinado do Resend para os eventos de entrega e falha. A notificação contém somente um link para o painel. Eventos antecipados são conciliados com o identificador do provedor quando o envio é registrado. Se o estado ficar incerto, consulte o provedor antes de reenviar.
7. Cadastre apenas fontes aprovadas com instituição, URL oficial, versão, data de verificação e data de revisão. Administradores podem publicar e retirar notas institucionais pelo painel. Cadastre excertos vinculados a uma área e palavras-chave. A classificação produz termos de busca contextualizados. O servidor recupera até três excertos aprovados dentro da data de revisão e os fornece ao modelo para redigir a resposta. Os links são montados pelo servidor a partir dos registros recuperados. Para perguntas básicas, também consulta o catálogo de conceitos gerais em src/server/chat/basic-knowledge.ts, com 95 perguntas nas sete áreas, fontes oficiais conferidas em 12 de novembro de 2026 e revisão prevista até 12 de dezembro de 2026. A revisão jurídica institucional desses resumos foi adiada pelo usuário para depois da implementação das sprints, sem registro de aprovação. A resposta esclarece a parte geral sustentada pelas referências e oferece Atendimento humano quando há análise individual a fazer. Quando nenhuma fonte responde à dúvida, oferece diretamente esse atendimento. O botão abre o formulário com os canais disponíveis ou a página de contato. O assistente também oferece esse acesso em caso de falha da resposta e bloqueia sugestões de situações fictícias ou cenários hipotéticos. Não há pesquisa externa automática nem upload.

## Persistência e segurança

Em Preview da Vercel, CHATBOT_SITE_ORIGIN pode ficar vazio. O servidor reconhece somente os endereços exatos de VERCEL_URL e VERCEL_BRANCH_URL quando VERCEL=1 e VERCEL_ENV=preview. Uma origem explicitamente configurada tem precedência. Em produção, configure a origem HTTPS canônica em CHATBOT_SITE_ORIGIN. [Variáveis de sistema da Vercel](https://vercel.com/docs/environment-variables/system-environment-variables)

Para a prévia de homologação, configure as variáveis somente em Preview para a branch codex/chatbot-juridico. O arquivo ignorado .env.preview.local contém a preparação local dessa configuração, com o banco de homologação e um segredo de sessão próprio. As chaves foram transferidas para o ambiente Preview da branch após a autorização de publicação da sprint 2.

- Os endpoints públicos verificam origem, tamanho e formato. As sessões expiram após 30 minutos de inatividade e no máximo duas horas. A quantidade de mensagens por conversa, hora, dia ou mês é livre. A criação de sessões, o registro de pedidos e o login têm limites próprios no banco.
- A OpenAI recebe a pergunta atual e o contexto recente com remoção de identificadores óbvios. O formulário de contato segue seu fluxo próprio. A classificação e a redação contextualizada usam duas chamadas com store: false. O tratamento de dados pelo provedor precisa ser revisado antes do uso real.
- A filtragem cobre CPF, CNPJ, telefone, e-mail, CEP, processo no padrão CNJ e identificadores rotulados como RG, passaporte e NIS. Ela não remove todo dado pessoal ou sensível, e não garante anonimização. O formulário rejeita esses identificadores no resumo, preservando seu campo próprio de contato. O aviso atendimento-v2 exige nova revisão para confirmações da versão anterior.
- O pedido exige revisão do conteúdo e confirmação explícita. O comprovante assinado vale por dez minutos, pertence à sessão e fica inválido se o conteúdo mudar. A transação grava pedido, contato, prova de confirmação e estado de encaminhamento uma única vez.
- O banco bloqueia o acesso direto de visitantes e contas autenticadas comuns. O painel verifica a identidade e o perfil em cada operação e registra as alterações. A chave de serviço fica no servidor.
- Uma mensagem comum utiliza até duas chamadas à OpenAI, para classificação e resposta. O controle de gastos pode ser configurado na plataforma da OpenAI.

Para o teste com serviços reais, use o [roteiro de homologação](homologacao.md).

## Pendências antes de publicar

- Verificar a política de privacidade e os prazos de retenção. A limpeza das solicitações, auditoria e backups depende de política aprovada. Não foi configurada exclusão automática de pedidos.
- Validar as mensagens de urgência, revisar juridicamente o catálogo de conceitos básicos e aprovar as fontes jurídicas complementares.
- Revisar o [caderno da sprint 3](revisao-sprint3.html), que apresenta as 95 respostas, critérios de encaminhamento, matriz de dados e proposta de exclusão em 90 dias após encerramento sem contratação. A proposta solicitada pelo usuário não está ativa. Definir fundamento, responsável, registro de encerramento, conservação excepcional e prazos de autorização, auditoria e backups antes de implementar a limpeza. Não usar updated_at como substituto da data de encerramento. Gerar novamente os documentos com npm run review:chatbot e conferir com npm run review:chatbot -- --check.
- Confirmar domínio canônico e contatos. Validar fluxo com Supabase, MFA e provedor de e-mail em homologação com dados fictícios.
- Validar a classificação do modelo em um conjunto representativo. Os testes da demonstração medem as regras locais e não medem a precisão da OpenAI.

## Preparação de produção — sprints 4 e 5

O domínio www.flemingbatista.com.br foi conferido no painel da Vercel em 19 de novembro de 2026. Ele está válido e atribuído a Production no projeto site-direito. A branch de produção é main. As alterações do assistente ficam na branch codex/chatbot-juridico até a autorização de publicação.

A revisão jurídica das 95 respostas foi adiada pelo usuário para depois da implementação das sprints. Manter as fontes e o prazo técnico original, sem registrar aprovação que não ocorreu. A proposta de exclusão em 90 dias também permanece sem execução.

### Banco e contas

Criar ou selecionar um projeto Supabase novo e exclusivo de produção, separado de fleming-batista-homologacao. O painel consultado contém somente esse projeto de teste e rachar, de outra aplicação. Nenhum desses projetos deve ser reaproveitado ou apagado para montar a produção. Confirmar eventuais custos antes de contratar plano ou recurso pago.

Execute npm run prepare:database para gerar .tools/banco-producao.sql. O gerador não se conecta ao Supabase. O SQL contém as três migrações em uma transação única para projeto vazio, sem inserir dados ou perfis. No projeto novo, conferir o destino pelo nome e identificador antes de aplicar o pacote. Depois, verificar tabelas, enum de áreas, RPCs e RLS. Se o SQL Editor for usado, registrar quais versões foram aplicadas e reconciliar o histórico antes de qualquer db push. Não rodar o pacote sobre a homologação existente.

Desativar cadastro público no Supabase Auth, habilitar TOTP e cadastrar apenas as contas autorizadas. Cada titular define a própria senha e configura seu autenticador. Associar o UUID de cada conta ao perfil correto em chatbot_admin_profiles, com active=true. O primeiro administrador e os demais acessos dependem da confirmação do escritório. Não usar metadados editáveis do usuário para conceder perfil. Conferir login, MFA, perfil inativo, separação de pedidos e atribuições no ambiente de destino. [MFA TOTP no Supabase](https://supabase.com/docs/guides/auth/auth-mfa/totp)

### Variáveis e canais

Usar .env.production.example como referência, sem preencher segredos em arquivo versionado. O arquivo local preparado pelo usuário deve terminar em .local e ficar ignorado pelo Git. A publicação exige chaves do projeto correto e um segredo de sessão novo, diferente do Preview. Não transferir automaticamente o arquivo de homologação para Production.

O usuário escolheu WhatsApp e painel da equipe, sem notificações por e-mail, para o lançamento. O número é o existente no site, 5511973508868. Pedidos armazenados exigem painel com equipe habilitada para acompanhar a fila. O primeiro administrador ainda será definido pelo escritório. Manter CHATBOT_EMAIL_ENABLED=0 e não configurar Resend, webhook ou agendamento de e-mail para esse lançamento.

Se o escritório decidir acrescentar e-mail posteriormente, confirmar o endereço de destino e o domínio remetente autenticado no Resend, criar o webhook permanente para /api/delivery-events e agendar /api/internal/chat-delivery com seu segredo independente. O e-mail nunca contém o resumo ou o contato do visitante. Conferir aceite e evento de entrega separadamente.

Não adicionar um cron por minuto à configuração de um projeto Hobby sem conferir a compatibilidade do plano. O painel indica Hobby e a frequência permitida é limitada. Escolher um agendador compatível para o volume esperado, sem contratar serviço por conta própria. A fila já persiste os pedidos e distingue aceito, entregue, falhou e incerto; não reenviar estado incerto sem consultar o provedor. [Limites de cron da Vercel](https://vercel.com/docs/cron-jobs/usage-and-pricing)

### Checagem e publicação

Os comandos abaixo só leem os arquivos indicados e imprimem estados e descrições. Não publicam, não aplicam SQL e não enviam mensagens.

```powershell
npm run check:release -- --environment=preview --env-file=.env.preview.local
npm run check:release -- --environment=production --env-file=.env.production.local --staging-env-file=.env.preview.local
```

configurationValid indica apenas que os valores atendem às regras locais. Itens marcados manual continuam precisando de conferência operacional. A checagem não consulta o provedor para comprovar credenciais válidas, DNS de e-mail, migrações, MFA ou recebimento.

Antes de publicar, executar testes, lint, tipos e build com a configuração correspondente. Apresentar ao usuário o commit, domínio, canais habilitados, banco de destino e pendências. Após a autorização específica de produção, registrar o deploy público atual para reversão, configurar somente as variáveis Production corretas e enviar o commit aprovado à main pelo fluxo Git da Vercel. Não promover o Preview como se ele já tivesse sido testado com credenciais de produção.

Acompanhar o deploy até Ready e conferir, em www.flemingbatista.com.br, sessão, origem HTTPS, respostas com fonte, continuação, urgência, contato humano, política, tela estreita e os canais habilitados. Não enviar pedidos reais de visitantes durante testes técnicos. Conferir login com MFA no painel. Se houver falha material, reverter a publicação para o deploy anterior conferido, sem apagar banco ou pedidos. Uma reversão da aplicação não desfaz migrações nem troca automaticamente segredos. Registrar o resultado da publicação, manter o código aprovado e retomar a revisão das respostas depois.

- Revisar credenciais, limites e monitoramento. Publicar somente após a autorização específica.

Se a OpenAI responder credit_balance_exhausted, consulte a [cobrança da API](https://platform.openai.com/settings/organization/billing). Para experimentos simples, gpt-6-luna pode ser avaliado separadamente. Alterações do modelo precisam de nova avaliação antes da publicação.

## Reversão

Desative primeiro a flag da funcionalidade afetada e volte ao build anterior se necessário. Preserve as solicitações e registros de confirmação. A migração é aditiva. Verifique a fila antes de reativar o envio e não reenvie tentativas incertas sem conferir o provedor.
