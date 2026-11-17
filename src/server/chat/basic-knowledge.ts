import { legalAreas, type LegalArea } from "@/lib/chat/contracts";
import { practiceFaq } from "./practice-faq";
import { realEstateFaq } from "./real-estate-faq";

// Resumos conferidos em fontes oficiais e preparados para revisão do escritório.
export const basicFaqCheckedOn = "2026-11-12";
export const basicFaqReviewUntil = "2026-12-12";

export const basicFaq = [
  ...realEstateFaq.map((faq) => ({ ...faq, area: "imobiliario" as const })),
  ...practiceFaq
];

export const faqTopics = Object.fromEntries(
  Object.keys(legalAreas).map((area) => [
    area,
    basicFaq
      .filter((faq) => faq.area === area)
      .map(({ number, question }) => [number, question])
  ])
);

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

const topics = basicFaq.map((faq) => ({
  ...faq,
  id: `fb000000-0000-4000-8000-${String(faq.number).padStart(12, "0")}`,
  keywords: faq.keywords.map(normalize)
}));

export function findBasicKnowledge(
  areas: LegalArea[],
  question: string,
  now = new Date(),
  rankedNumbers: number[] = []
) {
  const today = now.toISOString().slice(0, 10);
  if (today < basicFaqCheckedOn || today > basicFaqReviewUntil) return [];
  const text = ` ${normalize(question)} `;
  return topics
    .flatMap((topic) => {
      if (!areas.includes(topic.area)) return [];
      const rank = rankedNumbers.indexOf(topic.number);
      const score = topic.keywords
        .filter((keyword) => text.includes(` ${keyword} `))
        .reduce((total, phrase) => total + phrase.split(" ").length, 0);
      if (rank === -1 && score === 0) return [];
      return [{ topic, score, rank: rank === -1 ? rankedNumbers.length : rank }];
    })
    .sort((a, b) => a.rank - b.rank || b.score - a.score)
    .slice(0, 3)
    .map(({ topic }) => ({
      id: topic.id,
      title: topic.title,
      url: topic.url,
      excerpt: topic.excerpt,
      reviewWhen: topic.reviewWhen,
      checked_on: basicFaqCheckedOn
    }));
}
