import { SkinParameter } from "@/types";

export const PARAMETER_DEFINITIONS = [
  {
    id: "texture",
    name: "Skin Texture",
    description: "Surface smoothness and fine line visibility",
    weight: 0.20,
    icon: "Sparkles",
    tip: "Regular exfoliation and hydration improve texture over time.",
  },
  {
    id: "evenness",
    name: "Evenness",
    description: "Skin tone uniformity and discoloration",
    weight: 0.18,
    icon: "Palette",
    tip: "Vitamin C and SPF are key for maintaining even skin tone.",
  },
  {
    id: "radiance",
    name: "Radiance",
    description: "Skin luminosity and healthy glow",
    weight: 0.15,
    icon: "Sun",
    tip: "Antioxidants and adequate sleep boost natural radiance.",
  },
  {
    id: "firmness",
    name: "Firmness",
    description: "Skin elasticity and contour appearance",
    weight: 0.15,
    icon: "Shield",
    tip: "Collagen-boosting treatments help maintain firmness.",
  },
  {
    id: "pores",
    name: "Pore Appearance",
    description: "Visible pore size and density",
    weight: 0.12,
    icon: "CircleDot",
    tip: "Niacinamide and professional peels refine pore appearance.",
  },
  {
    id: "underEye",
    name: "Under-Eye Area",
    description: "Eye contour quality and darkness",
    weight: 0.10,
    icon: "Eye",
    tip: "Targeted eye treatments and hydration reduce visible fatigue.",
  },
  {
    id: "redness",
    name: "Redness Balance",
    description: "Surface redness and inflammation visibility",
    weight: 0.05,
    icon: "Heart",
    tip: "Calming ingredients like centella help balance redness.",
  },
  {
    id: "hydration",
    name: "Hydration Surface",
    description: "Surface moisture and reflectivity",
    weight: 0.05,
    icon: "Droplets",
    tip: "Hyaluronic acid and barrier repair support surface hydration.",
  },
];

export function createParameter(
  def: (typeof PARAMETER_DEFINITIONS)[0],
  score: number
): SkinParameter {
  let severity: SkinParameter["severity"] = "priority";
  if (score >= 90) severity = "excellent";
  else if (score >= 75) severity = "good";
  else if (score >= 60) severity = "fair";
  else if (score >= 40) severity = "attention";

  return {
    ...def,
    score,
    severity,
  };
}
