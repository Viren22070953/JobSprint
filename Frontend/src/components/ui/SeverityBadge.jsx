/* eslint-disable react-refresh/only-export-components */
const normalizeSeverity = (severity = "medium") => {
  const value = String(severity).toLowerCase();
  if (value.includes("high")) return "high";
  if (value.includes("low")) return "low";
  return "medium";
};

const SeverityBadge = ({ severity = "medium", children }) => {
  const normalized = normalizeSeverity(severity);
  return <span className={`severity-badge severity-badge--${normalized}`}>{children || normalized}</span>;
};

export { normalizeSeverity };
export default SeverityBadge;
