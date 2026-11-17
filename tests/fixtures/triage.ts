import type { LegalArea } from "../../src/lib/chat/contracts";

export const areaCases: Record<LegalArea, string[]> = {
  imobiliario: [
    "Tenho uma dúvida sobre a escritura de um imóvel",
    "O condomínio enviou uma notificação",
    "Dúvida sobre reajuste de aluguel",
    "Como funciona usucapião?",
    "Quero entender a matrícula",
    "A imobiliária mencionou despejo"
  ],
  civil: [
    "Gostaria de entender uma dívida antiga",
    "Existe cobrança de uma obrigação contratual?",
    "Dúvida sobre indenização",
    "Como funciona a responsabilidade civil?",
    "Um acidente causou danos",
    "Como entender um contrato entre particulares?"
  ],
  familia: [
    "Dúvida sobre guarda",
    "Como funciona o divórcio?",
    "Preciso entender um inventário",
    "O que é união estável?",
    "Dúvida sobre pensão alimentícia",
    "Como funciona a partilha?"
  ],
  consumidor: [
    "Quero entender a garantia do produto",
    "Dúvida sobre estorno",
    "Comprei em uma loja",
    "Como funciona a compra online?",
    "O que é publicidade enganosa?",
    "Como procurar o Procon?"
  ],
  trabalhista: [
    "Dúvida sobre horas extras",
    "Fui demitido e recebi a rescisão",
    "Quero entender o FGTS",
    "O que é justa causa?",
    "Tenho dúvida sobre salário",
    "Meu contrato de trabalho mudou"
  ],
  previdenciario: [
    "Como entender o extrato CNIS?",
    "O que é aposentadoria?",
    "Como funciona o BPC?",
    "Quero entender benefício do INSS",
    "Tenho dúvida sobre pensão por morte",
    "O que é auxílio doença?"
  ],
  cidadania: [
    "Como pedir cidadania portuguesa?",
    "Onde agendar a cidadania italiana?",
    "Para que serve a Apostila da Haia?",
    "Como corrigir meu registro para obter a nacionalidade portuguesa?"
  ]
};
