const SkeletonLoader = ({ className = "", height = 24 }) => (
  <div className={`skeleton ${className}`.trim()} style={{ height }} />
);

export default SkeletonLoader;
