const formatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});

/** Recebe ISO (`2026-08-06`) e devolve "06 de agosto de 2026". */
export function formatArticleDate(iso: string) {
  return formatter.format(new Date(`${iso}T00:00:00Z`));
}
