import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import knight from '@assets/images/knight.png';

export default function Success() {
  return (
    <div className="theme-storybook min-h-screen flex items-center justify-center px-6 bg-ivory">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.8
          }}
          className="mb-12"
        >
          <img
            src={knight}
            alt="Success"
            className="w-48 h-48 mx-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-heading text-ink mb-8"
        >
          Welcome to the Journey
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl font-body text-ink/80 mb-12 leading-relaxed"
        >
          Check your email for access to your program materials.
          <br />
          Your transformation begins now.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-coral text-ivory hover:bg-ink font-display uppercase tracking-widest px-12 py-6 text-lg rounded-full"
          >
            Return Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
