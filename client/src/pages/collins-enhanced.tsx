// COLLINS ENHANCED - With Knight, Content, & Polish
// Built on the perfect bones of collins-actual.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function CollinsEnhanced() {
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

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* COLLINS DETAIL: Subtle Frame Border */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '20px',
        border: '1px solid rgba(10, 10, 10, 0.08)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'border-color 0.6s ease-in-out',
        borderColor: isInverted ? 'rgba(248, 248, 247, 0.08)' : 'rgba(10, 10, 10, 0.08)'
      }} />

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
        background: isInverted ? 'rgba(20, 7, 0, 0.95)' : 'rgba(248, 248, 247, 0.95)',
        backdropFilter: 'blur(10px)',
        transition: 'background 0.6s ease-in-out'
      }}>
        {/* Left: I AM ACTOR with small knight */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/assets/images/knight-look.png" 
            alt="" 
            style={{
              width: '24px',
              height: '24px',
              opacity: 0.4,
              filter: isInverted ? 'invert(1)' : 'invert(0)',
              transition: 'filter 0.6s ease-in-out'
            }}
          />
          <div
            onClick={() => navigate('/enhanced')}
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
              onClick={() => { setMenuOpen(false); navigate('/enhanced'); }}
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
      
      {/* HERO - ENHANCED VERSION */}
      <section id="hero" style={{
        minHeight: '180vh',
        background: '#F8F8F7',
        padding: '0 10%',
        position: 'relative'
      }}>
        {/* Knight - top right, subtle */}
        <img 
          src="/assets/images/knight-look.png"
          alt=""
          style={{
            position: 'absolute',
            top: '20vh',
            right: '5%',
            width: '120px',
            height: '120px',
            opacity: 0.06,
            pointerEvents: 'none'
          }}
        />

        {/* Asymmetric Headline */}
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
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0
          }}>
            <div style={{ textAlign: 'left', marginBottom: '8px', paddingLeft: '21%' }}>Have you ever</div>
            <div style={{ textAlign: 'right', paddingRight: '21%' }}>wanted to act?</div>
          </h1>
        </div>

        {/* Video container at fold */}
        <div style={{
          position: 'absolute',
          top: '100vh',
          left: '50%',
          transform: 'translateX(-50%) translateY(-20%)',
          width: '70%',
          maxWidth: '1000px',
          zIndex: 10
        }}>
          {/* Subheadline */}
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
            paddingBottom: '56.25%',
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
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Knight - bottom left, playful pose */}
        <img 
          src="/assets/images/knight-play.png"
          alt=""
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '100px',
            height: '100px',
            opacity: 0.08,
            pointerEvents: 'none'
          }}
        />
        
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

      {/* FRAME 6: THE GUIDE - EXPANDED WITH HANS STORY */}
      <section style={{
        minHeight: '140vh',
        background: '#F8F8F7',
        padding: '192px 10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          gap: '80px',
          alignItems: 'center'
        }}>
          {/* Left: Hans Image */}
          <div>
            <img 
              src="/assets/generated_images/candid_photo_of_hans_laughing_on_set..png"
              alt="Hans Christopher"
              style={{
                width: '100%',
                borderRadius: '4px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
              }}
            />
          </div>

          {/* Right: Story */}
          <div>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2vw, 24px)',
              lineHeight: 1.8,
              letterSpacing: '-0.01em',
              marginBottom: '32px'
            }}>
              Hans Christopher was too scared to walk into his first acting class.
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2vw, 24px)',
              lineHeight: 1.8,
              letterSpacing: '-0.01em',
              marginBottom: '32px'
            }}>
              For two years.
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2vw, 24px)',
              lineHeight: 1.8,
              letterSpacing: '-0.01em',
              marginBottom: '32px'
            }}>
              At 27, he was sleeping in his Toyota 4Runner in a Santa Monica parking garage. 
              Broke. Heartbroken. Lost. Carrying a quiet dream nobody knew about.
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2vw, 24px)',
              lineHeight: 1.8,
              letterSpacing: '-0.01em',
              marginBottom: '32px'
            }}>
              He threw $50,000 at classes, headshots, workshops. 
              Left every class feeling worse.
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2vw, 24px)',
              lineHeight: 1.8,
              letterSpacing: '-0.01em',
              fontWeight: 500
            }}>
              At 33, without a single credit, he quit.
            </p>
          </div>
        </div>
      </section>

      {/* FRAME 7: THE PROOF - ENHANCED WITH STATS */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        padding: '192px 15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.4,
            marginBottom: '64px'
          }}>
            Now he's on Walking Dead. Animal Kingdom. FBI. American Gigolo.
            <br/><br/>
            Directed by Werner Herzog. Lead opposite Joe Cole.
          </p>

          {/* BIG NUMBER - Collins Style */}
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(80px, 12vw, 140px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '16px'
          }}>
            45+
          </div>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '20px',
            opacity: 0.6,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Credits on IMDB
          </p>
        </div>
      </section>

      {/* FRAME 7.5: THE INSIGHT */}
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

      {/* FRAME 9: THREE PILLARS - COLLINS GRID */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        padding: '192px 10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1400px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '80px'
          }}>
            {/* Pillar 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '140px',
                fontWeight: 400,
                color: 'rgba(10, 10, 10, 0.08)',
                lineHeight: 1,
                marginBottom: '32px'
              }}>
                01
              </div>
              <h3 style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                marginBottom: '24px'
              }}>
                MINDSET
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '22px',
                fontStyle: 'italic',
                opacity: 0.7,
                lineHeight: 1.5
              }}>
                "You already are.<br/>Now act like it."
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '140px',
                fontWeight: 400,
                color: 'rgba(10, 10, 10, 0.08)',
                lineHeight: 1,
                marginBottom: '32px'
              }}>
                02
              </div>
              <h3 style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                marginBottom: '24px'
              }}>
                CRAFT
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '22px',
                fontStyle: 'italic',
                opacity: 0.7,
                lineHeight: 1.5
              }}>
                "Don't try to act well.<br/>Just act."
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '140px',
                fontWeight: 400,
                color: 'rgba(10, 10, 10, 0.08)',
                lineHeight: 1,
                marginBottom: '32px'
              }}>
                03
              </div>
              <h3 style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                marginBottom: '24px'
              }}>
                BUSINESS
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '22px',
                fontStyle: 'italic',
                opacity: 0.7,
                lineHeight: 1.5
              }}>
                "Show up where<br/>they're looking."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - COLLINS STYLE */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        padding: '192px 10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Knight - top right, subtle */}
        <img 
          src="/assets/images/knight-horse.png"
          alt=""
          style={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            width: '100px',
            height: '100px',
            opacity: 0.06,
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '1400px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px'
          }}>
            {/* Testimonial 1 */}
            <div style={{
              background: 'rgba(10, 10, 10, 0.03)',
              padding: '48px',
              borderRadius: '4px',
              transition: 'background 0.3s ease'
            }}>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '20px',
                fontStyle: 'italic',
                lineHeight: 1.7,
                marginBottom: '32px'
              }}>
                "My manager mentioned how my self-tapes are now at an entirely different level. 
                She wanted to recommend Hans to other actors at the agency."
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '16px',
                opacity: 0.6
              }}>
                — Deb LeClair
              </p>
            </div>

            {/* Testimonial 2 */}
            <div style={{
              background: 'rgba(10, 10, 10, 0.03)',
              padding: '48px',
              borderRadius: '4px',
              transition: 'background 0.3s ease'
            }}>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '20px',
                fontStyle: 'italic',
                lineHeight: 1.7,
                marginBottom: '32px'
              }}>
                "The 30-tape challenge was everything I didn't know I needed. 
                By week 3, I stopped being precious. By week 6, I was having fun."
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '16px',
                opacity: 0.6
              }}>
                — Mark Saldana
              </p>
            </div>

            {/* Testimonial 3 */}
            <div style={{
              background: 'rgba(10, 10, 10, 0.03)',
              padding: '48px',
              borderRadius: '4px',
              transition: 'background 0.3s ease'
            }}>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '20px',
                fontStyle: 'italic',
                lineHeight: 1.7,
                marginBottom: '32px'
              }}>
                "Hans has created a safe space to explore, take risks, fail, and win. 
                I finally feel like I belong here."
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '16px',
                opacity: 0.6
              }}>
                — Monique
              </p>
            </div>
          </div>
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
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
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

      {/* FINAL FRAME */}
      <section style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        padding: '192px 15% 256px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Knight - center, larger, triumphant */}
        <img 
          src="/assets/images/knightartfirered (500 x 500 px)(2).png"
          alt=""
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            opacity: 0.04,
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginBottom: '96px'
          }}>
            Welcome home.
          </p>

          {/* I AM ACTOR - Stacked */}
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
    </>
  );
}



