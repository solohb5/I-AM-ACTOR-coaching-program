import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// CURRENT PAGES (Active)
import CollinsActual from "@/pages/collins-actual"; // The Door - Main landing
import Secret from "@/pages/secret";
import Challenge from "@/pages/challenge";
import Quiz from "@/pages/quiz";
import Toolkit from "@/pages/toolkit";
import Success from "@/pages/success";
import Coaching from "@/pages/coaching";
import CoachingPrivate from "@/pages/coaching-private"; // Email list offer ($99/$225)
import Mentorship from "@/pages/mentorship"; // High-ticket version (preserved)
import NotFound from "@/pages/not-found";

// OLD PAGES (Archived - import only for reference)
// import Home from "@/pages/home";
// import HomeCollins from "@/pages/home-collins";
// import CollinsClean from "@/pages/collins-clean";
// import CollinsEnhanced from "@/pages/collins-enhanced";
// import Method from "@/pages/method";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Handle hash anchors (e.g., /#challenge)
    if (location.includes('#')) {
      const hash = location.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <Switch>
      {/* MAIN SITE - PUBLIC PAGES */}
      <Route path="/" component={CollinsActual}/> {/* The Door - Landing Page */}
      <Route path="/actual" component={CollinsActual}/> {/* Alias for The Door */}
      <Route path="/secret" component={Secret}/>
      <Route path="/challenge" component={Challenge}/>
      
      {/* HIDDEN PAGES - Direct links only */}
      <Route path="/quiz" component={Quiz}/>
      <Route path="/toolkit" component={Toolkit}/>
      <Route path="/success" component={Success}/>
      <Route path="/coaching" component={Coaching}/>
      <Route path="/coaching-private" component={CoachingPrivate}/> {/* Email list offer */}
      <Route path="/mentorship" component={Mentorship}/> {/* High-ticket preserved version */}
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        // Add a slight delay/lag to the outline for smooth feel
        outlineRef.current.animate({
          transform: `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
        }, { duration: 500, fill: "forwards" });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="hidden md:block">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScroll />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;