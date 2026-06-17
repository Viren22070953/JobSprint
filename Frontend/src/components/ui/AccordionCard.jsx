import { ChevronDown } from "lucide-react";
import GlassCard from "./GlassCard.jsx";

const AccordionCard = ({ open, onToggle, badge, title, meta, children, accent = "indigo" }) => (
  <GlassCard className={`accordion-card accordion-card--${accent}`}>
    <button className="accordion-card__trigger" onClick={onToggle} type="button">
      <span className="accordion-card__badge">{badge}</span>
      <strong>{title}</strong>
      {meta && <span className="accordion-card__meta">{meta}</span>}
      <ChevronDown className={open ? "is-open" : ""} />
    </button>
    <div className={`accordion-card__panel ${open ? "is-open" : ""}`}>{children}</div>
  </GlassCard>
);

export default AccordionCard;
