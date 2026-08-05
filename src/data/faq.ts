export type FaqItem = {
  question: string;
  answer: string;
};

/** Dúvidas sobre como funciona o atendimento. */
export const serviceFaqs: FaqItem[] = [
  {
    question: "O primeiro contato pode ser feito pelo WhatsApp?",
    answer:
      "Sim. O WhatsApp é o canal principal de conversão do site e permite uma triagem inicial objetiva."
  },
  {
    question: "O atendimento é presencial ou pode ser a distância?",
    answer:
      "O escritório fica em São Paulo e atende clientes de toda a capital. A conversa pode ser presencial ou a distância, conforme a área jurídica e a necessidade do caso."
  },
  {
    question: "O envio de mensagem cria relação advogado-cliente?",
    answer:
      "Não automaticamente. A relação profissional depende de aceite, análise do caso e formalização adequada."
  }
];

/** Dúvidas temáticas por área de atuação. */
export const practiceFaqs: FaqItem[] = [
  {
    question: "Quando devo procurar orientação para regularizar um imóvel?",
    answer:
      "O ideal é buscar orientação quando houver ausência de escritura, matrícula desatualizada, contrato informal, divergência documental ou antes de comprar, vender ou transferir um imóvel."
  },
  {
    question: "O escritório revisa contrato de compra, venda ou locação?",
    answer:
      "Sim. A análise pode envolver documentos do imóvel, dados das partes, cláusulas de pagamento, garantias, multas, prazos e riscos da operação."
  },
  {
    question: "É possível resolver inventário de forma extrajudicial?",
    answer:
      "Em muitos casos, sim. O inventário pode ser feito em cartório quando há consenso entre os herdeiros, documentação adequada e observância dos requisitos legais."
  },
  {
    question: "Direito Civil inclui cobrança e indenização?",
    answer:
      "Sim. Demandas civis podem envolver contratos, obrigações, cobranças, dívidas, responsabilidade civil e análise de danos materiais ou morais."
  },
  {
    question: "Como saber se tenho direito à revisão da aposentadoria?",
    answer:
      "É necessário analisar carta de concessão, CNIS, histórico de contribuições e cálculos do benefício para identificar eventuais vínculos, salários ou períodos não considerados."
  },
  {
    question: "Quem pode solicitar LOAS?",
    answer:
      "O BPC/LOAS pode ser solicitado por pessoa idosa ou pessoa com deficiência que cumpra os requisitos legais de renda, vulnerabilidade social e documentação exigida."
  },
  {
    question: "Como funciona o processo de cidadania italiana?",
    answer:
      "O processo começa com análise da linha familiar, levantamento de certidões, verificação de divergências em documentos e definição da estratégia mais adequada para o reconhecimento."
  },
  {
    question: "Como funciona o processo de cidadania portuguesa?",
    answer:
      "A análise considera o vínculo familiar, a geração, documentos brasileiros e portugueses necessários e a hipótese legal aplicável ao pedido de nacionalidade."
  },
  {
    question: "O atendimento pode ser online?",
    answer:
      "Sim. O primeiro contato pode ser feito pelo WhatsApp, e a continuidade do atendimento pode ocorrer online ou presencialmente, conforme a necessidade do caso."
  }
];

/** Conjunto completo exibido em /faq, que também carrega o schema FAQPage. */
export const allFaqs: FaqItem[] = [...serviceFaqs, ...practiceFaqs];
