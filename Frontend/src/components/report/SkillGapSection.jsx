import { Target } from "lucide-react";
import GlassCard from "../ui/GlassCard.jsx";
import SeverityBadge, { normalizeSeverity } from "../ui/SeverityBadge.jsx";

const order = ["high", "medium", "low"];

const SkillGapSection = ({ gaps = [] }) => {
  const grouped = order.map((severity) => ({
    severity,
    items: gaps.filter((gap) => normalizeSeverity(gap.severity) === severity),
  }));
  const highCount = grouped.find((group) => group.severity === "high")?.items.length || 0;

  return (
    <section className="report-block">
      <div className="report-block__heading">
        <Target />
        <div>
          <h2>Skill Gaps</h2>
          <p>{gaps.length} skills identified · {highCount} high priority</p>
        </div>
      </div>
      <GlassCard className="skill-gap-panel">
        {grouped.map((group) => (
          <div className="skill-group" key={group.severity}>
            <h3>{group.severity} priority</h3>
            <div className="skill-group__tags">
              {group.items.length ? group.items.map((gap, index) => (
                <SeverityBadge key={`${gap.skill}-${index}`} severity={group.severity}>{gap.skill}</SeverityBadge>
              )) : <span className="muted">No {group.severity} priority gaps</span>}
            </div>
          </div>
        ))}
      </GlassCard>
    </section>
  );
};

export default SkillGapSection;
