import { memo } from "react";
import useCountUp from "../../hooks/useCountUp.js";
import GlassCard from "../ui/GlassCard.jsx";

const getReaction = (score) => {
  if (score >= 90) return "Outstanding fit! You're a top candidate for this role.";
  if (score >= 70) return "Great match! Focus on the highlighted gaps.";
  if (score >= 50) return "Decent start. Your prep plan will make a big difference.";
  return "Challenging role, but very achievable with focused prep.";
};

const MatchScoreGauge = memo(({ score = 0 }) => {
  const displayScore = useCountUp(score, 1000);
  const radius = 94;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const chips = [
    { label: "Role Fit", value: Math.min(score + 4, 100) },
    { label: "Skills Covered", value: Math.max(score - 6, 0) },
    { label: "Resume Strength", value: Math.min(score + 1, 100) },
  ];

  return (
    <GlassCard className="match-score-card">
      <div className="score-orbit">
        {score > 80 && (
          <div className="confetti-burst" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} style={{ "--x": `${(index - 8) * 15}px`, animationDelay: `${index * 40}ms` }} />
            ))}
          </div>
        )}
        <svg className="score-svg" viewBox="0 0 240 240" role="img" aria-label={`${score}% match score`}>
          <defs>
            <linearGradient id="matchScoreGradient" x1="24" y1="24" x2="216" y2="216" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--accent-start)" />
              <stop offset="38%" stopColor="var(--accent-cyan)" />
              <stop offset="70%" stopColor="var(--success)" />
              <stop offset="100%" stopColor="var(--accent-end)" />
            </linearGradient>
          </defs>
          <circle className="score-svg__track" cx="120" cy="120" r={radius} />
          <circle
            className="score-svg__value"
            cx="120"
            cy="120"
            r={radius}
            stroke="url(#matchScoreGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-center">
          <strong>{displayScore}%</strong>
          <span>Match Score</span>
        </div>
      </div>
      <p className="score-reaction">{getReaction(score)}</p>
      <div className="score-chips">
        {chips.map((chip) => (
          <span key={chip.label}>
            <strong>{chip.value}%</strong>
            {chip.label}
          </span>
        ))}
      </div>
    </GlassCard>
  );
});

MatchScoreGauge.displayName = "MatchScoreGauge";

export default MatchScoreGauge;
