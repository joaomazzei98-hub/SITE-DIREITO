import type { LegalArea } from "@/lib/chat/contracts";

type PracticeFaq = {
  area: LegalArea;
  number: number;
  question: string;
  keywords: string[];
  title: string;
  url: string;
  excerpt: string;
  reviewWhen: string;
};

export const practiceFaq: PracticeFaq[] = [
  {
    area: "civil",
    number: 4,
    question: "Qual a diferença entre dano material e dano moral?",
    keywords: [
      "dano",
      "dano material",
      "dano moral",
      "danos materiais",
      "danos morais",
      "indenização"
    ],
    title: "TJDFT — danos materiais e morais",
    url: "https://www.tjdft.jus.br/institucional/imprensa/campanhas-e-produtos/direito-facil/edicao-semanal/dano-material-dano-moral-e-dano-estetico",
    excerpt:
      "Dano material é prejuízo patrimonial. Dano moral envolve lesão a direitos da personalidade, como honra ou imagem. A existência e o valor de uma indenização dependem das circunstâncias e da prova.",
    reviewWhen:
      "A pessoa quiser saber se tem direito a indenização ou quanto poderia receber."
  },
  {
    area: "civil",
    number: 34,
    question: "O que é nexo causal na responsabilidade civil?",
    keywords: ["nexo causal", "responsabilidade civil", "relação entre conduta e dano"],
    title: "Código Civil, arts. 186 e 927 — ato ilícito e reparação",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "Nexo causal é a ligação entre o fato atribuído ao responsável e o dano cuja reparação se pede.",
    reviewWhen: "For preciso examinar as provas ou apontar quem causou um dano concreto."
  },
  {
    area: "civil",
    number: 35,
    question: "Um contrato verbal pode ser válido?",
    keywords: [
      "contrato verbal",
      "acordo verbal",
      "só de boca",
      "acordo de boca",
      "por escrito"
    ],
    title: "Código Civil, art. 107 — forma dos negócios jurídicos",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "Um acordo verbal pode ser válido quando a lei não exige forma específica. O registro por escrito ajuda a demonstrar o que foi combinado.",
    reviewWhen: "For necessário confirmar a validade ou a prova de um acordo específico."
  },
  {
    area: "civil",
    number: 36,
    question: "O que é uma cláusula penal em um contrato?",
    keywords: ["cláusula penal", "multa contratual", "penalidade contratual"],
    title: "TJDFT — cláusula penal",
    url: "https://www.tjdft.jus.br/institucional/imprensa/campanhas-e-produtos/direito-facil/edicao-semanal/clausula-penal",
    excerpt:
      "Cláusula penal é uma penalidade previamente combinada para situações de descumprimento ou atraso, conforme a redação do contrato.",
    reviewWhen:
      "A pessoa quiser saber se a multa pode ser cobrada, reduzida ou calculada no seu contrato."
  },
  {
    area: "civil",
    number: 37,
    question:
      "Qual a diferença entre atraso e descumprimento definitivo de uma obrigação?",
    keywords: [
      "inadimplemento",
      "mora",
      "atraso no pagamento",
      "descumprimento definitivo"
    ],
    title: "Código Civil, arts. 389, 394 e 395 — inadimplemento e mora",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "Na mora, há atraso ou cumprimento fora das condições devidas. Se a prestação se tornar inútil pelo atraso, o credor pode recusá-la e pedir perdas e danos.",
    reviewWhen:
      "A resposta depender de interpretar o contrato ou avaliar as consequências de um atraso."
  },
  {
    area: "civil",
    number: 38,
    question: "Para que serve o recibo de quitação de uma dívida?",
    keywords: [
      "quitação",
      "recibo de pagamento",
      "comprovante de quitação",
      "dívida paga"
    ],
    title: "Código Civil, arts. 319 e 320 — quitação",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "O recibo documenta o pagamento. Uma quitação identifica a obrigação paga e permite verificar a quem o pagamento foi feito.",
    reviewWhen:
      "Houver dúvida sobre o alcance do recibo, um pagamento contestado ou saldo em aberto."
  },
  {
    area: "civil",
    number: 39,
    question: "O que é uma notificação extrajudicial?",
    keywords: ["notificação extrajudicial", "carta de cobrança", "comunicação formal"],
    title: "Lei de Registros Públicos, art. 160 — notificação por cartório",
    url: "https://www2.camara.leg.br/legin/fed/lei/1970-1979/lei-6015-31-dezembro-1973-357511-normaatualizada-pl.html",
    excerpt:
      "É uma comunicação formal feita fora de um processo judicial. O Registro de Títulos e Documentos pode realizar a notificação e certificar sua entrega.",
    reviewWhen:
      "For necessário redigir uma notificação ou definir seus efeitos e prazos em um caso."
  },
  {
    area: "civil",
    number: 40,
    question: "O que é um acordo para encerrar uma disputa ou renegociar uma dívida?",
    keywords: ["renegociar", "renegociação", "acordo de dívida", "transação"],
    title: "Código Civil, art. 840 — transação",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "A transação é um acordo em que as partes fazem concessões recíprocas para prevenir ou encerrar um conflito.",
    reviewWhen:
      "For preciso analisar proposta, saldo, juros, garantias ou elaborar um termo."
  },
  {
    area: "civil",
    number: 41,
    question: "O que significa prescrição em uma cobrança civil?",
    keywords: ["prescrição", "prescrita", "prescrito", "prazo para cobrar"],
    title: "TJDFT — prescrição e decadência",
    url: "https://www.tjdft.jus.br/institucional/imprensa/campanhas-e-produtos/direito-facil/edicao-semanal/prescricao-x-decadencia",
    excerpt:
      "Prescrição é a perda da pretensão pelo decurso do prazo aplicável. O prazo depende da natureza da pretensão e de circunstâncias que podem interferir na sua contagem.",
    reviewWhen:
      "A pessoa quiser confirmar se uma dívida específica prescreveu ou contar um prazo."
  },
  {
    area: "civil",
    number: 42,
    question: "Qual a diferença entre mediação e conciliação?",
    keywords: ["mediação", "conciliação", "mediador", "conciliador"],
    title: "CNJ — mediação e conciliação",
    url: "https://www.cnj.jus.br/perguntas-frequentes-7/",
    excerpt:
      "Na conciliação, o conciliador pode sugerir caminhos de acordo. Na mediação, o mediador facilita o diálogo para que as próprias partes construam a solução. A mediação é especialmente indicada quando já existe vínculo entre elas.",
    reviewWhen:
      "A pessoa quiser escolher a estratégia para seu conflito ou avaliar os termos de um acordo."
  },
  {
    area: "civil",
    number: 43,
    question: "O que é um CEJUSC e para que serve?",
    keywords: ["cejusc", "centro judiciário", "centro de conciliação"],
    title: "CNJ — atendimento em conciliação e mediação",
    url: "https://www.cnj.jus.br/saiba-mais-conciliacao-mediacao/",
    excerpt:
      "O CEJUSC é um centro do Poder Judiciário que orienta e organiza sessões de conciliação e mediação. Pode receber demandas antes de um processo ou em um caso que já tramita, conforme o tribunal.",
    reviewWhen:
      "For necessário decidir como iniciar um pedido específico ou avaliar um acordo."
  },
  {
    area: "civil",
    number: 44,
    question: "O que significa boa-fé em um contrato civil?",
    keywords: ["boa-fé", "boa fe", "boa-fé objetiva", "lealdade contratual"],
    title: "Código Civil, art. 422 — boa-fé contratual",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "As partes devem agir com lealdade e boa-fé ao concluir e executar o contrato.",
    reviewWhen:
      "A pessoa quiser avaliar se uma conduta concreta violou o dever de boa-fé."
  },
  {
    area: "familia",
    number: 5,
    question: "Qual a diferença entre inventário e partilha?",
    keywords: ["inventário", "herança", "partilha", "espólio"],
    title: "TJDFT — inventário e partilha",
    url: "https://www.tjdft.jus.br/consultas/jurisprudencia/jurisprudencia-em-temas/novo-codigo-de-processo-civil/inventario",
    excerpt:
      "O inventário apura os bens e as obrigações deixados pela pessoa falecida. A partilha define como a herança é distribuída entre os sucessores.",
    reviewWhen: "A pessoa quiser confirmar herdeiros, percentuais, tributos ou prazos."
  },
  {
    area: "familia",
    number: 6,
    question: "O que é regime de bens e como funciona a comunhão parcial?",
    keywords: [
      "regime de bens",
      "comunhão parcial",
      "comunhão universal",
      "separação de bens",
      "casamento"
    ],
    title: "TJDFT — regimes de bens entre cônjuges",
    url: "https://www.tjdft.jus.br/institucional/imprensa/campanhas-e-produtos/direito-facil/edicao-semanal/regime-de-bens-entre-conjuges",
    excerpt:
      "O regime de bens define como o patrimônio do casal é tratado. Na comunhão parcial, em geral entram na comunhão os bens adquiridos onerosamente durante o casamento, com as exceções legais.",
    reviewWhen: "For preciso saber se um bem específico integra a partilha."
  },
  {
    area: "familia",
    number: 45,
    question: "O que caracteriza uma união estável?",
    keywords: ["união estável", "convivência pública", "união de fato"],
    title: "TJDFT — união estável",
    url: "https://www.tjdft.jus.br/institucional/imprensa/campanhas-e-produtos/direito-facil/edicao-semanal/uniao-estavel",
    excerpt:
      "União estável é uma convivência pública, contínua e duradoura com objetivo de constituir família. A análise de um vínculo concreto depende dos fatos e dos registros disponíveis.",
    reviewWhen:
      "A pessoa quiser confirmar se sua relação é união estável ou discutir as datas do vínculo."
  },
  {
    area: "familia",
    number: 46,
    question: "Como funciona o divórcio consensual em cartório?",
    keywords: ["divórcio consensual", "divórcio em cartório", "separação amigável"],
    title: "CNJ, Resolução 35 — divórcio consensual",
    url: "https://atos.cnj.jus.br/atos/detalhar/179",
    excerpt:
      "O divórcio consensual pode ser feito por escritura pública, com assistência de advogado ou defensor público. Se houver filhos menores ou incapazes, é preciso comprovar solução judicial prévia das questões de guarda, convivência e alimentos.",
    reviewWhen:
      "For necessário verificar se o casal cumpre as condições da via extrajudicial."
  },
  {
    area: "familia",
    number: 47,
    question: "É possível fazer inventário em cartório?",
    keywords: [
      "inventário em cartório",
      "inventário extrajudicial",
      "escritura de inventário"
    ],
    title: "CNJ, Resolução 35 — inventário extrajudicial",
    url: "https://atos.cnj.jus.br/atos/detalhar/179",
    excerpt:
      "O inventário consensual pode ser feito por escritura pública, com assistência de advogado ou defensor. A resolução prevê condições específicas para casos com testamento ou interessado menor ou incapaz.",
    reviewWhen:
      "A pessoa quiser escolher a via do próprio inventário ou houver divergência entre interessados."
  },
  {
    area: "familia",
    number: 48,
    question: "Quais documentos separar para um inventário em cartório?",
    keywords: [
      "documentos do inventário",
      "documentos para inventário",
      "certidão de óbito",
      "certidões dos herdeiros"
    ],
    title: "CNJ, Resolução 35 — documentos do inventário",
    url: "https://atos.cnj.jus.br/atos/detalhar/179",
    excerpt:
      "Em geral, reúna a certidão de óbito, documentos de identidade das partes, certidões que comprovem parentesco e estado civil e documentos de titularidade dos bens. Confirme a lista completa com o tabelionato e com quem vai acompanhar o inventário.",
    reviewWhen:
      "A pessoa quiser enviar documentos, conferir sua validade ou obter uma lista fechada para o caso."
  },
  {
    area: "familia",
    number: 49,
    question: "O que é um testamento e ele pode ser revogado?",
    keywords: ["testamento", "revogar testamento", "última vontade"],
    title: "TJDFT — testamento e revogação",
    url: "https://www.tjdft.jus.br/informacoes/perguntas-mais-frequentes/extrajudicial/testamento-e-revogacao",
    excerpt:
      "O testamento permite dispor para depois da morte, respeitados os limites legais. Em geral pode ser alterado ou revogado, observadas as formalidades aplicáveis.",
    reviewWhen: "A dúvida envolver redigir, interpretar ou impugnar um testamento."
  },
  {
    area: "familia",
    number: 50,
    question: "O que é guarda compartilhada?",
    keywords: ["guarda compartilhada", "guarda conjunta", "responsabilidade parental"],
    title: "Código Civil, art. 1.583 — guarda compartilhada",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "Na guarda compartilhada, ambos os responsáveis exercem direitos e deveres sobre a criação dos filhos. A divisão do convívio considera as condições do caso e os interesses dos filhos.",
    reviewWhen:
      "For necessário definir residência, horários ou avaliar riscos e restrições."
  },
  {
    area: "familia",
    number: 51,
    question: "Para que serve a regulamentação da convivência familiar?",
    keywords: [
      "convivência familiar",
      "direito de visita",
      "horário de visitas",
      "regime de convivência"
    ],
    title: "Código Civil, arts. 1.583 e 1.589 — convivência familiar",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "Organiza o convívio dos filhos com os responsáveis e pode estabelecer períodos de convivência por acordo ou decisão judicial.",
    reviewWhen:
      "A pessoa quiser fixar ou alterar dias, horários ou condições da convivência."
  },
  {
    area: "familia",
    number: 52,
    question: "O que é pensão alimentícia e o que influencia o valor?",
    keywords: ["pensão alimentícia", "alimentos", "valor da pensão"],
    title: "Código Civil, art. 1.694 — fixação de alimentos",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "Alimentos são prestações de sustento. Sua fixação considera as necessidades de quem recebe e os recursos de quem paga.",
    reviewWhen: "A pessoa quiser calcular um valor ou confirmar quem deve pagar."
  },
  {
    area: "familia",
    number: 53,
    question: "A pensão alimentícia pode ser revista?",
    keywords: [
      "revisão de pensão",
      "revisão de alimentos",
      "aumentar pensão",
      "reduzir pensão"
    ],
    title: "Código Civil, art. 1.699 — revisão de alimentos",
    url: "https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html",
    excerpt:
      "Uma mudança na situação financeira de quem paga ou de quem recebe pode fundamentar um pedido de revisão da pensão.",
    reviewWhen:
      "A pessoa quiser saber se pode reduzir, aumentar ou parar de pagar no seu caso."
  },
  {
    area: "familia",
    number: 54,
    question: "Como se formaliza a dissolução consensual de união estável?",
    keywords: [
      "dissolução de união estável",
      "fim da união estável",
      "encerrar união estável"
    ],
    title: "CNJ, Resolução 35 — extinção consensual de união estável",
    url: "https://atos.cnj.jus.br/atos/detalhar/179",
    excerpt:
      "A extinção consensual da união estável pode ser formalizada por escritura pública com assistência jurídica e observância das condições aplicáveis. A escritura pode tratar da partilha, quando houver bens a dividir.",
    reviewWhen:
      "A pessoa quiser saber como formalizar sua dissolução, especialmente quando houver bens, filhos ou desacordo."
  },
  {
    area: "consumidor",
    number: 7,
    question: "Qual a diferença entre garantia legal e garantia contratual?",
    keywords: [
      "consumidor",
      "garantia legal",
      "garantia contratual",
      "certificado de garantia",
      "garantia do produto"
    ],
    title: "Procon-SP — noções básicas sobre direitos do consumidor",
    url: "https://www.procon.sp.gov.br/wp-content/uploads/2022/01/NocoesBasicassobreDireitosdoConsumidor2022.pdf",
    excerpt:
      "A garantia legal decorre da lei e independe de certificado. A garantia contratual é oferecida pelo fornecedor por escrito e complementa a garantia legal.",
    reviewWhen:
      "A pessoa quiser confirmar a cobertura ou a vigência de uma garantia específica."
  },
  {
    area: "consumidor",
    number: 55,
    question: "Qual é o prazo para reclamar de um defeito aparente?",
    keywords: [
      "garantia de 90 dias",
      "garantia de 30 dias",
      "defeito aparente",
      "prazo para reclamar",
      "produto durável"
    ],
    title: "CDC, art. 26 — prazo para reclamar do vício aparente",
    url: "https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html",
    excerpt:
      "Para vícios aparentes, o prazo de reclamação é de 30 dias para produtos ou serviços não duráveis e de 90 dias para os duráveis. Conta-se da entrega do produto ou do fim da execução do serviço.",
    reviewWhen:
      "For preciso classificar o produto, verificar as datas ou calcular o prazo da reclamação."
  },
  {
    area: "consumidor",
    number: 56,
    question: "O que é um vício oculto e quando começa o prazo para reclamar?",
    keywords: [
      "vício oculto",
      "defeito oculto",
      "problema apareceu depois",
      "defeito que demorou"
    ],
    title: "CDC, art. 26 — vício oculto",
    url: "https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html",
    excerpt:
      "Vício oculto é um problema que não era aparente. O prazo para reclamar começa quando o defeito se torna perceptível.",
    reviewWhen:
      "A pessoa quiser determinar a causa do defeito, a data em que apareceu ou se sua reclamação ainda cabe."
  },
  {
    area: "consumidor",
    number: 57,
    question: "Quanto tempo o fornecedor tem para reparar um produto com defeito?",
    keywords: [
      "prazo de conserto",
      "prazo para consertar",
      "30 dias de conserto",
      "assistência técnica"
    ],
    title: "CDC, art. 18 — prazo de reparo do produto",
    url: "https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html",
    excerpt:
      "Em geral, o fornecedor tem até 30 dias para sanar o vício do produto. A lei prevê situações que permitem ao consumidor escolher a solução imediatamente, como no caso de produto essencial.",
    reviewWhen:
      "For necessário verificar prazo, exceções ou se um produto específico é essencial."
  },
  {
    area: "consumidor",
    number: 58,
    question: "Quais opções existem quando o produto não é reparado no prazo?",
    keywords: [
      "não consertou",
      "não reparou",
      "troca por defeito",
      "reembolso por defeito",
      "abatimento proporcional"
    ],
    title: "CDC, art. 18 — opções após o prazo de reparo",
    url: "https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html",
    excerpt:
      "Se o vício do produto não for sanado no prazo aplicável, o consumidor pode optar pela substituição, pela restituição do valor pago ou pelo abatimento proporcional do preço.",
    reviewWhen:
      "A pessoa quiser exigir uma dessas soluções em um caso específico ou houver recusa do fornecedor."
  },
  {
    area: "consumidor",
    number: 59,
    question: "Como funciona o direito de arrependimento em uma compra on-line?",
    keywords: [
      "direito de arrependimento",
      "compra online",
      "compra pela internet",
      "compra por telefone",
      "cancelar compra online"
    ],
    title: "Procon-RS — direito de arrependimento",
    url: "https://procon.rs.gov.br/direito-de-arrependimento",
    excerpt:
      "Em compras fora do estabelecimento, como pela internet ou por telefone, a regra geral permite desistir em até sete dias a partir da assinatura ou do recebimento, conforme a contratação. A devolução abrange os valores pagos.",
    reviewWhen:
      "For necessário contar o prazo, avaliar a aplicação da regra ou contestar uma negativa."
  },
  {
    area: "consumidor",
    number: 60,
    question:
      "A loja física precisa trocar produto sem defeito por tamanho, cor ou gosto?",
    keywords: [
      "troca loja física",
      "loja física",
      "troca sem defeito",
      "não serviu",
      "produto sem defeito"
    ],
    title: "Procon-SP — troca em loja física",
    url: "https://www.procon.sp.gov.br/trocas-de-presentes-2/",
    excerpt:
      "Em compra presencial, a troca por tamanho, cor ou gosto depende da política ou do compromisso assumido pela loja. Confira as condições informadas na compra.",
    reviewWhen: "A pessoa quiser contestar descumprimento de uma promessa de troca."
  },
  {
    area: "consumidor",
    number: 61,
    question: "Quando a cobrança indevida pode gerar devolução em dobro?",
    keywords: [
      "cobrança indevida",
      "devolução em dobro",
      "repetição de indébito",
      "paguei a mais"
    ],
    title: "CDC, art. 42 — repetição do indébito",
    url: "https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html",
    excerpt:
      "O CDC prevê devolução em dobro do valor que foi pago a mais, com correção e juros, salvo engano justificável. Receber apenas a cobrança sem pagar o valor não é o mesmo que pagar indevidamente.",
    reviewWhen:
      "A pessoa quiser confirmar se tem direito à devolução, calcular o valor ou discutir a justificativa da cobrança."
  },
  {
    area: "consumidor",
    number: 62,
    question: "O que a lei prevê quando um serviço contratado é prestado com vício?",
    keywords: [
      "serviço mal feito",
      "vício do serviço",
      "serviço inadequado",
      "refazer o serviço"
    ],
    title: "CDC, art. 20 — vício do serviço",
    url: "https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html",
    excerpt:
      "Quando o serviço tem vício de qualidade, o consumidor pode optar por reexecução sem custo, quando couber, devolução do valor pago ou abatimento proporcional.",
    reviewWhen:
      "For preciso verificar se houve vício ou qual medida cabe diante do contrato e da prova."
  },
  {
    area: "consumidor",
    number: 63,
    question: "Quais comprovantes guardar para reclamar de uma compra ou serviço?",
    keywords: [
      "comprovante da compra",
      "nota fiscal",
      "protocolo de atendimento",
      "documentos para reclamar"
    ],
    title: "Ministério da Justiça — como registrar uma reclamação",
    url: "https://www.gov.br/mj/pt-br/assuntos/noticias/consumidor-gov-br-saiba-como-registrar-uma-reclamacao-pela-plataforma",
    excerpt:
      "Guarde a nota fiscal ou o comprovante de pagamento, o contrato quando houver e os protocolos de atendimento. Eles ajudam a demonstrar a compra e o que já foi tratado com o fornecedor.",
    reviewWhen:
      "For preciso analisar o conteúdo ou a suficiência da prova em uma reclamação concreta."
  },
  {
    area: "consumidor",
    number: 64,
    question: "Como registrar uma reclamação no Consumidor.gov.br?",
    keywords: [
      "consumidor gov",
      "registrar reclamação",
      "reclamar na plataforma",
      "empresa participante"
    ],
    title: "Gov.br — serviço Consumidor.gov.br",
    url: "https://www.gov.br/pt-br/servicos/reclamar-contra-servico-ou-produto-de-empresas-privadas",
    excerpt:
      "A plataforma permite reclamar diretamente com empresas participantes. Confira se a empresa está cadastrada, registre a demanda pelo canal oficial e acompanhe a resposta para depois avaliar o atendimento.",
    reviewWhen:
      "A dúvida exigir estratégia jurídica ou análise de uma reclamação sem solução."
  },
  {
    area: "consumidor",
    number: 65,
    question: "Como procurar o Procon para uma reclamação de consumo?",
    keywords: ["procon", "atendimento do procon", "reclamar no procon"],
    title: "Procon-SP — carta de serviços",
    url: "https://www.procon.sp.gov.br/carta-de-servicos/",
    excerpt:
      "A Carta de Serviços do Procon-SP apresenta os canais de orientação e de registro de reclamações. Confira o canal que atende a sua região e tenha à mão os comprovantes da relação de consumo.",
    reviewWhen:
      "A pessoa quiser avaliar medidas jurídicas, danos ou o resultado possível de sua reclamação."
  },
  {
    area: "trabalhista",
    number: 8,
    question: "O que é FGTS e onde conferir os depósitos?",
    keywords: ["fgts", "fundo de garantia", "extrato do fgts", "depósitos do fgts"],
    title: "Caixa — aplicativo FGTS",
    url: "https://www.fgts.gov.br/Paginas/trabalhador/app-fgts.aspx",
    excerpt:
      "O Fundo de Garantia do Tempo de Serviço é formado por depósitos em conta vinculada ao trabalhador. No aplicativo FGTS da Caixa, o titular pode consultar os depósitos, o saldo e o extrato.",
    reviewWhen:
      "A pessoa quiser conferir depósitos ausentes, cálculo de multa ou direito a um saque."
  },
  {
    area: "trabalhista",
    number: 9,
    question: "O que são rescisão e verbas rescisórias?",
    keywords: ["rescisão", "demissão", "desligamento", "verbas rescisórias"],
    title: "Ministério do Trabalho — encerramento do contrato",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/proteja/duvidas-frequentes",
    excerpt:
      "Rescisão é o encerramento do contrato de trabalho. As verbas rescisórias são os valores apurados nesse encerramento. O que pode ser devido depende do tipo de desligamento e do vínculo.",
    reviewWhen: "A pessoa quiser conferir o que deve receber ou calcular a sua rescisão."
  },
  {
    area: "trabalhista",
    number: 66,
    question: "O que é o TRCT e o que deve aparecer no documento de rescisão?",
    keywords: [
      "trct",
      "termo de rescisão",
      "documento da rescisão",
      "recibo de rescisão"
    ],
    title: "CLT, art. 477 — discriminação das verbas rescisórias",
    url: "https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html",
    excerpt:
      "O Termo de Rescisão do Contrato de Trabalho formaliza a rescisão. O documento de quitação deve identificar cada parcela paga e seu valor, e a quitação se refere às parcelas discriminadas.",
    reviewWhen:
      "A pessoa quiser enviar o TRCT, conferir cálculos ou avaliar uma quitação específica."
  },
  {
    area: "trabalhista",
    number: 67,
    question: "Qual é o prazo geral de pagamento das verbas rescisórias?",
    keywords: [
      "prazo da rescisão",
      "prazo para pagar a rescisão",
      "pagar verbas rescisórias",
      "dez dias da rescisão"
    ],
    title: "CLT, art. 477 — prazo para pagamento na rescisão",
    url: "https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html",
    excerpt:
      "Na regra geral da CLT, as verbas rescisórias devem ser pagas em até dez dias contados do término do contrato de trabalho.",
    reviewWhen:
      "For necessário identificar a data do término, calcular o prazo ou discutir atraso e multa."
  },
  {
    area: "trabalhista",
    number: 68,
    question: "Qual a diferença entre pedir demissão e ser dispensado sem justa causa?",
    keywords: [
      "pedido de demissão",
      "pedir demissão",
      "dispensa sem justa causa",
      "demissão sem justa causa"
    ],
    title: "Ministério do Trabalho — modalidades de desligamento",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/proteja/duvidas-frequentes",
    excerpt:
      "No pedido de demissão, a iniciativa é do trabalhador. Na dispensa sem justa causa, a iniciativa é do empregador. A modalidade altera as verbas e o acesso a FGTS e seguro-desemprego, sujeitos aos requisitos aplicáveis.",
    reviewWhen:
      "A pessoa quiser saber valores, vantagens ou consequências de um desligamento específico."
  },
  {
    area: "trabalhista",
    number: 69,
    question: "Como funciona a rescisão por acordo entre empregado e empregador?",
    keywords: ["rescisão por acordo", "demissão por acordo", "desligamento por acordo"],
    title: "CLT, art. 484-A — extinção por acordo",
    url: "https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html",
    excerpt:
      "O contrato pode terminar por acordo. Nessa modalidade, o aviso prévio indenizado e a indenização do FGTS são pagos pela metade, as demais verbas são integrais, o saque do FGTS é limitado a 80% e o acordo não dá acesso ao seguro-desemprego.",
    reviewWhen:
      "A pessoa quiser avaliar, formalizar ou calcular um acordo para o próprio vínculo."
  },
  {
    area: "trabalhista",
    number: 70,
    question: "Como funcionam as férias anuais no regime da CLT?",
    keywords: ["férias", "período aquisitivo", "descanso anual", "um terço de férias"],
    title: "CLT, arts. 129, 130 e 134 — férias anuais",
    url: "https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html",
    excerpt:
      "O empregado adquire direito a férias após cada período de 12 meses de contrato. O empregador deve concedê-las nos 12 meses seguintes. A duração pode variar conforme as faltas que a lei manda considerar.",
    reviewWhen:
      "For necessário apurar dias, datas, pagamento ou efeitos de faltas ou afastamentos."
  },
  {
    area: "trabalhista",
    number: 71,
    question: "Como funcionam as parcelas do décimo terceiro salário?",
    keywords: [
      "décimo terceiro",
      "13º salário",
      "primeira parcela do décimo",
      "gratificação natalina"
    ],
    title: "Ministério do Trabalho — adiantamento e parcela final do 13º",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/servicos/empregador/fgtsdigital/perguntas-frequentes",
    excerpt:
      "Na regra geral, o décimo terceiro tem adiantamento até o fim de novembro. A parcela final é devida até 20 de dezembro, descontado o adiantamento.",
    reviewWhen:
      "A pessoa quiser calcular o valor ou conferir um caso com afastamento, rescisão ou parcelas variáveis."
  },
  {
    area: "trabalhista",
    number: 72,
    question: "O que é hora extra e qual é o adicional mínimo geral?",
    keywords: [
      "hora extra",
      "horas extras",
      "adicional de hora extra",
      "jornada extraordinária"
    ],
    title: "CLT, art. 59 — horas extras",
    url: "https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html",
    excerpt:
      "Hora extra é trabalho além da jornada normal. A remuneração da hora extra é, em regra, pelo menos 50% superior à da hora normal. Regras de compensação ou coletivas podem ser relevantes.",
    reviewWhen:
      "A pessoa quiser calcular horas e reflexos ou verificar o regime de jornada aplicável."
  },
  {
    area: "trabalhista",
    number: 73,
    question: "Onde consultar os vínculos na Carteira de Trabalho Digital?",
    keywords: [
      "ctps digital",
      "carteira de trabalho digital",
      "vínculos de emprego",
      "contratos na carteira"
    ],
    title: "Gov.br — Carteira de Trabalho Digital",
    url: "https://www.gov.br/pt-br/apps/ctps-digital",
    excerpt:
      "A Carteira de Trabalho Digital permite consultar os contratos de trabalho registrados. Acesse o aplicativo oficial com a sua própria conta Gov.br.",
    reviewWhen:
      "Houver divergência no registro ou for preciso avaliar a existência de vínculo."
  },
  {
    area: "trabalhista",
    number: 74,
    question: "Onde pedir o seguro-desemprego?",
    keywords: ["seguro-desemprego", "pedir seguro", "solicitar seguro desemprego"],
    title: "Gov.br — solicitar o seguro-desemprego",
    url: "https://www.gov.br/pt-br/servicos/solicitar-o-seguro-desemprego",
    excerpt:
      "O trabalhador pode solicitar o seguro-desemprego pelo portal oficial do serviço ou pela Carteira de Trabalho Digital, se atender aos requisitos. Tenha à mão o requerimento fornecido pelo empregador quando aplicável.",
    reviewWhen:
      "A pessoa quiser verificar se tem direito, prazo, quantidade de parcelas ou uma negativa."
  },
  {
    area: "trabalhista",
    number: 75,
    question: "Como funciona a homologação de um acordo trabalhista extrajudicial?",
    keywords: [
      "homologação de acordo trabalhista",
      "acordo extrajudicial trabalhista",
      "homologar acordo trabalhista"
    ],
    title: "CLT, art. 855-B — homologação de acordo extrajudicial",
    url: "https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html",
    excerpt:
      "As partes podem pedir conjuntamente a homologação de um acordo extrajudicial na Justiça do Trabalho. Cada parte deve ser representada por advogado distinto.",
    reviewWhen:
      "A dúvida exigir revisar ou redigir o acordo, avaliar renúncias ou prever o resultado da homologação."
  },
  {
    area: "previdenciario",
    number: 10,
    question: "O que é o CNIS e onde consultar o extrato?",
    keywords: [
      "cnis",
      "extrato de contribuição",
      "extrato de contribuições",
      "extrato previdenciário",
      "histórico contributivo"
    ],
    title: "Gov.br — emitir o extrato de contribuições CNIS",
    url: "https://www.gov.br/pt-br/servicos/emitir-extrato-de-contribuicao-cnis",
    excerpt:
      "O Cadastro Nacional de Informações Sociais reúne vínculos, remunerações e contribuições registrados. O titular pode obter o extrato pelo Meu INSS e conferir as informações que constam no cadastro.",
    reviewWhen:
      "A pessoa quiser analisar períodos, corrigir divergências ou confirmar tempo de contribuição."
  },
  {
    area: "previdenciario",
    number: 11,
    question: "O BPC é uma aposentadoria? É preciso ter contribuído ao INSS?",
    keywords: ["bpc", "loas", "benefício assistencial", "bpc é aposentadoria"],
    title: "INSS — Benefício de Prestação Continuada",
    url: "https://www.gov.br/inss/pt-br/noticias/como-pedir-beneficio-de-prestacao-continuada-bpc",
    excerpt:
      "O BPC é um benefício assistencial para pessoas idosas ou com deficiência que atendam aos critérios. Ele não é aposentadoria e dispensa contribuições anteriores ao INSS.",
    reviewWhen:
      "A pessoa quiser confirmar elegibilidade, renda familiar, avaliação de deficiência ou acúmulo de benefícios."
  },
  {
    area: "previdenciario",
    number: 76,
    question: "Qual a diferença entre carência e tempo de contribuição?",
    keywords: ["carência", "tempo de contribuição", "meses de contribuição"],
    title: "INSS — tempo de contribuição e carência",
    url: "https://www.gov.br/inss/pt-br/noticias/inss-tempo-de-contribuicao-nao-garante-cumprimento-de-carencia",
    excerpt:
      "Carência é a quantidade mínima de contribuições mensais exigidas para determinado benefício. Tempo de contribuição mede os períodos computáveis. Um período pode ter tratamento diferente nos dois critérios.",
    reviewWhen:
      "A pessoa quiser contar meses, períodos ou verificar requisitos para seu benefício."
  },
  {
    area: "previdenciario",
    number: 77,
    question: "Onde simular aposentadoria e o que significa o resultado?",
    keywords: [
      "simular aposentadoria",
      "simulação da aposentadoria",
      "calculadora do inss",
      "simulador"
    ],
    title: "INSS — calculadora e simulação de aposentadoria",
    url: "https://www.gov.br/inss/pt-br/assuntos/sem-confusao-calculadora-do-inss-faz-simulacao-do-tempo-que-falta-para-aposentadoria",
    excerpt:
      "No Meu INSS, a opção Simular Aposentadoria usa os dados cadastrados para estimar quanto falta para cumprir requisitos. O resultado é informativo. O INSS analisa o direito ao receber o pedido.",
    reviewWhen:
      "A pessoa quiser definir a melhor regra, corrigir períodos ou confirmar se já pode se aposentar."
  },
  {
    area: "previdenciario",
    number: 78,
    question: "O que é a carta de concessão e onde emitir?",
    keywords: ["carta de concessão", "memória de cálculo", "documento da concessão"],
    title: "Gov.br — emitir carta de concessão de benefício",
    url: "https://www.gov.br/pt-br/servicos/emitir-carta-de-concessao-de-beneficio",
    excerpt:
      "A carta de concessão informa a decisão de concessão e dados do benefício, como o cálculo do valor e o local de pagamento. Pode ser emitida pelo Meu INSS.",
    reviewWhen: "A pessoa quiser interpretar o cálculo ou conferir o valor concedido."
  },
  {
    area: "previdenciario",
    number: 79,
    question: "Para que serve um pedido de revisão de benefício do INSS?",
    keywords: [
      "revisão de benefício",
      "revisão previdenciária",
      "revisar benefício",
      "erro no cálculo do inss"
    ],
    title: "INSS — revisão de benefício",
    url: "https://www.gov.br/inss/pt-br/saiba-mais/seu-beneficio/revisao",
    excerpt:
      "A revisão permite pedir que o INSS reexamine dados usados em um benefício já concedido. Pode envolver um vínculo ou salário de contribuição que a pessoa entende que não foi considerado. O serviço de revisão está no Meu INSS.",
    reviewWhen:
      "For necessário verificar prazo, documentos, risco ou se uma revisão é cabível."
  },
  {
    area: "previdenciario",
    number: 80,
    question: "Onde consultar os pagamentos de um benefício do INSS?",
    keywords: [
      "extrato de pagamento",
      "pagamentos do inss",
      "histórico de pagamentos",
      "extrato do benefício"
    ],
    title: "Gov.br — extrato de pagamento de benefício",
    url: "https://www.gov.br/pt-br/servicos/emitir-extrato-de-pagamento-de-beneficio",
    excerpt:
      "No Meu INSS, o extrato de pagamento mostra o histórico de pagamentos do benefício, com valores e dados do pagamento.",
    reviewWhen:
      "A pessoa quiser verificar um desconto, diferença ou ausência de pagamento."
  },
  {
    area: "previdenciario",
    number: 81,
    question: "Onde fazer e acompanhar um pedido de benefício do INSS?",
    keywords: [
      "consultar pedidos",
      "acompanhar pedido",
      "novo pedido",
      "andamento do pedido",
      "pedido de benefício"
    ],
    title: "INSS — serviços digitais do Meu INSS",
    url: "https://www.gov.br/inss/pt-br/assuntos/noticias/conheca-os-5-servicos-mais-acessados-do-meu-inss",
    excerpt:
      "No Meu INSS, a opção Novo Pedido permite solicitar serviços e benefícios. Em Consultar Pedidos, é possível acompanhar o protocolo e verificar a situação e eventuais exigências.",
    reviewWhen:
      "A dúvida for sobre qual benefício pedir, contestar uma decisão ou avaliar atraso."
  },
  {
    area: "previdenciario",
    number: 82,
    question: "O que significa cumprir exigência no Meu INSS?",
    keywords: [
      "cumprir exigência",
      "cumprimento de exigência",
      "anexar documentos no meu inss",
      "em exigência"
    ],
    title: "INSS — cumprimento de exigência",
    url: "https://www.gov.br/inss/pt-br/assuntos/noticias/201ccumprimento-de-exigencia201d-confira-se-voce-precisa-entregar-algum-documento-para-que-seu-pedido-seja-concluido",
    excerpt:
      "Uma exigência é um pedido de informação ou documentação adicional. Abra o requerimento em Consultar Pedidos no Meu INSS, leia a solicitação e use Cumprir Exigência para responder pelo canal oficial.",
    reviewWhen:
      "A pessoa quiser ajuda para interpretar a exigência ou reunir a prova específica do seu pedido."
  },
  {
    area: "previdenciario",
    number: 83,
    question: "O que é auxílio por incapacidade temporária, antigo auxílio-doença?",
    keywords: [
      "auxílio-doença",
      "auxílio doença",
      "incapacidade temporária",
      "afastamento por doença"
    ],
    title: "INSS — auxílio por incapacidade temporária",
    url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/beneficios-por-incapacidade/auxilio-por-incapacidade-temporaria",
    excerpt:
      "É um benefício previdenciário para segurados que comprovem incapacidade temporária para o trabalho ou atividade habitual, conforme a avaliação e os requisitos do INSS.",
    reviewWhen:
      "A pessoa quiser confirmar direito, prazo, documentação médica ou contestar uma decisão."
  },
  {
    area: "previdenciario",
    number: 84,
    question: "O que é pensão por morte do INSS?",
    keywords: [
      "pensão por morte",
      "benefício para dependentes",
      "falecimento do segurado"
    ],
    title: "INSS — pensão por morte",
    url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/pensoes/pensao-por-morte",
    excerpt:
      "É um benefício pago aos dependentes de segurado do INSS que faleceu, observadas as regras do benefício. A duração pode variar conforme a categoria do dependente e outras condições.",
    reviewWhen:
      "A pessoa quiser saber se é dependente, quanto pode receber ou por quanto tempo."
  },
  {
    area: "previdenciario",
    number: 85,
    question: "O que é salário-maternidade?",
    keywords: [
      "salário-maternidade",
      "salário maternidade",
      "benefício de maternidade",
      "benefício por adoção"
    ],
    title: "INSS — salário-maternidade",
    url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/salario-maternidade/salario-maternidade",
    excerpt:
      "O salário-maternidade é um benefício previdenciário ligado ao afastamento por nascimento, adoção ou guarda judicial para fins de adoção, entre as hipóteses previstas. O canal de solicitação depende da categoria do segurado.",
    reviewWhen:
      "A pessoa quiser confirmar requisitos, duração, valor ou por qual canal deve pedir no próprio caso."
  },
  {
    area: "cidadania",
    number: 86,
    question:
      "Quais documentos básicos o portal português indica para filho de português nascido no exterior?",
    keywords: [
      "filho de português",
      "filha de português",
      "mãe portuguesa",
      "pai português",
      "certidões para filho de português"
    ],
    title: "Justiça de Portugal — nacionalidade para filho de português",
    url: "https://justica.gov.pt/Como-obter-nacionalidade-portuguesa/Nasceu-no-estrangeiro-e-e-filho-de-um-portugues",
    excerpt:
      "A lista oficial inclui certidão de nascimento de quem pede, informações ou certidão do registro de nascimento do progenitor português e declaração para atribuição da nacionalidade. Confira a lista completa e as exigências de legalização no portal.",
    reviewWhen:
      "A pessoa quiser confirmar direito, validade de documentos ou a lista final para seu processo."
  },
  {
    area: "cidadania",
    number: 87,
    question:
      "Quais certidões separar para um pedido de nacionalidade portuguesa como neto?",
    keywords: [
      "neto de português",
      "neta de português",
      "avô português",
      "avó portuguesa",
      "certidões para neto"
    ],
    title: "Justiça de Portugal — documentação de neto de português",
    url: "https://justica.gov.pt/Como-obter-nacionalidade-portuguesa/E-neto-de-um-portugues",
    excerpt:
      "A lista oficial inclui as certidões de nascimento de quem pede, do pai ou da mãe da linha portuguesa e do avô ou da avó portuguesa. Consulte os demais documentos e as condições de legalização no portal oficial.",
    reviewWhen:
      "For preciso confirmar direito, comprovar o vínculo familiar ou avaliar documentos e exceções."
  },
  {
    area: "cidadania",
    number: 88,
    question: "Como acompanhar um processo de nacionalidade portuguesa?",
    keywords: [
      "acompanhar cidadania portuguesa",
      "acompanhar nacionalidade",
      "estado do processo de nacionalidade",
      "código de consulta",
      "senha do processo"
    ],
    title: "Justiça de Portugal — consulta do processo de nacionalidade",
    url: "https://justica.gov.pt/Servicos/Consultar-estado-do-processo-de-nacionalidade",
    excerpt:
      "O portal da Justiça de Portugal oferece consulta do estado do pedido de nacionalidade com o código de acesso do processo. Use o código somente na página oficial de consulta.",
    reviewWhen:
      "Houver dúvida sobre uma notificação, exigência, indeferimento ou medida para um processo específico."
  },
  {
    area: "cidadania",
    number: 89,
    question: "Onde apresentar um pedido de nacionalidade portuguesa?",
    keywords: [
      "onde pedir cidadania portuguesa",
      "pedido online de nacionalidade",
      "pedido em portugal",
      "balcão da nacionalidade",
      "mandatário"
    ],
    title: "IRN — serviço de nacionalidade on-line",
    url: "https://irn.justica.gov.pt/Servicos/Cidadao/Nacionalidade/Nacionalidade-online-perguntas-e-respostas",
    excerpt:
      "A apresentação on-line é feita por advogado ou solicitador habilitado. O guia da Justiça de Portugal indica os canais aplicáveis a cada categoria de pedido, incluindo balcões e opções de envio ou atendimento quando previstas.",
    reviewWhen:
      "A pessoa quiser definir o canal ou o procedimento para seu pedido específico."
  },
  {
    area: "cidadania",
    number: 90,
    question:
      "Onde consultar o procedimento italiano por descendência para maiores nascidos no exterior?",
    keywords: [
      "cidadania italiana",
      "descendência italiana",
      "iure sanguinis",
      "jure sanguinis",
      "italiana para maiores"
    ],
    title:
      "Consulado da Itália em São Paulo — reconhecimento por descendência para adultos",
    url: "https://conssanpaolo.esteri.it/pt/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/cittadinanza/cittadinanza-iure-sanguinis/",
    excerpt:
      "O Consulado da Itália em São Paulo publica as categorias para maiores nascidos no exterior e listas de documentos por categoria. A legislação vigente limita a transmissão em determinadas situações. Consulte a categoria e o posto consular competente antes de reunir a documentação.",
    reviewWhen:
      "A pessoa quiser confirmar se uma ascendência, data, cidadania anterior ou regra de transição dá direito ao reconhecimento."
  },
  {
    area: "cidadania",
    number: 91,
    question:
      "Como agendar no Consulado da Itália em São Paulo para reconhecimento de adulto por descendência?",
    keywords: [
      "agendar cidadania italiana",
      "prenotami",
      "agendamento consulado italiano",
      "vaga consulado"
    ],
    title: "Consulado da Itália em São Paulo — agendamento para maiores por descendência",
    url: "https://conssanpaolo.esteri.it/pt/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/cittadinanza/cittadinanza-iure-sanguinis/",
    excerpt:
      "O Consulado informa que a apresentação do pedido de reconhecimento para maiores por descendência requer agendamento pelo Prenot@mi. O site anuncia as aberturas de vagas e orienta o comparecimento com os documentos da categoria.",
    reviewWhen:
      "A pessoa quiser tratar de um agendamento ou pedido específico, ou da categoria aplicável."
  },
  {
    area: "cidadania",
    number: 92,
    question: "Onde consultar o procedimento de cidadania italiana para menores?",
    keywords: [
      "cidadania italiana de menor",
      "menor de idade italiano",
      "filhos menores",
      "registro italiano do filho"
    ],
    title: "Consulado da Itália em São Paulo — procedimentos para filhos menores",
    url: "https://conssanpaolo.esteri.it/pt/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/cittadinanza/acquisto-citt-minori/",
    excerpt:
      "O Consulado tem uma seção própria para filhos menores, com instruções e formulários conforme a modalidade. Consulte essa seção para verificar como apresentar os documentos.",
    reviewWhen:
      "A pessoa quiser determinar a modalidade, o prazo ou se um menor específico se enquadra."
  },
  {
    area: "cidadania",
    number: 93,
    question: "Para que serve a Apostila da Haia em uma certidão?",
    keywords: [
      "apostila da haia",
      "apostilar certidão",
      "apostilamento",
      "autenticar documento no exterior"
    ],
    title: "CNJ — Apostila da Haia",
    url: "https://www.cnj.jus.br/poder-judiciario/relacoes-internacionais/apostila-da-haia/perguntas-frequentes-5/",
    excerpt:
      "A apostila certifica a origem de um documento público para apresentação em outro país signatário da Convenção. No Brasil, ela é emitida por autoridades autorizadas, como os cartórios habilitados pelo CNJ.",
    reviewWhen:
      "A pessoa quiser verificar se um documento específico precisa de apostila ou se será aceito no exterior."
  },
  {
    area: "cidadania",
    number: 94,
    question: "Apostilar um documento substitui a tradução?",
    keywords: [
      "apostila e tradução",
      "tradução juramentada",
      "traduzir certidão",
      "tradução de certidão"
    ],
    title: "CNJ — apostilamento de documentos e traduções",
    url: "https://www.cnj.jus.br/poder-judiciario/relacoes-internacionais/apostila-da-haia/perguntas-frequentes-5/",
    excerpt:
      "A apostila certifica a origem do documento e a tradução torna seu conteúdo acessível no idioma exigido. Confira com o órgão de destino se exige tradução certificada e se a tradução também precisa ser apostilada.",
    reviewWhen:
      "For necessário conferir o formato ou a aceitação de uma tradução específica."
  },
  {
    area: "cidadania",
    number: 95,
    question: "Como funciona a retificação de certidão para cidadania?",
    keywords: [
      "retificação de certidão",
      "corrigir certidão",
      "erro na certidão",
      "nome diferente na certidão",
      "retificação de registro"
    ],
    title: "Lei de Registros Públicos, arts. 109 e 110 — retificação de registros civis",
    url: "https://www2.camara.leg.br/legin/fed/lei/1970-1979/lei-6015-31-dezembro-1973-357511-normaatualizada-pl.html",
    excerpt:
      "Alguns erros que podem ser constatados de imediato podem ser corrigidos pelo cartório. A via judicial pode ser necessária quando a correção depende de apuração ou prova. Compare os registros e reúna as certidões que mostram a divergência.",
    reviewWhen:
      "For preciso avaliar a divergência concreta, definir a via de correção ou saber se a autoridade estrangeira aceita a certidão."
  }
];
