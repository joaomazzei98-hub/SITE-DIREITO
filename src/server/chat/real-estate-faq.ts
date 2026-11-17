const rentalLaw =
  "https://www2.camara.leg.br/legin/fed/lei/1991/lei-8245-18-outubro-1991-322506-normaatualizada-pl.html";
const procon = "https://www.procon.sp.gov.br/fornecedor/";
const creci = "https://crecidf.gov.br/perguntas-e-respostas/";

export const realEstateFaq = [
  {
    number: 12,
    question: "Quais documentos o inquilino precisa para alugar um imóvel?",
    keywords: [
      "documentos",
      "documentação",
      "papéis",
      "inquilino",
      "alugar",
      "apartamento"
    ],
    title: "Procon-SP — documentos para locação",
    url: procon,
    excerpt:
      "Os documentos normalmente pedidos ao inquilino são identidade, CPF e comprovante de renda. Confirme a lista com o locador ou a imobiliária, pois ela pode variar conforme o cadastro e a garantia escolhida.",
    reviewWhen: "Houver uma exigência contestada ou pedido de análise dos documentos."
  },
  {
    number: 13,
    question: "Quais documentos costumam ser pedidos ao fiador?",
    keywords: [
      "documentos do fiador",
      "documentação do fiador",
      "usar fiador",
      "escritura do fiador"
    ],
    title: "Procon-SP — documentação do fiador",
    url: procon,
    excerpt:
      "A lista usual do Procon-SP inclui identidade e CPF do fiador, escritura do imóvel apresentado em garantia e IPTU. Confirme com o responsável pela locação os documentos e os critérios de cadastro aplicáveis.",
    reviewWhen:
      "O visitante quiser confirmar se um fiador específico ou seu imóvel pode ser aceito."
  },
  {
    number: 14,
    question: "Como comprovar renda para alugar sendo autônomo ou sem holerite?",
    keywords: [
      "autônomo",
      "autônoma",
      "sem holerite",
      "renda informal",
      "trabalho por conta"
    ],
    title: "Procon-SP — comprovação de renda na locação",
    url: procon,
    excerpt:
      "A imobiliária ou o locador normalmente pede comprovação de renda. Se você trabalha por conta própria ou não tem holerite, pergunte quais comprovantes alternativos o responsável pelo cadastro aceita antes de reunir os documentos.",
    reviewWhen:
      "Houver uma recusa que a pessoa queira contestar ou documentos que precisem de análise."
  },
  {
    number: 1,
    question: "O que é um contrato de aluguel e o que conferir antes de assinar?",
    keywords: [
      "contrato de aluguel",
      "contrato de locação",
      "assinar o contrato",
      "locação",
      "aluguel"
    ],
    title: "Procon-SP — contrato de locação",
    url: procon,
    excerpt:
      "Na locação, o inquilino usa o imóvel mediante pagamento de aluguel. Antes de assinar, confira a identificação das partes e do imóvel, prazo, valor e pagamento do aluguel, reajuste, encargos, garantia e termo de vistoria.",
    reviewWhen: "A dúvida exigir interpretar uma cláusula ou conferir um contrato."
  },
  {
    number: 15,
    question: "Para que serve a vistoria de entrada?",
    keywords: [
      "vistoria de entrada",
      "laudo inicial",
      "antes de receber as chaves",
      "vistoria inicial"
    ],
    title: "Procon-SP — termo de vistoria na locação",
    url: procon,
    excerpt:
      "A vistoria de entrada registra o estado em que o inquilino recebe o imóvel. Confira se o termo descreve as condições do imóvel e se os defeitos que você observou estão registrados.",
    reviewWhen:
      "Houver divergência entre o termo e o estado do imóvel que precise ser avaliada."
  },
  {
    number: 16,
    question: "Para que serve a vistoria de saída?",
    keywords: [
      "vistoria de saída",
      "vistoria final",
      "laudo de saída",
      "comparar as vistorias"
    ],
    title: "Procon-SP — devolução do imóvel e vistoria",
    url: procon,
    excerpt:
      "Na devolução do imóvel, o estado registrado na vistoria de saída pode ser comparado com o termo de entrada. Essa comparação ajuda a identificar diferenças entre o estado em que o imóvel foi recebido e devolvido.",
    reviewWhen:
      "Houver divergência sobre o laudo final, a entrega das chaves ou uma cobrança de reparo."
  },
  {
    number: 17,
    question: "Quais são os tipos de garantia no aluguel?",
    keywords: [
      "tipos de garantia",
      "garantias locatícias",
      "garantia de aluguel",
      "modalidades de garantia"
    ],
    title: "CRECI-DF — modalidades de garantia locatícia",
    url: creci,
    excerpt:
      "A lei prevê caução, fiança, seguro de fiança locatícia e cessão fiduciária de quotas de fundo de investimento como modalidades de garantia de aluguel.",
    reviewWhen:
      "A pessoa quiser escolher uma modalidade para seu contrato ou questionar uma exigência específica."
  },
  {
    number: 18,
    question: "O contrato de aluguel pode exigir mais de uma garantia?",
    keywords: [
      "duas garantias",
      "mais de uma garantia",
      "caução e fiador",
      "garantias juntas"
    ],
    title: "CRECI-DF — garantia única na locação",
    url: creci,
    excerpt:
      "Um mesmo contrato de locação pode ter somente uma modalidade de garantia. A regra veda exigir duas modalidades, como caução e fiança, para o mesmo contrato.",
    reviewWhen:
      "For necessário examinar uma cobrança ou verificar se uma cláusula prevê garantias cumulativas."
  },
  {
    number: 19,
    question: "Qual é o limite da caução em dinheiro e onde ela fica depositada?",
    keywords: [
      "caução",
      "depósito de garantia",
      "depósito caução",
      "aluguéis de depósito"
    ],
    title: "Lei do Inquilinato, art. 38 — caução em dinheiro",
    url: rentalLaw,
    excerpt:
      "A caução em dinheiro é limitada ao equivalente a três meses de aluguel. O depósito é feito em poupança, com os rendimentos destinados ao inquilino quando o valor for levantado.",
    reviewWhen:
      "A pessoa quiser calcular o saldo, discutir descontos ou cobrar a devolução."
  },
  {
    number: 20,
    question: "O que é seguro-fiança e o que ele cobre?",
    keywords: ["seguro fiança", "seguro-fiança", "seguro locatício"],
    title: "SUSEP — seguro de fiança locatícia",
    url: "https://www.gov.br/susep/pt-br/copy_of_planos-e-produtos/seguros/seguro-fianca-locaticia",
    excerpt:
      "O seguro-fiança protege o locador contra o inadimplemento do inquilino. A cobertura básica é o não pagamento do aluguel. Outras coberturas dependem da apólice contratada.",
    reviewWhen:
      "A pessoa quiser saber se uma apólice específica cobre uma despesa ou discutir uma negativa."
  },
  {
    number: 21,
    question: "O que faz o fiador e qual é a sua responsabilidade?",
    keywords: ["fiador", "fiança", "responsabilidade do fiador", "ser fiador"],
    title: "Código Civil, arts. 818 e 819 — fiança",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "O fiador assume por escrito uma garantia perante o credor para o caso de o devedor não cumprir a obrigação. Na locação, o alcance do compromisso deve ser conferido no instrumento de fiança.",
    reviewWhen:
      "A pessoa quiser confirmar a extensão, duração ou liberação de uma fiança específica."
  },
  {
    number: 22,
    question: "Quem paga as taxas de administração e intermediação da imobiliária?",
    keywords: [
      "taxa imobiliária",
      "taxa de administração",
      "taxa de intermediação",
      "taxa de cadastro"
    ],
    title: "CRECI-DF — taxas de administração e intermediação na locação",
    url: creci,
    excerpt:
      "As taxas de administração imobiliária e de intermediação da locação são de responsabilidade do locador. A regra também abrange despesas de verificação da idoneidade do candidato e do fiador.",
    reviewWhen:
      "A pessoa quiser identificar a natureza de uma cobrança ou discutir seu ressarcimento."
  },
  {
    number: 23,
    question: "De quem é a responsabilidade pelo IPTU no imóvel alugado?",
    keywords: ["iptu", "imposto predial"],
    title: "CRECI-DF — IPTU na locação",
    url: creci,
    excerpt:
      "Na relação entre locador e inquilino, o IPTU cabe ao locador pela regra geral. O contrato pode atribuir expressamente esse encargo ao inquilino.",
    reviewWhen:
      "A resposta depender de cláusula do contrato ou de uma cobrança específica."
  },
  {
    number: 24,
    question: "Quem paga as despesas ordinárias do condomínio no aluguel?",
    keywords: [
      "despesas ordinárias",
      "condomínio ordinário",
      "manutenção do condomínio",
      "limpeza do condomínio"
    ],
    title: "Lei do Inquilinato, art. 23 — despesas ordinárias de condomínio",
    url: rentalLaw,
    excerpt:
      "Na locação, o inquilino paga as despesas ordinárias do condomínio, ligadas ao funcionamento e à manutenção de rotina, como a limpeza das áreas comuns.",
    reviewWhen:
      "For necessário classificar uma despesa do boleto ou questionar sua cobrança."
  },
  {
    number: 25,
    question: "Quem paga despesas extraordinárias e obras do condomínio no aluguel?",
    keywords: [
      "despesas extraordinárias",
      "condomínio extraordinário",
      "obra do condomínio",
      "reforma da fachada"
    ],
    title: "Lei do Inquilinato, art. 22 — despesas extraordinárias de condomínio",
    url: rentalLaw,
    excerpt:
      "O locador paga as despesas extraordinárias do condomínio, ligadas a gastos que vão além da manutenção de rotina, como reformas estruturais.",
    reviewWhen: "A pessoa quiser classificar uma obra específica ou contestar um rateio."
  },
  {
    number: 26,
    question: "Quem responde por defeitos que já existiam quando começou a locação?",
    keywords: [
      "defeito anterior",
      "defeitos anteriores",
      "já existia",
      "vício anterior",
      "antes da locação"
    ],
    title: "Lei do Inquilinato, art. 22 — defeitos anteriores à locação",
    url: rentalLaw,
    excerpt:
      "Cabe ao locador responder por defeitos anteriores à locação. O termo de vistoria ajuda a registrar as condições do imóvel no início.",
    reviewWhen:
      "For preciso verificar quando o problema surgiu, de quem é a responsabilidade ou quem deve pagar o reparo."
  },
  {
    number: 27,
    question: "Como o desgaste normal é tratado ao devolver o imóvel?",
    keywords: [
      "desgaste normal",
      "marcas de uso",
      "desgaste natural",
      "estado em que recebeu"
    ],
    title: "Lei do Inquilinato, art. 23 — estado do imóvel na devolução",
    url: rentalLaw,
    excerpt:
      "O inquilino deve devolver o imóvel nas condições em que o recebeu, considerando a deterioração decorrente do uso normal.",
    reviewWhen:
      "A pessoa quiser saber se uma avaria, pintura ou cobrança específica se enquadra como desgaste normal."
  },
  {
    number: 28,
    question: "O locador deve dar um recibo detalhado do aluguel?",
    keywords: ["recibo", "recibo do aluguel", "comprovante de pagamento do aluguel"],
    title: "Lei do Inquilinato, art. 22 — recibo discriminado",
    url: rentalLaw,
    excerpt:
      "O locador deve fornecer recibo que discrimine as importâncias pagas pelo inquilino. Uma quitação genérica não atende à regra.",
    reviewWhen:
      "Houver negativa de recibo ou discussão sobre quais valores foram quitados."
  },
  {
    number: 29,
    question: "Com que frequência o aluguel pode ter reajuste por índice?",
    keywords: ["reajuste", "reajustar", "índice de reajuste", "reajuste anual"],
    title: "Lei 10.192/2001, art. 2º — periodicidade do reajuste",
    url: "https://www2.camara.leg.br/legin/fed/lei/2001/lei-10192-14-fevereiro-2001-365669-normaatualizada-pl.html",
    excerpt:
      "O reajuste contratual por índice de preços tem periodicidade mínima de um ano. Para verificar o reajuste previsto, confira a cláusula de índice e a data-base do contrato.",
    reviewWhen:
      "A pessoa quiser conferir um aumento aplicado, calcular o novo valor ou interpretar a cláusula."
  },
  {
    number: 30,
    question: "Como funciona a multa por devolver o imóvel antes de acabar o contrato?",
    keywords: [
      "multa",
      "saída antecipada",
      "quebrar contrato",
      "sair antes",
      "entregar antes"
    ],
    title: "Lei do Inquilinato, art. 4º — devolução antecipada",
    url: rentalLaw,
    excerpt:
      "Na devolução antecipada pelo inquilino durante prazo determinado, a multa contratual, quando aplicável, é proporcional ao período restante. A lei prevê exceções.",
    reviewWhen:
      "For preciso calcular o valor, avaliar uma exceção ou conferir a cláusula de um contrato."
  },
  {
    number: 31,
    question: "Qual é o aviso para sair de uma locação por prazo indeterminado?",
    keywords: [
      "prazo indeterminado",
      "aviso prévio de saída",
      "aviso de desocupação",
      "sem prazo definido"
    ],
    title: "Lei do Inquilinato, art. 6º — aviso para devolução",
    url: rentalLaw,
    excerpt:
      "Na locação por prazo indeterminado, o inquilino deve avisar o locador por escrito com pelo menos 30 dias de antecedência para encerrar o contrato.",
    reviewWhen:
      "Houver dúvida sobre o prazo do contrato, a validade do aviso ou uma cobrança por sua falta."
  },
  {
    number: 32,
    question: "O inquilino tem preferência para comprar o imóvel alugado?",
    keywords: [
      "direito de preferência",
      "preferência na compra",
      "vender o imóvel alugado",
      "imóvel alugado for vendido"
    ],
    title: "Lei do Inquilinato, arts. 27 e 28 — preferência do inquilino",
    url: rentalLaw,
    excerpt:
      "Na venda, o inquilino tem preferência em igualdade de condições com terceiros. Deve receber a comunicação do negócio e tem 30 dias para aceitar integralmente a proposta.",
    reviewWhen:
      "O imóvel já tiver sido negociado ou for preciso examinar a comunicação, o prazo ou uma exceção."
  },
  {
    number: 2,
    question: "Qual a diferença entre escritura e registro na compra de imóvel?",
    keywords: [
      "escritura",
      "registro do imóvel",
      "escritura e registro",
      "passar para o nome"
    ],
    title: "TJDFT — escrituras públicas",
    url: "https://www.tjdft.jus.br/informacoes/perguntas-mais-frequentes/extrajudicial/escrituras",
    excerpt:
      "A escritura pública formaliza a compra e venda perante o tabelionato de notas. O registro do título na matrícula, no cartório de registro de imóveis, é a etapa que transfere a propriedade.",
    reviewWhen:
      "A pessoa quiser confirmar quem é o proprietário ou verificar os documentos de uma compra específica."
  },
  {
    number: 33,
    question: "O que é a matrícula do imóvel e onde pedir sua certidão?",
    keywords: [
      "matrícula",
      "certidão do imóvel",
      "certidão da matrícula",
      "histórico do imóvel"
    ],
    title: "TJDFT — registro de imóveis e certidões",
    url: "https://www.tjdft.jus.br/informacoes/perguntas-mais-frequentes/extrajudicial/registro-de-imoveis",
    excerpt:
      "A matrícula individualiza o imóvel e reúne registros e averbações sobre ele. A certidão pode ser solicitada ao cartório de registro de imóveis responsável pela matrícula.",
    reviewWhen:
      "For preciso interpretar o conteúdo da certidão, confirmar a titularidade ou avaliar restrições."
  },
  {
    number: 3,
    question: "O que é usucapião?",
    keywords: ["usucapião"],
    title: "TJDFT — o que é usucapião",
    url: "https://www.tjdft.jus.br/institucional/imprensa/campanhas-e-produtos/direito-facil/edicao-semanal/usucapiao",
    excerpt:
      "Usucapião é uma forma de adquirir a propriedade pela posse exercida durante determinado período, desde que sejam atendidos os requisitos legais. Há modalidades com requisitos próprios.",
    reviewWhen:
      "A pessoa quiser saber se já tem direito ou qual modalidade, prazo ou procedimento se aplica."
  }
];
