import type { ResultLevel } from "@/types/quiz";

export const resultLevels: ResultLevel[] = [
  { minScore: 90, title: "90년대 마스터", description: "당신은 진정한 90년대 키드! 모든 추억을 완벽하게 기억하고 있군요!", emoji: "👑" },
  { minScore: 70, title: "추억 소환사", description: "대부분의 추억을 기억하고 있어요! 그 시절이 그리워지지 않나요?", emoji: "✨" },
  { minScore: 50, title: "기억 탐험가", description: "절반은 기억하고 있네요. 잊고 있던 추억들을 다시 떠올려봐요!", emoji: "🔍" },
  { minScore: 30, title: "추억 초보", description: "조금 더 노력이 필요해요! 그때 그 시절을 다시 공부해볼까요?", emoji: "📚" },
  { minScore: 0, title: "시간 여행자", description: "혹시 다른 시대에서 오셨나요? 90년대 세계에 오신 것을 환영합니다!", emoji: "🚀" },
];

export function getResultLevel(score: number): ResultLevel {
  return resultLevels.find((level) => score >= level.minScore) ?? resultLevels[resultLevels.length - 1];
}
