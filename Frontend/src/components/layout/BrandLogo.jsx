import { Link } from "react-router-dom";

const BrandLogo = ({ to = "/", className = "" }) => (
  <Link className={`brand-logo ${className}`.trim()} to={to}>
    <span className="brand-logo__mark">
      <img src="/jobsprint-logo.png" alt="JobSprint logo" />
    </span>
    <span>JobSprint</span>
  </Link>
);

export default BrandLogo;
