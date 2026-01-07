import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GoldenRitual } from '@/components/GoldenRitual';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Toolkit() {
  const [ritualComplete, setRitualComplete] = useState(false);

  const tools = [
    {
      emoji: '📚',
      title: 'Memory Mastery Guide',
      description: 'Master your lines faster than you ever thought possible',
      color: 'border-l-4 border-l-[#40E0D0]' // Bluebird
    },
    {
      emoji: '🌊',
      title: 'Into the Well',
      description: 'Tap into authentic emotion on command',
      color: 'border-l-4 border-l-[#D4C137]' // Gold
    },
    {
      emoji: '🧘',
      title: 'Quiet Center Tool',
      description: 'Find calm and focus before any performance',
      color: 'border-l-4 border-l-[#E86952]' // Coral
    },
    {
      emoji: '🎭',
      title: 'Character Creation System',
      description: 'Build believable characters from scratch',
      color: 'border-l-4 border-l-[#40E0D0]' // Bluebird
    },
    {
      emoji: '📋',
      title: '3-Day Audition Playbook',
      description: 'Prepare and nail your next audition',
      color: 'border-l-4 border-l-[#D4C137]' // Gold
    }
  ];

  if (!ritualComplete) {
    return <GoldenRitual onComplete={() => setRitualComplete(true)} />;
  }

  return (
    <div className="theme-storybook bg-ivory min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-heading text-ink mb-6"
          >
            Your Actor's Toolkit
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-body text-ink/80 leading-relaxed"
          >
            Everything you need to start acting. Today.
          </motion.p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl space-y-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className={`p-8 bg-white hover:shadow-lg transition-shadow ${tool.color}`}>
                <div className="flex items-start gap-6">
                  <span className="text-5xl">{tool.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading text-ink mb-2">{tool.title}</h3>
                    <p className="text-lg font-body text-ink/70 mb-4">{tool.description}</p>
                    <Button
                      variant="outline"
                      className="border-ink/20 hover:bg-ink hover:text-ivory"
                    >
                      Download →
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Challenge Upsell */}
      <section className="py-24 px-6 bg-charcoal text-ivory">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display text-gold mb-8">
              Ready for the Next Step?
            </h2>
            <p className="text-xl md:text-2xl font-serif opacity-80 mb-12 leading-relaxed">
              The Challenge is waiting. 30 self-tapes. 6 weeks. Your money back if you complete it.
            </p>
            <Button
              onClick={() => window.location.href = '/challenge#challenge'}
              className="bg-gold text-void hover:bg-ivory font-display uppercase tracking-widest px-12 py-6 text-lg rounded-full"
            >
              See The Challenge →
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
