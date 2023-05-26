import { useEffect, useRef, useState } from "react";

const useIntersectionObsever = (targetRef) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const observer = useRef();

  useEffect(() => {
    if (!observer.current) {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          }
        });
      };

      observer.current = new window.IntersectionObserver(observerCallback, {
        threshold: 0.5,
      });
    }

    if (targetRef.current) {
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [targetRef]);

  return isInViewport;
};

export default useIntersectionObsever;
