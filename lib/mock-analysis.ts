import { AnalysisResult, SkinParameter } from "@/types";
import { PARAMETER_DEFINITIONS, createParameter } from "./skin-parameters";
import { getRecommendations } from "./treatments";
import { generateId } from "./utils";

export async function hashImage(file: File): Promise<number> {
  try {
    const buffer = await file.arrayBuffer();
    const view = new Uint8Array(buffer);
    let hash = 0;
    const limit = Math.min(view.length, 2000);
    for (let i = 0; i < limit; i++) {
      hash = ((hash << 5) - hash + view[i]) | 0;
    }
    return Math.abs(hash);
  } catch (err) {
    if (typeof console !== "undefined") {
      // eslint-disable-next-line no-console
      console.error("hashImage error:", err);
    }
    return Math.floor(Math.random() * 1000000);
  }
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function generateMockAnalysis(
  imageHash: number,
  chronologicalAge: number
): AnalysisResult {
  const params: SkinParameter[] = PARAMETER_DEFINITIONS.map((def, i) => {
    const base = seededRandom(imageHash + i * 997);
    const score = Math.floor(42 + base * 53);
    return createParameter(def, score);
  });

  const overallScore = Math.round(
    params.reduce((sum, p) => sum + p.score * p.weight, 0)
  );

  const ageDiff = Math.round((50 - overallScore) * 0.25);
  let skinAge = chronologicalAge + ageDiff;
  skinAge = Math.max(
    chronologicalAge - 4,
    Math.min(chronologicalAge + 10, skinAge)
  );

  const sorted = [...params].sort((a, b) => a.score - b.score);
  const priorityConcern = sorted[0];
  const topStrength = sorted[sorted.length - 1];

  const recommendations = getRecommendations(
    params.map((p) => ({ id: p.id, score: p.score }))
  );

  return {
    id: generateId(),
    overallScore,
    skinAge,
    chronologicalAge,
    parameters: params,
    priorityConcern,
    topStrength,
    recommendations,
    createdAt: new Date().toISOString(),
    isSimulation: true,
  };
}
