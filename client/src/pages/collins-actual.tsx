// PHILOSOPHY HOMEPAGE - Collins Style
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function CollinsActual() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [showSecretDoor, setShowSecretDoor] = useState(false);

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

    // Secret door easter egg - press D to reveal coaching link
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'd') {
        setShowSecretDoor(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* SECRET DOOR - Easter egg for dev team */}
      {showSecretDoor && (
        <div
          onClick={() => navigate('/coaching')}
          style={{
            position: 'fixed',
            top: '32px',
            right: '100px',
            zIndex: 10000,
            fontSize: '48px',
            cursor: 'pointer',
            animation: 'doorPop 0.5s ease-out',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
          }}
          title="Private Coaching"
        >
          🚪
        </div>
      )}

      {/* NAVIGATION - Outside inverted container */}
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
        background: isInverted ? 'rgba(20, 7, 0, 0.95)' : 'rgba(248, 248, 247, 0.95)',
        backdropFilter: 'blur(10px)',
        transition: 'background 0.6s ease-in-out'
      }}>
        {/* Left: I AM ACTOR */}
        <div
          onClick={() => navigate('/actual')}
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '20px',
            fontWeight: 400,
            letterSpacing: '0.05em',
            color: isInverted ? '#F8F8F7' : '#0A0A0A',
            cursor: 'pointer',
            transition: 'color 0.6s ease-in-out, opacity 0.3s ease'
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
            background: isInverted ? '#F8F8F7' : '#0A0A0A',
            transition: 'all 0.6s ease-in-out'
          }} />
          <div style={{
            width: '24px',
            height: '1.5px',
            background: isInverted ? '#F8F8F7' : '#0A0A0A',
            opacity: 0.6,
            transition: 'all 0.6s ease-in-out'
          }} />
        </div>
      </nav>

      {/* MENU OVERLAY - Outside inverted container */}
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
            zIndex: 9999,
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
                color: '#0A0A0A',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease'
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
                color: '#0A0A0A',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease'
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
                color: '#0A0A0A',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              The Challenge
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT - This gets inverted */}
      <div style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#F8F8F7',
        color: '#0A0A0A',
        filter: isInverted ? 'invert(1)' : 'invert(0)',
        transition: 'filter 0.6s ease-in-out'
      }}>
      {/* HERO - ORIGINAL PERFECT VERSION - 15% SMALLER */}
      <section id="hero" style={{
        minHeight: '180vh',
        background: '#F8F8F7',
        padding: '0 10%',
        position: 'relative'
      }}>
        {/* Asymmetric Headline - centered in first 100vh */}
        <div style={{
          position: 'absolute',
          top: '50vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1400px',
          padding: '0 10%'
        }}>
          <h1 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(36.72px, 6.12vw, 73.44px)', // 10% smaller than previous
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0
          }}>
            <div style={{ textAlign: 'left', marginBottom: '8px', paddingLeft: '21%' }}>Have you ever</div>
            <div style={{ textAlign: 'right', paddingRight: '21%' }}>wanted to act?</div>
          </h1>
        </div>

        {/* Video container at fold - 20% above, 80% below */}
        <div style={{
          position: 'absolute',
          top: '100vh',
          left: '50%',
          transform: 'translateX(-50%) translateY(-20%)',
          width: '70%',
          maxWidth: '1000px',
          zIndex: 10
        }}>
          {/* Subheadline - positioned top right of video */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 20
          }}>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(17px, 1.7vw, 20.4px)',
              fontStyle: 'italic',
              color: '#0A0A0A',
              opacity: 0.7,
              margin: 0,
              textAlign: 'right',
              maxWidth: '100%',
              lineHeight: 1.4
            }}>
              All you need is a phone, a guide, and the courage to press record.
            </p>
          </div>

          {/* Video placeholder */}
          <div style={{
            width: '100%',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            background: '#140700',
            borderRadius: '8px',
            boxShadow: '0 40px 120px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#F8F8F7',
              fontSize: '18px',
              opacity: 0.5
            }}>
              [ Video Placeholder ]
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 2: THE RECOGNITION */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            You've always known.
          </h2>
        </div>
      </section>

      {/* FRAME 3: THE WOUND */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            Someone told you to be practical.
          </p>
        </div>
      </section>

      {/* FRAME 4: THE CHILD */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            The best actors never stopped playing dress-up.
          </p>
        </div>
      </section>

      {/* FRAME 5: THE REFRAME */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            The industry changed.
          </p>
        </div>
      </section>

      {/* FRAME 6: THE GUIDE */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            At 33, without a single credit,
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            he quit.
          </p>
        </div>
      </section>

      {/* FRAME 7: THE PROOF */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            Not because he got more serious.
          </p>
        </div>
      </section>

      {/* FRAME 8: THE PHILOSOPHY */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            Thinking is the enemy of acting.
          </p>
        </div>
      </section>

      {/* FRAME 9: THE METHOD */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            You already are.
          </p>
        </div>
      </section>

      {/* FRAME 10: THE CLOSE */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
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
            You've always known.
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
              transition: 'transform 0.3s ease'
            }}
          >
            The Challenge
          </button>
        </div>
      </section>

      {/* FINAL FRAME */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        padding: '192px 15% 256px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginBottom: '96px'
          }}>
            Welcome home.
          </p>

          {/* I AM ACTOR - Stacked at the end */}
          <h1 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(56px, 8vw, 96px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            <div>I</div>
            <div>AM</div>
            <div>ACTOR</div>
          </h1>
        </div>
      </section>
      </div>

      {/* Keyframes for secret door animation */}
      <style>{`
        @keyframes doorPop {
          0% { 
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
