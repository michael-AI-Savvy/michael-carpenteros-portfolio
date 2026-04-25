import { Link } from "@tanstack/react-router";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-2 backdrop-blur-xl shadow-elegant">
        <Link
          to="/"
          className="px-4 py-1.5 font-display text-sm font-semibold text-foreground"
        >
          MC<span className="text-primary">.</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="ml-1 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
