import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function Challenge() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Flip happens at 70% through the page
      const flipPoint = (documentHeight - windowHeight) * 0.7;

      setIsInverted(scrollPosition > flipPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCheckout = () => {
    // TODO: Integrate Stripe checkout for $365
    window.location.href = 'https://buy.stripe.com/your-challenge-link';
  };

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

      {/* HERO - LIGHT */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15% 128px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            marginBottom: '48px'
          }}>
            The 30-Tape Challenge
          </h1>
          <p style={{
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: 500,
            marginBottom: '64px'
          }}>
            $365
          </p>
          <button
            onClick={handleCheckout}
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
              transition: 'transform 0.3s ease'
            }}
          >
            I'm Ready
          </button>
        </div>
      </section>

      {/* FRAME 2 - LIGHT */}
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
            That was Tape 1.
          </p>
        </div>
      </section>

      {/* FRAME 3 - LIGHT */}
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
            The only difference between you and them?
          </p>
        </div>
      </section>

      {/* FRAME 4 - LIGHT */}
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
            They've done it 30 times. Then 100. Then 500.
          </p>
        </div>
      </section>

      {/* FRAME 5 - LIGHT */}
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
            The magic number isn't 1.
          </p>
        </div>
      </section>

      {/* FRAME 6 - LIGHT */}
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
            It's 30.
          </p>
        </div>
      </section>

      {/* FRAME 7 - LIGHT */}
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
            30 tapes does.
          </p>
        </div>
      </section>

      {/* FRAME 8 - LIGHT */}
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
            By tape 30, a self-tape isn't a test.
          </p>
        </div>
      </section>

      {/* FRAME 9 - LIGHT */}
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
            That's when the great work starts.
          </p>
        </div>
      </section>

      {/* FRAME 10 - LIGHT */}
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
            This isn't a course.
          </p>
        </div>
      </section>

      {/* FRAME 11 - LIGHT */}
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
            It's a bet on yourself.
          </p>
        </div>
      </section>

      {/* FRAME 12 - DARK (THE SHIFT) */}
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
            Complete all 30?
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            I give you every penny back.
          </p>
        </div>
      </section>

      {/* FRAME 13 - DARK */}
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
            The only way you lose is if you give up.
          </p>
        </div>
      </section>

      {/* FRAME 14 - DARK */}
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
            You've been waiting for permission.
          </p>
        </div>
      </section>

      {/* FRAME 15 - DARK */}
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
            You're allowed.
          </p>
        </div>
      </section>

      {/* FINAL FRAME - DARK with CTA */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        padding: '192px 15% 256px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(24px, 3vw, 32px)',
            lineHeight: 1.6,
            marginBottom: '96px'
          }}>
            What you're about to do takes real bravery.
          </p>

          <button
            onClick={handleCheckout}
            style={{
              background: '#F8F8F7',
              color: '#0A0A0A',
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '24px 64px',
              border: 'none',
              borderRadius: '0',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
          >
            I'm Ready to Bet on Myself — $365
          </button>
        </div>
      </section>
    </div>
  );
}
