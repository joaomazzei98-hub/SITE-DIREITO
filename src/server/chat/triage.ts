import {
  areaSchema,
  chatReplySchema,
  legalAreas,
  type ChatReply,
  type LegalArea
} from "@/lib/chat/contracts";

const signals: Record<LegalArea, RegExp> = {
  cidadania:
    /\b(?:cidadania|nacionalidade) (?:italiana|portuguesa|europeia)\b|\b(?:iure sanguinis|apostil\w*|retifica\w* (?:de )?(?:certidao|registro civil))\b/i,
  imobiliario:
    /\b(im[oó]v\w*|loca[cç]\w*|locat\w*|aluguel|condom[ií]n\w*|matr[ií]cula|usucapi[aã]o|despejo|escritura|inquilin\w*)\b/i,
  familia:
    /\b(fam[ií]lia|div[oó]rc\w*|paternidade|filia[cç]\w*|guarda|alimentos|pens[aã]o aliment[ií]cia|invent[aá]ri\w*|heran[cç]a|partilha|sucess[oõ]es|uni[aã]o est[aá]vel)\b/i,
  consumidor:
    /\b(consumidor|garantia|produto|reembolso|estorno|compra online|procon|publicidade enganosa|loja)\b/i,
  trabalhista:
    /\b(trabalh\w*|demiss[aã]o|empreg\w*|rescis[aã]o|fgts|horas extras|sal[aá]rio|justa causa|carteira assinada)\b/i,
  previdenciario:
    /\b(previden\w*|aposent\w*|inss|bpc|loas|cnis|benef[ií]cio|pens[aã]o por morte|aux[ií]lio doen[cç]a)\b/i,
  civil:
    /\b(civil|cobran[cç]a|d[ií]vida|indeniza[cç]\w*|contrat\w*|acidente|danos?|responsabilidade)\b/i
};

const areaTopics: Record<LegalArea, string> = {
  imobiliario: "aluguéis, escritura, registro de imóveis e usucapião",
  civil: "contratos civis, danos, indenizações e cobranças",
  familia: "divórcio, união estável, guarda, alimentos, inventário e partilha",
  consumidor: "garantias, defeitos, trocas e compras pela internet",
  trabalhista: "rescisão, FGTS, férias, décimo terceiro e jornada",
  previdenciario: "CNIS, aposentadoria, BPC e outros serviços do INSS",
  cidadania: "cidadania italiana e portuguesa, certidões e apostilas"
};

const emergency =
  /(?:\b(?:perigo|risco) (?:imediato|agora)|amea[cç]\w*.{0,45}(?:matar|arma|agora)|(?:est[aá] (?:me )?(?:agredindo|batendo)|vai me matar|(?:vou|quero) (?:me matar|me suicidar)|vou (?:matar|ferir)|estou sangrando|n[aã]o consigo respirar))/i;
const urgent =
  /\b(?:intima[cç][aã]o|audi[eê]ncia|prazo|medida protetiva|mandado)\b.{0,70}\b(?:hoje|amanh[aã]|vence|pr[oó]xim\w*|urgente|acaba|poucos dias)\b|\b(?:vence|hoje|amanh[aã])\b.{0,55}\b(?:audi[eê]ncia|prazo|intima[cç][aã]o)\b/i;
const outside =
  /\b(?:cidadania|passaporte|crime|criminal|tribut[aá]ri\w*|imposto|eleitoral|militar)\b/i;
const wantsStaff =
  /\b(?:advogad[oa]|atendimento|consulta|agendar|atendente|falar com|humano|humana)\b/i;
const policyAttack =
  /(?:ignore|desconsidere|esque[cç]a).{0,45}(?:instru[cç][oõ]es|regras|prompt)|(?:prompt|mensagem) (?:de sistema|intern[oa])/i;
const exactIdentifier =
  /(?:\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b|\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|\b\d{6,}\b|(?:\+55\s*)?(?:\(\d{2}\)|\d{2})\s*\d{4,5}[- ]?\d{4}\b)/gi;

export function redactQuestion(question: string) {
  return question.replace(exactIdentifier, "[dado removido]");
}

export function attemptsPolicyOverride(question: string) {
  return policyAttack.test(searchable(question));
}

function searchable(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "");
}

export function areaIntroductionReply(question: string): ChatReply | null {
  const text = searchable(question)
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, "");
  const area = (Object.keys(legalAreas) as LegalArea[]).find(
    (key) => searchable(legalAreas[key]).toLowerCase() === text
  );
  if (!area) return null;
  return {
    ...informationReply(area, []),
    requires_human: false,
    needs_more_information: true,
    suggested_action: "perguntar",
    response:
      "Em " +
      legalAreas[area] +
      ", posso esclarecer dúvidas básicas sobre " +
      areaTopics[area] +
      ". Qual é a sua dúvida?"
  };
}

export function priorityFor(question: string) {
  const text = searchable(question);
  return emergency.test(text) ? "critica" : urgent.test(text) ? "elevada" : "regular";
}

export function ruleTriage(question: string, previous: string[] = []): ChatReply {
  const introduction = areaIntroductionReply(question);
  if (introduction) return introduction;
  const priority = priorityFor(question);
  const text = searchable(question);
  const history = previous.map(searchable);
  const legalMatches = (Object.keys(signals) as LegalArea[]).filter((area) =>
    signals[area].test(text)
  );
  const legalArea =
    legalMatches[0] ??
    (Object.keys(signals) as LegalArea[]).find((area) =>
      history.some((entry) => signals[area].test(entry))
    ) ??
    null;
  const base = {
    legal_area: legalArea,
    secondary_areas: legalMatches.slice(1, 4),
    priority,
    requires_human: true,
    needs_more_information: false,
    source_references: []
  } as const;

  if (priority === "critica")
    return chatReplySchema.parse({
      ...base,
      intent: "urgencia",
      suggested_action: "emergencia",
      response:
        "Se houver perigo imediato, vá para um local seguro se puder e acione os serviços oficiais de emergência. Não espere uma resposta do escritório para buscar ajuda."
    });

  if (priority === "elevada")
    return chatReplySchema.parse({
      ...base,
      intent: "urgencia",
      suggested_action: "atendimento",
      response:
        "Você mencionou um possível prazo próximo. Busque atendimento jurídico com prioridade. Este chat não confirma datas nem calcula prazos."
    });

  if (policyAttack.test(text))
    return chatReplySchema.parse({
      ...base,
      intent: "fora_do_escopo",
      legal_area: null,
      secondary_areas: [],
      suggested_action: "perguntar",
      requires_human: false,
      needs_more_information: true,
      response:
        "Posso ajudar com informações das áreas jurídicas indicadas neste chat ou encaminhar um pedido de atendimento."
    });

  if (outside.test(text) && !signals.cidadania.test(text))
    return chatReplySchema.parse({
      ...base,
      intent: "fora_do_escopo",
      legal_area: null,
      secondary_areas: [],
      suggested_action: "atendimento",
      response:
        "Esse tema está fora do escopo do assistente. Consulte o contato do escritório para verificar as opções de atendimento."
    });

  if (wantsStaff.test(text))
    return chatReplySchema.parse({
      ...base,
      intent: "atendimento",
      suggested_action: "atendimento",
      response:
        "Você pode pedir atendimento do escritório. Revise o que deseja compartilhar e envie apenas os dados de contato necessários."
    });

  return informationReply(legalArea, legalMatches.slice(1, 4));
}

export function informationReply(
  area: LegalArea | null,
  secondary: LegalArea[]
): ChatReply {
  return {
    intent: "informacao",
    legal_area: area,
    secondary_areas: secondary.filter(
      (value) => areaSchema.safeParse(value).success && value !== area
    ),
    priority: "regular",
    requires_human: Boolean(area),
    needs_more_information: !area,
    suggested_action: area ? "atendimento" : "perguntar",
    source_references: [],
    response: area
      ? "O assunto parece envolver " +
        legalAreas[area] +
        ". Para responder à sua pergunta com segurança, é necessária a avaliação da equipe. Selecione Atendimento humano para continuar."
      : "Qual é a área ou o assunto da sua dúvida? Conte em poucas palavras, sem incluir nomes, documentos ou dados de terceiros."
  };
}

export function humanHandoffReply(
  area: LegalArea | null,
  secondary: LegalArea[] = []
): ChatReply {
  return {
    ...informationReply(area, secondary),
    intent: "atendimento",
    requires_human: true,
    needs_more_information: false,
    suggested_action: "atendimento",
    response:
      "Para responder à sua pergunta com segurança, é necessária a avaliação da nossa equipe. Selecione Atendimento humano para continuar com o escritório."
  };
}
