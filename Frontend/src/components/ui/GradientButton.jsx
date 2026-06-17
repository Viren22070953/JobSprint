const GradientButton = ({ as: Component = "button", variant = "primary", className = "", children, ...props }) => (
  <Component className={`btn-${variant} ${className}`.trim()} {...props}>
    {children}
  </Component>
);

export default GradientButton;
