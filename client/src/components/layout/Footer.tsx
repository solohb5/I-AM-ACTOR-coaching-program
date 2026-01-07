import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory py-32 border-t border-white/5 relative overflow-hidden theme-cinematic">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-24 items-start mb-32">
           <div>
             <h2 className="font-display text-[15vw] leading-[0.8] text-white/5 select-none pointer-events-none">ACTOR</h2>
           </div>
           
           <div className="flex flex-col md:items-end gap-16 pt-12">
              <div className="flex flex-col md:text-right gap-4">
                <span className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase">Navigation</span>
                <div className="flex flex-col gap-2 font-display text-2xl uppercase tracking-wider">
                  <Link href="/"><a className="hover:text-gold transition-colors">The Door</a></Link>
                  <Link href="/philosophy"><a className="hover:text-gold transition-colors">The Secret</a></Link>
                  <Link href="/challenge"><a className="hover:text-gold transition-colors">The Challenge</a></Link>
                </div>
              </div>

              <div className="flex gap-4">
                 {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                   <a key={social} href="#" className="font-sans text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-void transition-all duration-300">
                     {social}
                   </a>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between text-white/30 font-sans text-xs tracking-wider uppercase border-t border-white/10 pt-8">
          <div>&copy; {new Date().getFullYear()} I Am Actor. All rights reserved.</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}