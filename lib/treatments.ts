import { Treatment } from "@/types";

export const TREATMENTS: Treatment[] = [
  {
    id: "chemical-peel",
    name: "Chemical Peel",
    description: "A professional exfoliation treatment that removes dead skin cells, revealing smoother, more radiant skin beneath.",
    duration: "45 min",
    priceRange: "€120 – €180",
    category: "facial",
    targetParameters: ["texture", "evenness", "pores", "radiance"],
    minScoreTrigger: 75,
  },
  {
    id: "hydration-facial",
    name: "Hydration Infusion Facial",
    description: "Deep moisture delivery using hyaluronic acid and ceramides to restore plumpness and surface reflectivity.",
    duration: "60 min",
    priceRange: "€100 – €150",
    category: "facial",
    targetParameters: ["hydration", "texture", "radiance"],
    minScoreTrigger: 70,
  },
  {
    id: "ipl-photofacial",
    name: "IPL Photofacial",
    description: "Intense Pulsed Light therapy targeting discoloration, redness, and uneven skin tone for a balanced complexion.",
    duration: "30 min",
    priceRange: "€200 – €300",
    category: "laser",
    targetParameters: ["evenness", "redness", "radiance"],
    minScoreTrigger: 70,
  },
  {
    id: "microneedling",
    name: "Microneedling",
    description: "Collagen induction therapy that improves texture, firmness, and fine lines through controlled micro-injuries.",
    duration: "60 min",
    priceRange: "€250 – €350",
    category: "facial",
    targetParameters: ["texture", "firmness", "pores"],
    minScoreTrigger: 65,
  },
  {
    id: "under-eye-revive",
    name: "Under-Eye Revive",
    description: "Specialized treatment targeting dark circles, puffiness, and fine lines around the delicate eye contour.",
    duration: "30 min",
    priceRange: "€90 – €130",
    category: "facial",
    targetParameters: ["underEye", "radiance"],
    minScoreTrigger: 70,
  },
  {
    id: "radiofrequency",
    name: "Radiofrequency Firming",
    description: "Non-invasive skin tightening using RF energy to stimulate collagen and improve elasticity.",
    duration: "45 min",
    priceRange: "€180 – €250",
    category: "body",
    targetParameters: ["firmness", "texture"],
    minScoreTrigger: 65,
  },
];

export function getRecommendations(
  parameterScores: { id: string; score: number }[]
): Treatment[] {
  const lowParams = parameterScores.filter((p) => p.score < 75).map((p) => p.id);

  const scored = TREATMENTS.map((t) => {
    const matchCount = t.targetParameters.filter((tp) => lowParams.includes(tp)).length;
    const relevance = matchCount / t.targetParameters.length;
    return { treatment: t, relevance };
  });

  return scored
    .filter((s) => s.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3)
    .map((s) => s.treatment);
}
