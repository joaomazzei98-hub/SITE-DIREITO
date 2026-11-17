# Homologação com serviços reais

Use um projeto Supabase separado e dados fictícios. O arquivo local .env.homologacao.local fica fora do Git e mantém as credenciais de homologação separadas da chave da OpenAI já configurada.

1. Confirme que o projeto Supabase de destino é dedicado a testes. No painel desse projeto, obtenha a URL, a chave publicável e a chave secreta e preencha SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY e SUPABASE_SERVICE_KEY no arquivo local. [Documentação de chaves do Supabase](https://supabase.com/docs/guides/getting-started/api-keys)
2. Aplique as migrações de supabase/migrations em ordem apenas nesse projeto. Desative o cadastro público, habilite TOTP, crie uma conta fictícia da equipe e associe o UUID ao perfil ativo no banco. Para testar o segundo fator, use o perfil administrador. Para testar a separação de pedidos, use também uma conta de advogado.
3. No Resend, obtenha uma chave com permissão de envio e preencha RESEND_API_KEY. A configuração local usa onboarding@resend.dev e delivered@resend.dev para simular entrega sem encaminhar e-mail a uma pessoa. Para simular devolução, use bounced@resend.dev. [Endereços de teste do Resend](https://resend.com/changelog/sending-test-emails)
4. Encerre outro servidor Next.js do mesmo projeto antes de iniciar a homologação. Na pasta do projeto, rode o comando abaixo e abra http://127.0.0.1:3218.

```powershell
node --env-file=.env.local --env-file=.env.homologacao.local node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3218
```

5. Abra o assistente, envie uma pergunta fictícia, escolha e-mail e confira que nada foi gravado antes da confirmação. Confirme o pedido uma vez. No painel, verifique o registro e o estado pendente. Acione a rota interna da fila com o token local mantido no servidor e confira o estado aceito no painel do Resend.
6. Para validar a confirmação de entrega do provedor, configure temporariamente a rota /api/delivery-events em um ambiente de testes acessível ao Resend, ou use o encaminhamento local da CLI oficial. Preencha RESEND_WEBHOOK_SECRET com o segredo do endpoint e valide os eventos email.delivered, email.bounced e email.failed. A aceitação do e-mail pela API e o evento de entrega são verificações separadas. [Encaminhamento local do Resend](https://resend.com/blog/resend-cli-2)
7. Valide o login, a exigência de MFA, o acesso por perfil e a atualização auditada do pedido. Para encerrar, retire o endpoint temporário e remova os dados sintéticos do ambiente dedicado conforme o procedimento aprovado para testes.

Os testes locais usam as mesmas rotas e migrações com PostgreSQL descartável. As conexões HTTP a Supabase, OpenAI e Resend são simuladas nessa suíte. O teste com credenciais reais é uma etapa separada.

No projeto fleming-batista-homologacao, as duas migrações iniciais foram aplicadas pelo SQL Editor e verificadas em 6 de novembro de 2026. A terceira migração, que acrescenta Cidadania Europeia, foi aplicada e verificada em 12 de novembro de 2026. O editor não registra as versões no histórico da CLI. Antes de usar db push nesse projeto, confira o esquema e reconcilie o histórico das versões já aplicadas.
