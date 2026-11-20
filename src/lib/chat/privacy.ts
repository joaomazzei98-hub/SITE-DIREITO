// Removes recognizable identifiers, not all personal or sensitive information.
// Keep the more specific formats first to avoid partially removing an identifier.
const obviousIdentifiers =
  /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b|\b\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}\b|\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b|\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|(?:\+55\s*)?(?:\(\d{2}\)|\d{2})\s*\d{4,5}[- ]?\d{4}\b|\b\d{5}-\d{3}\b|\b(?:RG|passaporte|PIS|PASEP|NIS|NIT)\s*(?:(?:n[ºo°.]|número|numero)\s*)?[:#-]?\s*[a-z0-9][a-z0-9.\/-]*\d[a-z0-9.\/-]*\b|\b\d{6,}\b/gi;

export function redactIdentifiers(text: string) {
  return text.replace(obviousIdentifiers, "[dado removido]");
}

export function containsIdentifiers(text: string) {
  return redactIdentifiers(text) !== text;
}
