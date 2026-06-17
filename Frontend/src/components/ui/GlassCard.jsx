const GlassCard = ({ as: Component = "div", className = "", hover = false, children, ...props }) => (
  <Component className={`glass-card ${hover ? "hoverable" : ""} ${className}`.trim()} {...props}>
    {children}
  </Component>
);

export default GlassCard;
