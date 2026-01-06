import { useEffect, useState } from "react";

export default function CoachingPrivate() {
  const [isInverted, setIsInverted] = useState(false);
  const [expandedCard, setExpandedCard] = useState<'single' | '3pack' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Inversion happens when scrolling past hero into theater mode
      // Trigger around 50-60% scroll to create cinematic dark transition
      setIsInverted(scrollPosition > windowHeight * 0.6);
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

      {/* NAVIGATION - Translucent with subtle blur */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '32px 8%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isInverted ? 'rgba(10, 10, 10, 0.3)' : 'rgba(248, 248, 247, 0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.6s ease-in-out',
        border: 'none',
        borderBottom: 'none'
      }}>
        {/* Left: I AM ACTOR */}
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: '20px',
          fontWeight: 400,
          letterSpacing: '0.05em',
          color: isInverted ? '#F8F8F7' : '#0A0A0A',
          transition: 'color 0.6s ease-in-out'
        }}>
          I AM ACTOR
        </div>

        {/* Right: Hamburger Menu */}
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '32px',
            height: '32px',
            justifyContent: 'center'
          }}
          aria-label="Menu"
        >
          <span style={{
            width: '100%',
            height: '2px',
            background: isInverted ? '#F8F8F7' : '#0A0A0A',
            transition: 'background 0.6s ease-in-out',
            borderRadius: '2px'
          }} />
          <span style={{
            width: '100%',
            height: '2px',
            background: isInverted ? '#F8F8F7' : '#0A0A0A',
            transition: 'background 0.6s ease-in-out',
            borderRadius: '2px'
          }} />
        </button>
      </nav>





      {/* VIDEO - Positioned to peek 10% at bottom of hero and 10% at top of quote */}
      <div style={{
        position: 'absolute',
        top: '100vh',
        left: '50%',
        transform: 'translateX(-50%) translateY(-10%)',
        width: '70%',
        maxWidth: '900px',
        zIndex: 10
      }}>
        <div style={{
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 40px 120px rgba(0,0,0,0.15)'
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/assets/images/hans-accessible.png"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          >
            {/* 🎥 DROP YOUR MP4 HERE: /assets/video/hero/your-reel.mp4 */}
            <source src="/assets/video/hero/your-reel.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>
      </div>

      {/* INVERTED CONTAINER - Collins DNA */}
      <div style={{
        minHeight: '100vh',
        background: '#F8F8F7',
        color: '#0A0A0A',
        transition: 'filter 0.6s ease-in-out',
        filter: isInverted ? 'invert(1)' : 'invert(0)'
      }}>
        {/* HERO - Simple, centered */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '160px 8% 40px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <h1 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(56px, 8vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '32px'
          }}>
            Reserve Your Session
          </h1>
          
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            lineHeight: 1.4,
            opacity: 0.8,
            marginBottom: '64px'
          }}>
            Opening 15 slots. Lock in your price now. Use it when the big audition comes.
          </p>

          {/* Quick CTA Buttons */}
          <div id="pricing" style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            marginBottom: '48px',
            width: '100%',
            maxWidth: '600px'
          }}>
            <a 
              href="#single"
              onClick={(e) => {
                e.preventDefault();
                alert('🔗 STRIPE LINK NEEDED\n\nReplace this href with your Single Session Stripe payment link ($149).');
              }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(18px, 2.2vw, 20px)',
                fontWeight: 400,
                padding: '20px 24px',
                background: 'transparent',
                color: '#0A0A0A',
                textAlign: 'center',
                textDecoration: 'none',
                border: '1px solid rgba(10, 10, 10, 0.2)',
                borderRadius: '4px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                overflow: 'hidden',
                minHeight: '120px',
                flex: '1 1 240px',
                minWidth: '220px',
                minHeight: expandedCard === 'single' ? '280px' : '120px'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(10, 10, 10, 0.4)';
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                target.style.minHeight = '280px';
                const details = target.querySelector('.session-details') as HTMLElement;
                if (details) {
                  details.style.maxHeight = '200px';
                  details.style.opacity = '1';
                  details.style.marginTop = '16px';
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(10, 10, 10, 0.2)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
                target.style.minHeight = expandedCard === 'single' ? '280px' : '120px';
                const details = target.querySelector('.session-details') as HTMLElement;
                if (details && expandedCard !== 'single') {
                  details.style.maxHeight = '0';
                  details.style.opacity = '0';
                  details.style.marginTop = '0';
                }
              }}
              onTouchStart={() => setExpandedCard(expandedCard === 'single' ? null : 'single')}
            >
              <span>Single Session</span>
              <span style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 400 }}>$149</span>
              <div 
                className="session-details"
                style={{
                  maxHeight: '0',
                  opacity: 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  marginTop: '0'
                }}
              >
                <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(10, 10, 10, 0.15)', marginBottom: '12px' }} />
                <div style={{ opacity: 0.75, fontStyle: 'italic', fontSize: 'clamp(13px, 1.6vw, 15px)' }}>
                  • 1 hour live coaching<br/>
                  • Scene breakdown & character work<br/>
                  • Immediate feedback<br/>
                  • Record your best take
                </div>
              </div>
            </a>

            <a 
              href="#3pack"
              onClick={(e) => {
                e.preventDefault();
                alert('🔗 STRIPE LINK NEEDED\n\nReplace this href with your 3-Pack Stripe payment link ($349).');
              }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(18px, 2.2vw, 20px)',
                fontWeight: 400,
                padding: '20px 24px',
                background: '#0A0A0A',
                color: '#F8F8F7',
                textAlign: 'center',
                textDecoration: 'none',
                border: '1px solid #0A0A0A',
                borderRadius: '4px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '140px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                flex: '1 1 240px',
                minWidth: '220px',
                minHeight: expandedCard === '3pack' ? '300px' : '140px'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 16px 48px rgba(0,0,0,0.16)';
                target.style.minHeight = '300px';
                const details = target.querySelector('.session-details') as HTMLElement;
                if (details) {
                  details.style.maxHeight = '200px';
                  details.style.opacity = '1';
                  details.style.marginTop = '16px';
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
                target.style.minHeight = expandedCard === '3pack' ? '300px' : '140px';
                const details = target.querySelector('.session-details') as HTMLElement;
                if (details && expandedCard !== '3pack') {
                  details.style.maxHeight = '0';
                  details.style.opacity = '0';
                  details.style.marginTop = '0';
                }
              }}
              onTouchStart={() => setExpandedCard(expandedCard === '3pack' ? null : '3pack')}
            >
              <span>3-Pack</span>
              <span style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 400 }}>$349</span>
              <span style={{ 
                fontSize: 'clamp(14px, 1.8vw, 16px)', 
                opacity: 0.7,
                fontStyle: 'italic'
              }}>Save $98</span>
              <div 
                className="session-details"
                style={{
                  maxHeight: expandedCard === '3pack' ? '200px' : '0',
                  opacity: expandedCard === '3pack' ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  marginTop: expandedCard === '3pack' ? '16px' : '0'
                }}
              >
                <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(248,248,247,0.3)', marginBottom: '12px' }} />
                <div style={{ opacity: 0.85, fontStyle: 'italic', fontSize: 'clamp(13px, 1.6vw, 15px)' }}>
                  • 3 sessions to use anytime<br/>
                  • Lock in your price<br/>
                  • Priority booking<br/>
                  • Save $98 total
                </div>
              </div>
            </a>
          </div>

          {/* Testimonial */}
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(19px, 2.4vw, 23px)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            opacity: 0.85,
            maxWidth: '650px',
            marginTop: '64px'
          }}>
            <p>"Having Hans on speed dial changed everything."</p>
            <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', marginTop: '12px', opacity: 0.6 }}>— Maya R., FBI: Most Wanted</p>
          </div>
        </section>

        {/* SPACER for video */}
        <div style={{ height: '25vh' }} />

        {/* YOUR QUOTE - The audience watching the screen (video above) */}
        <section style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10% 40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.5,
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '0.01em',
              marginBottom: '24px'
            }}>
              "I don't coach. I guide. My job isn't to give you line readings—it's to help you unlock what's already there. The performance that books is the one where you stop trying to be right and start trusting what you know."
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              fontWeight: 400,
              opacity: 0.6,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              — Hans
            </p>
          </div>
        </section>

        {/* CLOSING TESTIMONIAL - Right after quote, minimal spacing */}
        <section style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10% 80px',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(19px, 2.4vw, 23px)',
              lineHeight: 1.6,
              fontStyle: 'italic',
              opacity: 0.7,
              marginBottom: '12px'
            }}>
              "This isn't like other coaching. Hans sees what you can't."
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(16px, 2vw, 18px)',
              opacity: 0.5,
              letterSpacing: '0.02em'
            }}>
              — Jordan T., Succession
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

