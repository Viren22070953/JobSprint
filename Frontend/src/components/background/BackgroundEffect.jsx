import { memo } from "react";

const stars = Array.from({ length: 96 }, (_, index) => {
  const x = (index * 37) % 100;
  const y = (index * 61) % 100;
  const size = 1 + (index % 2);
  const duration = 2.4 + (index % 7) * 0.28;
  const delay = -(index % 13) * 0.22;

  return { x, y, size, duration, delay };
});

const BackgroundEffect = memo(() => (
  <div className="app-background" aria-hidden="true">
    <div className="blob blob--one" />
    <div className="blob blob--two" />
    <div className="blob blob--three" />
    <div className="app-background__grid" />
    {stars.map((star, index) => (
      <span
        className="star"
        key={index}
        style={{
          "--star-x": `${star.x}%`,
          "--star-y": `${star.y}%`,
          "--star-size": `${star.size}px`,
          "--star-duration": `${star.duration}s`,
          "--star-delay": `${star.delay}s`,
        }}
      />
    ))}
    <div className="app-background__noise" />
  </div>
));

BackgroundEffect.displayName = "BackgroundEffect";

export default BackgroundEffect;
