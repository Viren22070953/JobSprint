import { useEffect, useRef, useState } from "react";

const useIntersection = (options = { threshold: 0.2 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, visible];
};

export default useIntersection;
