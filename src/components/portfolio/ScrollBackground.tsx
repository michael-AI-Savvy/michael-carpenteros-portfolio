import { useEffect, useState } from "react";

export function ScrollBackground() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScroll(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Drift orbs based on scroll progress (0 → 1)
  const orb1Y = scroll * 400;
  const orb2Y = -scroll * 300;
  const orb3Y = scroll * 200;
  const hueShift = scroll * 30;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ filter: `hue-rotate(${hueShift}deg)` }}
    >
      <div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(0, ${orb1Y}px, 0)` }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[700px] w-[700px] rounded-full bg-primary/8 blur-3xl transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(0, ${orb2Y}px, 0)` }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(0, ${orb3Y}px, 0)` }}
      />
    </div>
  );
}
