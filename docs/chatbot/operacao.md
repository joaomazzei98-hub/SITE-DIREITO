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
3. Crie contas de equipe no Supabase Auth e associe cada UUID a um registro em chatbot_admin_profiles, com nome de exibição, perfil e situação ativa. Administradores configuram e verificam o autenticador no primeiro acesso. Advogados veem somente os pedidos atribuídos a eles. Atendentes podem operar a fila, e apenas administradores podem mudar atribuições.
4. Use CHATBOT_MODE=live e CHATBOT_ENABLED=1 somente no ambiente revisado. Os encaminhamentos, o painel e o e-mail têm controles independentes, desativados por padrão. Alterações de flags em páginas estáticas exigem novo build para atualizar a interface. Os endpoints também verificam as flags no servidor.
5. Para WhatsApp, configure o número confirmado em CHATBOT_WHATSAPP_NUMBER. A URL contém uma mensagem genérica e o protocolo, sem resumo ou telefone do visitante. A pessoa decide se envia. A geração do link não significa abertura nem entrega.
6. Para e-mail, confirme remetente autenticado e destinatário do escritório. Agende a rota GET /api/internal/chat-delivery com o cabeçalho Authorization: Bearer <CRON_SECRET>. Cada chamada processa até uma notificação. Associe /api/delivery-events ao webhook assinado do Resend para os eventos de entrega e falha. A notificação contém somente um link para o painel. Eventos antecipados são conciliados com o identificador do provedor quando o envio é registrado. Se o estado ficar incerto, consulte o provedor antes de reenviar.
7. Cadastre apenas fontes aprovadas com instituição, URL oficial, versão, data de verificação e data de revisão. Administradores podem publicar e retirar notas institucionais pelo painel. Cadastre excertos vinculados a uma área e palavras-chave. A classificação produz termos de busca contextualizados. O servidor recupera até três excertos aprovados dentro da data de revisão e os fornece ao modelo para redigir a resposta. Os links são montados pelo servidor a partir dos registros recuperados. Para perguntas básicas, também consulta o catálogo de conceitos gerais em src/server/chat/basic-knowledge.ts, com 95 perguntas nas sete áreas, fontes oficiais conferidas em 12 de novembro de 2026 e revisão prevista até 12 de dezembro de 2026. Esses resumos aguardam revisão jurídica institucional antes da publicação. A resposta esclarece a parte geral sustentada pelas referências e oferece Atendimento humano quando há análise individual a fazer. Quando nenhuma fonte responde à dúvida, oferece diretamente esse atendimento. O botão abre o formulário com os canais disponíveis ou a página de contato. O assistente também oferece esse acesso em caso de falha da resposta e bloqueia sugestões de situações fictícias ou cenários hipotéticos. Não há pesquisa externa automática nem upload.

## Persistência e segurança

- Os endpoints públicos verificam origem, tamanho e formato. As sessões expiram após 30 minutos de inatividade e no máximo duas horas. A quantidade de mensagens por conversa, hora, dia ou mês é livre. A criação de sessões, o registro de pedidos e o login têm limites próprios no banco.
- A OpenAI recebe a pergunta atual e o contexto recente com remoção de identificadores óbvios. O formulário de contato segue seu fluxo próprio. A classificação e a redação contextualizada usam duas chamadas com store: false. O tratamento de dados pelo provedor precisa ser revisado antes do uso real.
- O pedido exige revisão do conteúdo e confirmação explícita. O comprovante assinado vale por dez minutos, pertence à sessão e fica inválido se o conteúdo mudar. A transação grava pedido, contato, prova de confirmação e estado de encaminhamento uma única vez.
- O banco bloqueia o acesso direto de visitantes e contas autenticadas comuns. O painel verifica a identidade e o perfil em cada operação e registra as alterações. A chave de serviço fica no servidor.
- Uma mensagem comum utiliza até duas chamadas à OpenAI, para classificação e resposta. O controle de gastos pode ser configurado na plataforma da OpenAI.

Para o teste com serviços reais, use o [roteiro de homologação](homologacao.md).

## Pendências antes de publicar

- Verificar a política de privacidade e os prazos de retenção. A limpeza das solicitações, auditoria e backups depende de política aprovada. Não foi configurada exclusão automática de pedidos.
- Validar as mensagens de urgência, revisar juridicamente o catálogo de conceitos básicos e aprovar as fontes jurídicas complementares.
- Confirmar domínio canônico e contatos. Validar fluxo com Supabase, MFA e provedor de e-mail em homologação com dados fictícios.
- Validar a classificação do modelo em um conjunto representativo. Os testes da demonstração medem as regras locais e não medem a precisão da OpenAI.
- Revisar credenciais, limites e monitoramento. Publicar somente após a autorização específica.

Se a OpenAI responder credit_balance_exhausted, consulte a [cobrança da API](https://platform.openai.com/settings/organization/billing). Para experimentos simples, gpt-6-luna pode ser avaliado separadamente. Alterações do modelo precisam de nova avaliação antes da publicação.

## Reversão

Desative primeiro a flag da funcionalidade afetada e volte ao build anterior se necessário. Preserve as solicitações e registros de confirmação. A migração é aditiva. Verifique a fila antes de reativar o envio e não reenvie tentativas incertas sem conferir o provedor.
