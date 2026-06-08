export type NavItem = {
  label: string;
  href: string;
};

export type PracticeHighlight = {
  title: string;
  description: string;
};

export type PracticeArea = {
  title: string;
  slug: string;
  description: string;
  highlights: PracticeHighlight[];
  seoDescription: string;
};
