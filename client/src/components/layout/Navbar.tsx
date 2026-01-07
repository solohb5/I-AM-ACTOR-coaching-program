import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // All pages now use light theme (storybook)
  const textColor = "text-ink";
  const hoverColor = "text-coral";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "The Door" },
    { href: "/method", label: "The Secret" },
    { href: "/challenge", label: "The Challenge" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-700 ease-out",
      scrolled ? "py-4 bg-ivory/90 backdrop-blur-sm" : "py-8 bg-transparent"
    )}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <a className="transition-opacity hover:opacity-85">
            <img
              src="/assets/images/logo-dark.png"
              alt="I AM ACTOR"
              className="h-[70px] md:h-[80px]"
            />
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "font-sans text-xs uppercase tracking-[0.1em] transition-colors relative group",
                  location === link.href ? hoverColor : `${textColor} opacity-60 hover:opacity-100 hover:${hoverColor}`
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("md:hidden p-2", textColor)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-12 bg-ivory text-ink">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "font-heading text-4xl hover:text-coral transition-colors",
                  location === link.href ? "text-coral" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}