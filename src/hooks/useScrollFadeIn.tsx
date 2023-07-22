import { useRef, useEffect, useCallback } from "react";

// useScrollFadeIn 함수의 옵션 타입 지정
interface ScrollFadeInOptions {
  direction?: "up" | "down" | "left" | "right" | "place";
  duration?: number;
  delay?: number;
}

// useScrollFadeIn 함수의 반환 값 타입 지정
interface ScrollFadeInResult {
  ref: React.LegacyRef<HTMLParagraphElement>;
  style: React.CSSProperties;
}

export function useScrollFadeIn({
  direction = "up",
  duration = 1,
  delay = 0,
}: ScrollFadeInOptions): ScrollFadeInResult {
  const dom = useRef<HTMLParagraphElement>(null);

  const handleDirection = (name: string) => {
    switch (name) {
      case "up":
        return "translate3d(0, 50%, 0)";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0)";
      case "right":
        return "translate3d(-50%, 0, 0)";
      case "place":
        return "translate3d(0, 0, 0)";
      default:
        return;
    }
  };

  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = dom;

      if (entry.isIntersecting) {
        // desired event
        if (current) {
          current.style.transitionProperty = "all";
          current.style.transitionDuration = `${duration}s`;
          current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
          current.style.transitionDelay = `${delay}s`;
          current.style.opacity = "1";
          current.style.transform = "translate3d(0, 0, 0)";
        }
      }
    },
    [delay, duration],
  );

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  const style: React.CSSProperties = {
    opacity: 0,
    transform: handleDirection(direction),
  };

  return {
    ref: dom,
    style: style,
  };
}
