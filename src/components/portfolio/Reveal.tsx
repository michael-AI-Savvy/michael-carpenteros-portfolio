import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  id?: string;
}

export function Reveal({ children, className, delay = 0, as = "div", id }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      id={id}
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
