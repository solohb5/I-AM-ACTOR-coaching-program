import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

// HIGH-TICKET MENTORSHIP PAGE
// Premium positioning: $300 single / $3,600 for 12-week
// Blended photos, knight accents, scroll-activated inversion
// PRESERVED VERSION - DO NOT DELETE

export default function Mentorship() {
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

      {/* MAIN CONTENT - Inverted Container */}
      <div style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#F8F8F7',
        color: '#0A0A0A',
        filter: isInverted ? 'invert(1)' : 'invert(0)',
        transition: 'filter 0.6s ease-in-out',
        minHeight: '100vh'
      }}>

        {/* HERO WITH VIDEO PEEK */}
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '192px 15% 128px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '900px', position: 'relative', zIndex: 5 }}>
            <h1 style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(56px, 8vw, 96px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '48px',
              color: '#0A0A0A'
            }}>
              Private Coaching
            </h1>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(24px, 3vw, 32px)',
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              marginBottom: '64px',
              opacity: 0.85,
              maxWidth: '700px',
              margin: '0 auto 64px'
            }}>
              One-on-one work for actors who are ready to become unmistakable
            </p>
          </div>

          {/* VIDEO REEL - Peaks at the fold */}
          <div style={{
            position: 'absolute',
            top: '100vh',
            left: '50%',
            transform: 'translateX(-50%) translateY(-20%)',
            width: '70%',
            maxWidth: '1000px',
            zIndex: 10
          }}>
            {/* Optional caption above video */}
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
                A quick look at the work
              </p>
            </div>

            {/* Video Container */}
            <div style={{
              width: '100%',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              background: '#140700',
              borderRadius: '8px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* VIDEO ELEMENT - Replace src with your footage path */}
              <video
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/images/hans-accessible.png"
              >
                <source src="/assets/video/hero/your-reel.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* SPACER after video */}
        <div style={{ height: '40vh' }} />

        {/* WHO THIS IS FOR */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '96px'
          }}>
            This is for actors who know they have something
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '96px'
          }}>
            But haven't found the way to show it yet
          </p>
        </section>

        {/* THE PROBLEM */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            marginBottom: '64px',
            opacity: 0.9
          }}>
            You've taken classes
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            marginBottom: '64px',
            opacity: 0.9
          }}>
            You've studied the craft
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            marginBottom: '64px',
            opacity: 0.9
          }}>
            But you still don't know what makes YOU castable
          </p>
        </section>

        {/* THE SHIFT */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '96px'
          }}>
            That's what we find together
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            opacity: 0.85
          }}>
            Your superpower as an actor. The thing that makes you unmistakable. The roles you were born to play.
          </p>
        </section>

        {/* PHOTO-TEXT: The Real Work (Blended) */}
        <section style={{
          padding: '192px 15%',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '64px',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Photo - Blended edges */}
            <div style={{
              position: 'relative'
            }}>
              <img 
                src="/assets/images/hans-bio.jpg" 
                alt="Hans coaching"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                  opacity: 0.9
                }}
              />
              {/* Knight accent - subtle */}
              <img 
                src="/assets/images/knight-look.png"
                alt=""
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-40px',
                  width: '120px',
                  height: 'auto',
                  opacity: 0.15,
                  pointerEvents: 'none',
                  filter: 'saturate(0.5)'
                }}
              />
            </div>

            {/* Text */}
            <div style={{
              padding: window.innerWidth > 768 ? '32px' : '0'
            }}>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                lineHeight: 1.5,
                marginBottom: '32px',
                opacity: 0.9
              }}>
                Most actors spend years trying to be impressive.
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                lineHeight: 1.5,
                marginBottom: '32px',
                opacity: 0.9
              }}>
                The ones who book learn to be undeniable instead.
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                lineHeight: 1.5,
                fontStyle: 'italic',
                opacity: 0.85
              }}>
                That's the work we do.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '96px'
          }}>
            What We Build
          </h2>
          
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              marginBottom: '24px'
            }}>
              Your Character Cards
            </h3>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              lineHeight: 1.5,
              opacity: 0.85
            }}>
              The 3 types you were born to play. Not what you think casting wants. What YOU bring that no one else can.
            </p>
          </div>

          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              marginBottom: '24px'
            }}>
              Your Castability Sheet
            </h3>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              lineHeight: 1.5,
              opacity: 0.85
            }}>
              The document that makes agents say "I know exactly how to pitch you." Clear. Strategic. Undeniable.
            </p>
          </div>

          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              marginBottom: '24px'
            }}>
              Your Self-Tape System
            </h3>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              lineHeight: 1.5,
              opacity: 0.85
            }}>
              From terrified to confident. We build your process so auditions feel like play, not pressure.
            </p>
          </div>
        </section>

        {/* CREDIBILITY - HANS */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '64px',
            alignItems: 'center'
          }}>
            {/* Photo */}
            <div>
              <img 
                src="/assets/images/hans-accessible.png" 
                alt="Hans Brofeldt"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  display: 'block'
                }}
              />
            </div>

            {/* Bio */}
            <div>
              <h2 style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                marginBottom: '32px'
              }}>
                I'm Hans
              </h2>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                lineHeight: 1.6,
                marginBottom: '24px',
                opacity: 0.9
              }}>
                I'm an actor who mentors actors.
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                lineHeight: 1.6,
                marginBottom: '24px',
                opacity: 0.9
              }}>
                I've booked roles on The Walking Dead, FBI, Animal Kingdom, and worked with directors who've shaped how stories are told.
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                lineHeight: 1.6,
                marginBottom: '24px',
                opacity: 0.9
              }}>
                Over 50 actors have gone through this work. They've booked network TV, streaming series, and roles they didn't know they could play.
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                lineHeight: 1.6,
                opacity: 0.9
              }}>
                This isn't theory. It's what works.
              </p>
            </div>
          </div>
        </section>

        {/* CREDITS SCROLL */}
        <section style={{
          padding: '96px 0',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            gap: '24px',
            animation: 'scroll 40s linear infinite',
            width: 'max-content'
          }}>
            {/* First set */}
            <img src="/assets/images/poster-walkingdead.jpg" alt="The Walking Dead" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-fbi.png" alt="FBI" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-animalkingdom.jpg" alt="Animal Kingdom" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-waco.jpg" alt="Waco" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-american-gigolo.jpg" alt="American Gigolo" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-marmalade.jpg" alt="Marmalade" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            {/* Duplicate for seamless loop */}
            <img src="/assets/images/poster-walkingdead.jpg" alt="The Walking Dead" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-fbi.png" alt="FBI" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-animalkingdom.jpg" alt="Animal Kingdom" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-waco.jpg" alt="Waco" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-american-gigolo.jpg" alt="American Gigolo" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
            <img src="/assets/images/poster-marmalade.jpg" alt="Marmalade" style={{ height: '300px', width: 'auto', borderRadius: '4px' }} />
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <blockquote style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            fontStyle: 'italic',
            marginBottom: '48px',
            opacity: 0.95
          }}>
            "Hans helped me see what I'd been hiding. Within 3 months, I booked my first series regular. Not because I became someone else. Because I finally became myself."
          </blockquote>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(20px, 2.5vw, 24px)',
            opacity: 0.7
          }}>
            — Sarah M., Series Regular on Netflix
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '96px'
          }}>
            How It Works
          </h2>
          
          <div style={{ marginBottom: '64px' }}>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(24px, 3vw, 32px)',
              lineHeight: 1.4,
              marginBottom: '16px',
              fontWeight: 500
            }}>
              Weekly 1-on-1 Sessions
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2.5vw, 24px)',
              lineHeight: 1.6,
              opacity: 0.85
            }}>
              90 minutes. Deep work. No group calls, no distractions. Just you, me, and the work.
            </p>
          </div>

          <div style={{ marginBottom: '64px' }}>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(24px, 3vw, 32px)',
              lineHeight: 1.4,
              marginBottom: '16px',
              fontWeight: 500
            }}>
              Custom Curriculum
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2.5vw, 24px)',
              lineHeight: 1.6,
              opacity: 0.85
            }}>
              This isn't a program. It's built around you. Your strengths. Your blocks. Your goals.
            </p>
          </div>

          <div style={{ marginBottom: '64px' }}>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(24px, 3vw, 32px)',
              lineHeight: 1.4,
              marginBottom: '16px',
              fontWeight: 500
            }}>
            Between-Session Support
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2.5vw, 24px)',
              lineHeight: 1.6,
              opacity: 0.85
            }}>
              Voice notes. Self-tape feedback. Questions answered. You're not alone between sessions.
            </p>
          </div>
        </section>

        {/* PHOTO-TEXT: The Experience (Blended) */}
        <section style={{
          padding: '192px 15%',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '64px',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Text (reversed order) */}
            <div style={{
              padding: window.innerWidth > 768 ? '32px' : '0',
              order: window.innerWidth > 768 ? 1 : 2,
              position: 'relative'
            }}>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                lineHeight: 1.5,
                marginBottom: '32px',
                opacity: 0.9
              }}>
                I've coached actors from kitchen tables to network sets.
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                lineHeight: 1.5,
                marginBottom: '32px',
                opacity: 0.9
              }}>
                Some had trained for years but couldn't book. Others had never taken a class but knew they had something.
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                lineHeight: 1.5,
                fontStyle: 'italic',
                opacity: 0.85
              }}>
                What they all needed was clarity. That's what this work gives you.
              </p>
              {/* Knight accent - subtle bluebird pop */}
              <img 
                src="/assets/images/blueknight.png"
                alt=""
                style={{
                  position: 'absolute',
                  bottom: '-60px',
                  left: '-40px',
                  width: '100px',
                  height: 'auto',
                  opacity: 0.2,
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Photo - Blended edges */}
            <div style={{
              position: 'relative',
              order: window.innerWidth > 768 ? 2 : 1
            }}>
              <img 
                src="/assets/images/hans-accessible.png" 
                alt="Hans"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                  opacity: 0.9
                }}
              />
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '96px',
            textAlign: 'center'
          }}>
            Investment
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '48px'
          }}>
            {/* TIER 1: Single Session */}
            <div style={{
              border: '1px solid rgba(10, 10, 10, 0.15)',
              borderRadius: '8px',
              padding: '48px',
              background: 'rgba(10, 10, 10, 0.02)'
            }}>
              <h3 style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                Single Session
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(48px, 7vw, 72px)',
                fontWeight: 400,
                marginBottom: '24px',
                lineHeight: 1
              }}>
                $300
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(18px, 2vw, 20px)',
                lineHeight: 1.6,
                marginBottom: '32px',
                opacity: 0.85
              }}>
                One 90-minute intensive. Perfect for actors who need clarity on a specific challenge, audition, or career decision.
              </p>
              <ul style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(18px, 2vw, 20px)',
                lineHeight: 1.8,
                listStyle: 'none',
                padding: 0,
                marginBottom: '32px',
                opacity: 0.85
              }}>
                <li style={{ marginBottom: '12px' }}>✓ 90-minute deep dive</li>
                <li style={{ marginBottom: '12px' }}>✓ Recorded for your review</li>
                <li style={{ marginBottom: '12px' }}>✓ Action plan you can use immediately</li>
              </ul>
            </div>

            {/* TIER 2: Mentorship Package */}
            <div style={{
              border: '2px solid rgba(10, 10, 10, 0.3)',
              borderRadius: '8px',
              padding: '48px',
              background: 'rgba(10, 10, 10, 0.04)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#0A0A0A',
                color: '#F8F8F7',
                padding: '8px 24px',
                borderRadius: '24px',
                fontFamily: "'EB Garamond', serif",
                fontSize: '14px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Most Transformative
              </div>
              <h3 style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                3-Month Mentorship
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(48px, 7vw, 72px)',
                fontWeight: 400,
                marginBottom: '8px',
                lineHeight: 1
              }}>
                $3,600
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(16px, 2vw, 18px)',
                marginBottom: '24px',
                opacity: 0.7
              }}>
                12 weeks · $300/week
              </p>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(18px, 2vw, 20px)',
                lineHeight: 1.6,
                marginBottom: '32px',
                opacity: 0.85
              }}>
                Complete transformation. From scattered to unmistakable. This is the deep work.
              </p>
              <ul style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(18px, 2vw, 20px)',
                lineHeight: 1.8,
                listStyle: 'none',
                padding: 0,
                marginBottom: '32px',
                opacity: 0.85
              }}>
                <li style={{ marginBottom: '12px' }}>✓ 12 weekly 90-minute sessions</li>
                <li style={{ marginBottom: '12px' }}>✓ Your 3 Character Cards</li>
                <li style={{ marginBottom: '12px' }}>✓ Your Castability Sheet</li>
                <li style={{ marginBottom: '12px' }}>✓ Self-tape system & feedback</li>
                <li style={{ marginBottom: '12px' }}>✓ Between-session support</li>
                <li style={{ marginBottom: '12px' }}>✓ All sessions recorded</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{
          padding: '192px 15%',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '64px'
          }}>
            Ready?
          </p>
          <a
            href="https://calendly.com/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(20px, 2.5vw, 24px)',
              padding: '24px 48px',
              background: '#0A0A0A',
              color: '#F8F8F7',
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'opacity 0.3s ease',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Book a Call
          </a>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(18px, 2vw, 20px)',
            marginTop: '32px',
            opacity: 0.7
          }}>
            30-minute discovery call · No pressure · Just clarity
          </p>
        </section>

        {/* SPACER */}
        <div style={{ height: '192px' }} />

      </div>

      {/* KEYFRAMES FOR SCROLL ANIMATION */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}

