export const badgePhrases = [
  "J'étais là quand Papa Sagbohan faisait trembler la scène.",
  "Sa batterie rouge a marqué ma vie.",
  "Une légende vivante, une énergie inoubliable.",
  "Zémihin résonne encore dans mon cœur.",
  "J'ai dansé sur ses rythmes vodoun.",
  "Papa Danialou m'a transmis la fierté béninoise.",
  "L'homme-orchestre m'a appris la force du rythme.",
  "Ses chansons ont accompagné toute ma jeunesse.",
  "Sur scène, il est plus grand que la musique.",
  "Je célèbre une icône qui ne vieillit jamais.",
] as const;

export type BadgeFormat = "square" | "story";

export const badgeFormats: { id: BadgeFormat; label: string; ratio: string; w: number; h: number }[] = [
  { id: "square", label: "Carré (Instagram)", ratio: "1:1", w: 1080, h: 1080 },
  { id: "story", label: "Story (9:16)", ratio: "9:16", w: 1080, h: 1920 },
];
