import { useEffect, useState } from "react";

const useTypewriter = (text, speed = 45) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let index = 0;
    const reset = setTimeout(() => setValue(""), 0);
    const interval = setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, speed);
    return () => {
      clearTimeout(reset);
      clearInterval(interval);
    };
  }, [text, speed]);

  return value;
};

export default useTypewriter;
