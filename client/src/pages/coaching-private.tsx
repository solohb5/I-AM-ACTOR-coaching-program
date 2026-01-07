import { useEffect, useState } from "react";

export default function CoachingPrivate() {
  const [isInverted, setIsInverted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<'single' | '3pack' | '5pack' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [playbookExpanded, setPlaybookExpanded] = useState(false);

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
          onClick={() => setMenuOpen(!menuOpen)}
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
              onClick={(e) => { 
                e.stopPropagation(); 
                alert('Coming Soon'); 
              }}
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
              onClick={(e) => { 
                e.stopPropagation(); 
                alert('Coming Soon'); 
              }}
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
              onClick={(e) => { 
                e.stopPropagation(); 
                alert('Coming Soon'); 
              }}
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
          boxShadow: '0 40px 120px rgba(0,0,0,0.15)',
          background: '#000'
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
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          >
            <source src="/assets/video/HansChristoher_REEL.mp4" type="video/mp4" />
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
            Opening 10 slots. Lock in your price now. Use it when the big audition comes.
          </p>

          {/* Minimal Pricing Cards */}
          <div id="pricing" style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            <div 
              onClick={() => {
                alert('🔗 STRIPE LINK NEEDED\n\nReplace with your Single Session Stripe payment link ($149).');
              }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(13px, 1.8vw, 17px)',
                fontWeight: 400,
                padding: 'clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px)',
                background: 'transparent',
                color: '#0A0A0A',
                textAlign: 'center',
                border: '1px solid rgba(10, 10, 10, 0.15)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxWidth: '180px',
                minWidth: 'clamp(120px, 20vw, 160px)',
                cursor: 'pointer',
                overflow: 'hidden',
                minHeight: expandedCard === 'single' ? '200px' : 'auto'
              }}
              onMouseEnter={(e) => {
                setExpandedCard('single');
                e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                setExpandedCard(null);
                e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ 
                opacity: 0.6,
                transition: 'opacity 0.3s ease'
              }}>
                {expandedCard === 'single' ? 'My Single Session' : 'Single Session'}
              </span>
              <span style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400 }}>$149</span>
              
              {/* Expandable Details */}
              <div style={{
                maxHeight: expandedCard === 'single' ? '200px' : '0',
                opacity: expandedCard === 'single' ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                marginTop: expandedCard === 'single' ? '12px' : '0',
                paddingTop: expandedCard === 'single' ? '12px' : '0',
                borderTop: expandedCard === 'single' ? '1px solid rgba(10, 10, 10, 0.1)' : 'none'
              }}>
                <div style={{
                  fontSize: 'clamp(12px, 1.4vw, 14px)',
                  lineHeight: 1.6,
                  opacity: 0.7,
                  fontStyle: 'italic',
                  textAlign: 'left'
                }}>
                  • 1 hour live coaching<br/>
                  • Scene breakdown<br/>
                  • Character work<br/>
                  • Record your best take
                </div>
              </div>
            </div>

            <div 
              onClick={() => {
                alert('🔗 STRIPE LINK NEEDED\n\nReplace with your 3-Pack Stripe payment link ($349).');
              }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(13px, 1.8vw, 17px)',
                fontWeight: 400,
                padding: 'clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px)',
                background: 'transparent',
                color: '#0A0A0A',
                textAlign: 'center',
                border: '1px solid rgba(10, 10, 10, 0.3)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxWidth: '180px',
                minWidth: 'clamp(120px, 20vw, 160px)',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                minHeight: expandedCard === '3pack' ? '220px' : 'auto'
              }}
              onMouseEnter={(e) => {
                setExpandedCard('3pack');
                e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                setExpandedCard(null);
                e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ 
                opacity: 0.6,
                transition: 'opacity 0.3s ease'
              }}>
                {expandedCard === '3pack' ? 'My 3-Pack' : '3-Pack'}
              </span>
              <span style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400 }}>$349</span>
              <span style={{ 
                fontSize: 'clamp(12px, 1.4vw, 14px)', 
                opacity: 0.5,
                fontStyle: 'italic'
              }}>Save $98</span>

              {/* Expandable Details */}
              <div style={{
                maxHeight: expandedCard === '3pack' ? '200px' : '0',
                opacity: expandedCard === '3pack' ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                marginTop: expandedCard === '3pack' ? '12px' : '0',
                paddingTop: expandedCard === '3pack' ? '12px' : '0',
                borderTop: expandedCard === '3pack' ? '1px solid rgba(10, 10, 10, 0.1)' : 'none'
              }}>
                <div style={{
                  fontSize: 'clamp(12px, 1.4vw, 14px)',
                  lineHeight: 1.6,
                  opacity: 0.7,
                  fontStyle: 'italic',
                  textAlign: 'left'
                }}>
                  • 3 sessions to use anytime<br/>
                  • Lock in your price<br/>
                  • Priority booking<br/>
                  • $447 value → $349
                </div>
              </div>
            </div>

            <div 
              onClick={() => {
                alert('🔗 STRIPE LINK NEEDED\n\nReplace with your 5-Pack Stripe payment link ($500).');
              }}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(14px, 2vw, 18px)',
                fontWeight: 400,
                padding: 'clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)',
                background: '#0A0A0A',
                color: '#F8F8F7',
                textAlign: 'center',
                border: '1px solid #0A0A0A',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                maxWidth: '200px',
                minWidth: 'clamp(140px, 24vw, 180px)',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                minHeight: expandedCard === '5pack' ? '260px' : 'auto'
              }}
              onMouseEnter={(e) => {
                setExpandedCard('5pack');
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                setExpandedCard(null);
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ 
                opacity: 0.7,
                transition: 'opacity 0.3s ease'
              }}>
                {expandedCard === '5pack' ? 'My 5-Pack' : '5-Pack'}
              </span>
              <span style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 400 }}>$500</span>
              <span style={{ 
                fontSize: 'clamp(12px, 1.4vw, 14px)', 
                opacity: 0.7,
                fontStyle: 'italic',
                lineHeight: 1.4,
                marginTop: '6px'
              }}>Includes playbook (first 10 only)</span>

              {/* Expandable Details */}
              <div style={{
                maxHeight: expandedCard === '5pack' ? '220px' : '0',
                opacity: expandedCard === '5pack' ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                marginTop: expandedCard === '5pack' ? '12px' : '0',
                paddingTop: expandedCard === '5pack' ? '12px' : '0',
                borderTop: expandedCard === '5pack' ? '1px solid rgba(248, 248, 247, 0.2)' : 'none'
              }}>
                <div style={{
                  fontSize: 'clamp(12px, 1.4vw, 14px)',
                  lineHeight: 1.6,
                  opacity: 0.85,
                  fontStyle: 'italic',
                  textAlign: 'left'
                }}>
                  • 5 sessions to use anytime<br/>
                  • Priority booking<br/>
                  • 3-Day Audition Playbook<br/>
                  • $745 value → $500<br/>
                  • Save $245 total
                </div>
              </div>
            </div>
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
            <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', marginTop: '12px', opacity: 0.6 }}>— Brandon Sutton, Blackbird</p>
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

        {/* BOTTOM CTA BUTTON */}
        <section style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10% 120px',
          position: 'relative'
        }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              fontWeight: 400,
              padding: '16px 32px',
              background: 'transparent',
              color: '#0A0A0A',
              border: '1px solid rgba(10, 10, 10, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Book My Session
            <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </section>
      </div>

      {/* PRICING MODAL - Cinematic Version */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 10, 10, 0.90)',
            backdropFilter: 'blur(20px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.4s ease'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes scaleIn {
                from { 
                  opacity: 0;
                  transform: scale(0.95);
                }
                to { 
                  opacity: 1;
                  transform: scale(1);
                }
              }
            `}
          </style>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#F8F8F7',
              borderRadius: '8px',
              width: 'clamp(85%, 70vw, 900px)',
              maxWidth: '900px',
              position: 'relative',
              padding: 'clamp(40px, 6vh, 56px) clamp(40px, 5vw, 64px)',
              animation: 'scaleIn 0.5s ease',
              boxShadow: '0 40px 120px rgba(0,0,0,0.4)',
              textAlign: 'center'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#0A0A0A',
                opacity: 0.4,
                transition: 'opacity 0.2s ease',
                lineHeight: 1,
                padding: '8px',
                zIndex: 10
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
            >
              ×
            </button>

            {/* One Poignant Line */}
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(32px, 4.8vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0A0A0A',
              marginBottom: 'clamp(32px, 5vh, 48px)',
              maxWidth: '680px',
              margin: '0 auto clamp(32px, 5vh, 48px)'
            }}>
              The difference between good and undeniable.
            </h2>

            {/* Three Options - Text with Arrows, Hover = Button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px, 2.5vh, 24px)',
              maxWidth: '560px',
              margin: '0 auto'
            }}>
              {/* Single Session - $149 */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  alert('🔗 STRIPE LINK NEEDED\n\nReplace with your Single Session Stripe payment link ($149).');
                }}
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 'clamp(19px, 2.5vw, 26px)',
                  color: '#0A0A0A',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '14px 20px',
                  borderRadius: '6px',
                  background: 'transparent',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(10, 10, 10, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Single Session — $149 →
              </div>

              {/* 3-Pack - $349 */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  alert('🔗 STRIPE LINK NEEDED\n\nReplace with your 3-Pack Stripe payment link ($349).');
                }}
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 'clamp(20px, 2.8vw, 28px)',
                  color: '#0A0A0A',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(10, 10, 10, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(10, 10, 10, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                3-Pack — $349 →
              </div>

              {/* 5-Pack - $500 (EMPHASIZED WITH PLAYBOOK EXPANSION) */}
              <div
                onMouseEnter={() => setPlaybookExpanded(true)}
                onMouseLeave={() => setPlaybookExpanded(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  alert('🔗 STRIPE LINK NEEDED\n\nReplace with your 5-Pack Stripe payment link ($500).');
                }}
                style={{
                  fontFamily: "'EB Garamond', serif",
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  padding: playbookExpanded ? '20px 24px' : '18px 24px',
                  borderRadius: '8px',
                  background: playbookExpanded ? '#1A1A1A' : 'transparent',
                  border: playbookExpanded ? '1px solid #1A1A1A' : '1px solid rgba(10, 10, 10, 0.15)',
                  transform: playbookExpanded ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: playbookExpanded ? '0 12px 32px rgba(0,0,0,0.15)' : 'none',
                  overflow: 'hidden'
                }}
              >
                {/* Main CTA Text */}
                <div style={{
                  fontSize: 'clamp(22px, 3.2vw, 32px)',
                  color: playbookExpanded ? '#F8F8F7' : '#0A0A0A',
                  fontWeight: 500,
                  marginBottom: playbookExpanded ? '16px' : '0',
                  transition: 'all 0.3s ease',
                  textShadow: playbookExpanded ? '0 1px 3px rgba(0,0,0,0.15)' : 'none'
                }}>
                  5-Pack — $500 <span style={{ 
                    fontSize: 'clamp(14px, 1.8vw, 17px)', 
                    fontWeight: 400,
                    opacity: playbookExpanded ? 0.85 : 0.7,
                    fontStyle: 'italic',
                    marginLeft: '8px'
                  }}>+ playbook</span> →
                </div>

                {/* Playbook Details - Expands on Hover */}
                <div style={{
                  maxHeight: playbookExpanded ? '180px' : '0',
                  opacity: playbookExpanded ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease'
                }}>
                  {/* Divider Line */}
                  <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'rgba(248, 248, 247, 0.2)',
                    marginBottom: '16px'
                  }} />

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    {/* Playbook Cover Placeholder */}
                    <div style={{
                      width: 'clamp(70px, 12vw, 100px)',
                      height: 'clamp(88px, 15vw, 125px)',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                      borderRadius: '4px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(28px, 5vw, 40px)',
                      border: '1px solid rgba(248, 248, 247, 0.15)',
                      boxShadow: '0 4px 16px rgba(212, 175, 55, 0.35)'
                    }}>
                      📖
                    </div>

                    {/* Playbook Description */}
                    <div style={{
                      flex: 1,
                      color: '#F8F8F7'
                    }}>
                      <h4 style={{
                        fontSize: 'clamp(15px, 1.9vw, 18px)',
                        fontWeight: 500,
                        marginBottom: '6px',
                        lineHeight: 1.3,
                        opacity: 1,
                        letterSpacing: '0.01em',
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}>
                        Includes: 3-Day Audition Playbook
                      </h4>
                      <p style={{
                        fontSize: 'clamp(13px, 1.6vw, 15px)',
                        lineHeight: 1.5,
                        opacity: 0.9,
                        marginBottom: '8px',
                        letterSpacing: '0.01em'
                      }}>
                        The exact system for breaking down sides, making bold choices, and walking in ready.
                      </p>
                      <p style={{
                        fontSize: 'clamp(12px, 1.5vw, 14px)',
                        lineHeight: 1.4,
                        opacity: 0.75,
                        fontStyle: 'italic',
                        letterSpacing: '0.015em'
                      }}>
                        Limited release — first 10 bookings only.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What They're Getting - Below CTAs */}
            <div style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.6,
              color: '#0A0A0A',
              opacity: 0.5,
              maxWidth: '520px',
              margin: 'clamp(32px, 5vh, 48px) auto 0',
              textAlign: 'center',
              paddingBottom: 'clamp(16px, 3vh, 24px)'
            }}>
              One hour. You and me on Zoom. Shoot your audition together. Dive into a booked role. Career mentorship. <span style={{ fontStyle: 'italic' }}>We'll figure it out.</span>
            </div>

            {/* I AM ACTOR Triangle Logo - Bottom Signature */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 'clamp(16px, 3vh, 32px)',
              opacity: 0.35
            }}>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(11px, 1.4vw, 14px)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: '#0A0A0A',
                lineHeight: 1.2,
                textAlign: 'center'
              }}>
                <div>I</div>
                <div>AM</div>
                <div>ACTOR</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

