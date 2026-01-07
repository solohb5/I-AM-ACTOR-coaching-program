import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function Secret() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isInverted, setIsInverted] = useState(true); // Start inverted (dark)

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Flip happens at 70% through the page
      const flipPoint = (documentHeight - windowHeight) * 0.7;

      // Start inverted, flip to normal at 70%
      setIsInverted(scrollPosition < flipPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#F8F8F7',
      color: '#0A0A0A',
      filter: isInverted ? 'invert(1)' : 'invert(0)',
      transition: 'filter 0.6s ease-in-out'
    }}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* NAVIGATION */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '32px 15%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(248, 248, 247, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Left: I AM ACTOR */}
        <div
          onClick={() => navigate('/actual')}
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '20px',
            fontWeight: 400,
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
            color: '#0A0A0A'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          I AM ACTOR
        </div>

        {/* Right: Minimal 2-line hamburger */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '8px'
          }}
        >
          <div style={{
            width: '32px',
            height: '2px',
            background: '#0A0A0A',
            transition: 'all 0.3s ease'
          }} />
          <div style={{
            width: '24px',
            height: '1.5px',
            background: '#0A0A0A',
            opacity: 0.6,
            transition: 'all 0.3s ease'
          }} />
        </div>
      </nav>

      {/* MENU OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(248, 248, 247, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            textAlign: 'center'
          }}>
            <div
              onClick={() => { setMenuOpen(false); navigate('/actual'); }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                color: '#0A0A0A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              The Door
            </div>
            <div
              onClick={() => { setMenuOpen(false); navigate('/secret'); }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                color: '#0A0A0A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              The Secret
            </div>
            <div
              onClick={() => { setMenuOpen(false); navigate('/challenge'); }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                color: '#0A0A0A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              The Challenge
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: THE STORY - DARK */}
      
      {/* Screen 1 - Full-bleed image placeholder */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Image Placeholder - Replace with actual Hans photo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '20px',
            fontStyle: 'italic',
            opacity: 0.3,
            color: '#F8F8F7'
          }}>
            [ Full-bleed photo: Young Hans - before the journey ]
          </p>
        </div>
        
        {/* Knight - Alone, facing right (toward the journey ahead) */}
        <img 
          src="/knightartalone(500x500px).png" 
          alt=""
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '8%',
            width: '80px',
            height: '80px',
            opacity: 0.15,
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
        />
      </section>

      {/* Screen 2 - DARK */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            I waited two years<br/>
            before I was brave enough<br/>
            to walk into my first acting class.
          </p>
        </div>
      </section>

      {/* Screen 3 - DARK */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            When I finally showed up,<br/>
            I sat in my car for two hours.
          </p>
        </div>
      </section>

      {/* Screen 4 - Two-Column Editorial Layout (Collins Style) - DARK */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          {/* LEFT: Image */}
          <div style={{
            width: '100%',
            paddingBottom: '100%',
            background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{
              position: 'absolute',
              fontFamily: "'EB Garamond', serif",
              fontSize: '18px',
              fontStyle: 'italic',
              opacity: 0.3,
              color: '#F8F8F7',
              textAlign: 'center',
              padding: '0 20px'
            }}>
              [ Photo: Hans in class/training ]
            </p>
          </div>

          {/* RIGHT: Text */}
          <div>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
              marginBottom: '32px'
            }}>
              Then I threw $50,000<br/>
              at classes.
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.5,
              opacity: 0.8
            }}>
              Meisner.<br/>
              Scene study.<br/>
              On-camera technique.<br/>
              <br/>
              All of it.
            </p>
          </div>
        </div>
      </section>

      {/* Screen 5 - DARK */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            I left every class<br/>
            feeling worse<br/>
            than when I walked in.
          </p>
        </div>
      </section>

      {/* Screen 6 - DARK */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            At 33, without a single credit,<br/>
            I quit.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE SHIFT - FLIP POINT (Dark → Light at 70%) */}

      {/* Screen 7 - THE TURNING POINT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(56px, 8vw, 96px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Then something changed.
          </p>
        </div>
        
        {/* Knight - Looking back left (the turn) */}
        <img 
          src="/knightartalone(500x500px).png" 
          alt=""
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '100px',
            height: '100px',
            opacity: 0.12,
            objectFit: 'contain',
            pointerEvents: 'none',
            transform: 'scaleX(-1)' // Flip to face left
          }}
        />
      </section>

      {/* Screen 8 - LIGHT (after the flip) */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            I stopped trying to "become" an actor.
          </p>
        </div>
      </section>

      {/* Screen 9 - LIGHT with Image */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%',
          textAlign: 'center'
        }}>
          {/* Image */}
          <div style={{
            width: '70%',
            margin: '0 auto 64px',
            paddingBottom: '56.25%',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{
              position: 'absolute',
              fontFamily: "'EB Garamond', serif",
              fontSize: '18px',
              fontStyle: 'italic',
              opacity: 0.4,
              color: '#0A0A0A',
              textAlign: 'center'
            }}>
              [ Photo: Hans on set - free, in his element ]
            </p>
          </div>

          {/* Text */}
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            I started playing again.
          </p>
        </div>
      </section>

      {/* Screen 10 - LIGHT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '48px'
          }}>
            Like a kid.
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            opacity: 0.8
          }}>
            Like the version of me who used to pretend<br/>
            without permission.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE PROOF */}

      {/* Screen 11 - Big Number (Collins Style) */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(120px, 18vw, 180px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            marginBottom: '24px'
          }}>
            45+
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.6
          }}>
            Credits on IMDB
          </p>
        </div>
      </section>

      {/* Screen 12 - Editorial Layout: Credits & Insight */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          {/* LEFT: Screenshot placeholder */}
          <div style={{
            width: '100%',
            paddingBottom: '56.25%',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{
              position: 'absolute',
              fontFamily: "'EB Garamond', serif",
              fontSize: '18px',
              fontStyle: 'italic',
              opacity: 0.3,
              color: '#F8F8F7',
              textAlign: 'center'
            }}>
              [ Walking Dead screenshot ]
            </p>
          </div>

          {/* RIGHT: Credits & Insight */}
          <div>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
              marginBottom: '48px'
            }}>
              The Walking Dead.<br/>
              FBI.<br/>
              Animal Kingdom.
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              fontStyle: 'italic',
              opacity: 0.9
            }}>
              Not because I got more serious.<br/>
              <span style={{ fontStyle: 'normal' }}>Because I got more playful.</span>
            </p>
          </div>
        </div>
        
        {/* Knight on horse - Victory/momentum (facing right) */}
        <img 
          src="/knight-horse.png" 
          alt=""
          style={{
            position: 'absolute',
            top: '8%',
            right: '5%',
            width: '120px',
            height: '120px',
            opacity: 0.08,
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
        />
      </section>

      {/* SECTION 4: THE METHOD */}

      {/* Screen 13 - LIGHT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Here's what every acting program gets wrong.
          </p>
        </div>
      </section>

      {/* Screen 14 - LIGHT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            They add pressure.
          </p>
        </div>
      </section>

      {/* Screen 15 - LIGHT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            opacity: 0.8
          }}>
            "Work harder."<br/>
            "Be better."<br/>
            "Get more training."
          </p>
        </div>
      </section>

      {/* Screen 16 - LIGHT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            But you're already trying too hard.
          </p>
        </div>
      </section>

      {/* Screen 17 - LIGHT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.3
          }}>
            Make it a job, and it becomes work.<br/>
            <span style={{ opacity: 0.9 }}>Make it play, and you'll do it for the rest of your life.</span>
          </p>
        </div>
      </section>

      {/* Screen 18 - Floating Method Card (Collins Style) */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          background: 'rgba(10, 10, 10, 0.03)',
          borderRadius: '16px',
          padding: '80px 64px',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)'
        }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: '32px'
          }}>
            The Method
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
            marginBottom: '32px'
          }}>
            We don't teach you to act.
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.5,
            opacity: 0.85
          }}>
            We bring back the version of you who already knew how.
            <br/><br/>
            The one who pretended without permission.
            <br/><br/>
            That's the actor casting directors are looking for.
          </p>
        </div>
      </section>

      {/* Screen 19 - Final CTA */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '64px'
          }}>
            Ready to play?
          </p>

          <button
            onClick={() => navigate('/challenge')}
            style={{
              background: '#0A0A0A',
              color: '#F8F8F7',
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '24px 64px',
              border: 'none',
              borderRadius: '0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 10, 10, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            The Challenge
          </button>
        </div>
      </section>
    </div>
  );
}
