import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { questions, resultTypes, resultPriority } from '@/data/quizData';
import { QuizAnswer, QuizScores, QuizStage, ResultType } from '@/types/quiz';
import { subscribeToMailerLite } from '@/lib/api';
import knightLook from '@assets/images/knight-look.png';
import hansAccessible from '@assets/images/hans-accessible.png';
import toolsMobile from '@assets/images/tools-mobile.png';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [scores, setScores] = useState<QuizScores>({
    truthTeller: 0,
    observer: 0,
    transformer: 0,
    storyteller: 0,
    lateBlocker: 0
  });
  const [userEmail, setUserEmail] = useState('');
  const [quizStage, setQuizStage] = useState<QuizStage>('hero');
  const [showToolkitModal, setShowToolkitModal] = useState(false);
  const [finalResult, setFinalResult] = useState<ResultType | null>(null);

  // Calculate result based on scores
  const calculateResult = (currentScores: QuizScores): ResultType => {
    let maxScore = 0;
    let resultKey = 'lateBlocker';

    // Check priority order
    for (const key of resultPriority) {
      const score = currentScores[key as keyof QuizScores];
      if (score > maxScore) {
        maxScore = score;
        resultKey = key;
      }
    }

    return resultTypes[resultKey];
  };

  // Handle answer selection
  const handleAnswer = async (answer: QuizAnswer) => {
    // Update scores
    const newScores = { ...scores };
    Object.entries(answer.scores).forEach(([type, points]) => {
      newScores[type as keyof QuizScores] += points || 0;
    });
    setScores(newScores);
    setUserAnswers([...userAnswers, answer]);

    // Move to next question or stage
    if (currentQuestion === 4) {
      // After Q5, show credibility slide
      setQuizStage('credibility');
    } else if (currentQuestion === 5) {
      // After Q6, show email gate
      setQuizStage('email');
    } else if (currentQuestion === 8) {
      // After Q9, show loading then results
      setQuizStage('loading');

      // Calculate final result
      const result = calculateResult(newScores);
      setFinalResult(result);

      // Show result after 2 seconds
      setTimeout(() => {
        setQuizStage('result');
      }, 2000);
    } else {
      // Continue to next question
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Continue from credibility slide
  const continueToQuestion6 = () => {
    setCurrentQuestion(5);
    setQuizStage('question');
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!userEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    // Calculate preliminary result based on Q1-Q6
    const preliminaryResult = calculateResult(scores);

    // Submit to MailerLite (fire and forget)
    subscribeToMailerLite(userEmail, preliminaryResult.name);

    // Continue to Q7
    setCurrentQuestion(6);
    setQuizStage('question');
  };

  // Hero Component
  const QuizHero = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-alabaster flex items-center justify-center px-6"
    >
      <div className="text-center max-w-3xl">
        <motion.img
          src={knightLook}
          alt="Knight"
          className="w-48 h-48 mx-auto mb-12 opacity-80"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 0.2 }}
        />
        <motion.h1
          className="text-6xl md:text-7xl font-display text-gold mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          What Kind of Actor Are You?
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-serif opacity-80 mb-12 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          9 questions. Your result reveals something you already know.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => setQuizStage('question')}
            className="bg-gold text-void hover:bg-alabaster font-display uppercase tracking-widest px-12 py-6 text-lg rounded-none"
          >
            Start Quiz
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );

  // Question Component
  const QuestionCard = () => {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const progressText = currentQuestion === 8 ? 'Last Question' : `Question ${currentQuestion + 1} of ${questions.length}`;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-void text-alabaster flex items-center justify-center px-6 py-12"
      >
        <div className="max-w-3xl w-full">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-sans uppercase tracking-wider opacity-60">{progressText}</span>
              <span className="text-sm font-sans opacity-60">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
              {question.question}
            </h2>
            {question.subtext && (
              <p className="text-lg opacity-60 font-serif italic mb-8">{question.subtext}</p>
            )}
          </motion.div>

          {/* Answers */}
          <div className="space-y-4 mt-12">
            {question.answers.map((answer, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(answer)}
                className="w-full text-left p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 transition-all duration-300 rounded-lg group"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <span className="text-lg md:text-xl font-serif">{answer.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Credibility Slide (After Q5)
  const CredibilitySlide = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-alabaster flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full">
        <div className="bg-white/5 border border-gold/30 p-8 md:p-12 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={hansAccessible}
              alt="Hans Christopher"
              className="w-32 h-32 rounded-full grayscale"
              style={{ transform: 'scaleX(-1)' }}
            />
            <div className="flex-1">
              <p className="text-xl md:text-2xl font-serif leading-relaxed mb-6 italic">
                "I built this for the version of me who waited 5 years to start. You don't need more time. You need permission."
              </p>
              <p className="text-sm font-sans uppercase tracking-wider opacity-60">
                Hans Christopher — FBI • Walking Dead • Animal Kingdom
              </p>
            </div>
          </div>
          <div className="mt-8">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gold" style={{ width: '67%' }} />
            </div>
            <p className="text-sm text-center opacity-60">67% Complete</p>
          </div>
          <Button
            onClick={continueToQuestion6}
            className="w-full mt-8 bg-gold text-void hover:bg-alabaster font-display uppercase tracking-widest py-6 text-lg rounded-none"
          >
            Continue
          </Button>
        </div>
      </div>
    </motion.div>
  );

  // Email Gate (After Q6)
  const EmailGate = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-alabaster flex items-center justify-center px-6"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-display text-gold mb-6 text-center">
            You're Almost There
          </h2>
          <p className="text-xl font-serif opacity-80 mb-8 text-center">
            Enter your email to see your result
          </p>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full p-6 bg-white/10 border border-white/20 focus:border-gold text-alabaster placeholder-white/40 text-lg rounded-lg focus:outline-none"
              required
            />
            <Button
              type="submit"
              className="w-full bg-gold text-void hover:bg-alabaster font-display uppercase tracking-widest py-6 text-lg rounded-none"
            >
              See My Result →
            </Button>
          </form>
          <p className="text-sm opacity-40 mt-4 text-center font-sans">
            Your email stays private. No spam. Ever.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );

  // Loading Screen
  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-alabaster flex flex-col items-center justify-center px-6"
    >
      <motion.img
        src={knightLook}
        alt="Loading"
        className="w-32 h-32 mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: 'linear' }}
      />
      <p className="text-2xl font-serif opacity-80">Calculating your results...</p>
    </motion.div>
  );

  // Result Display
  const ResultDisplay = () => {
    if (!finalResult) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-void text-alabaster px-6 py-12"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-display text-gold mb-6">
              {finalResult.headline}
            </h1>
            <div
              className="text-xl md:text-2xl font-serif leading-relaxed opacity-90 prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: finalResult.body }}
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button
              onClick={() => setShowToolkitModal(true)}
              className="bg-gold text-void hover:bg-alabaster font-display uppercase tracking-widest px-12 py-6 text-lg rounded-none"
            >
              Want to Take It Further? →
            </Button>
          </motion.div>

          <div className="mt-8 text-center">
            <img
              src={knightLook}
              alt="Knight"
              className="w-64 h-64 mx-auto opacity-20"
            />
          </div>
        </div>
      </motion.div>
    );
  };

  // Toolkit Modal
  const ToolkitModal = () => (
    <Dialog open={showToolkitModal} onOpenChange={setShowToolkitModal}>
      <DialogContent className="max-w-2xl bg-parchment text-ink border-gold/30">
        <div className="p-6">
          <h2 className="text-4xl font-display text-charcoal mb-4">THE ACTOR'S TOOLKIT</h2>
          <p className="text-lg font-serif opacity-80 mb-6">Everything you need to start. Today.</p>

          <img src={toolsMobile} alt="Tools" className="w-full mb-8 rounded-lg" />

          <div className="space-y-3 mb-8">
            {[
              '✓ Memory Mastery',
              '✓ Into the Well',
              '✓ Quiet Center Tool',
              '✓ Character Creation',
              '✓ 3-Day Audition Playbook'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-lg font-serif">
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-4">
            <p className="text-3xl font-display text-gold mb-2">$37 — Instant Access</p>
            <p className="text-sm opacity-60">Plus a bonus gift inside</p>
          </div>

          <Button
            onClick={() => window.location.href = 'https://buy.stripe.com/bJe4gyeNWal51ZK69s1ck0p'}
            className="w-full bg-gold text-void hover:bg-charcoal hover:text-ivory font-display uppercase tracking-widest py-6 text-lg rounded-none"
          >
            Get the Toolkit →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="font-serif">
      <AnimatePresence mode="wait">
        {quizStage === 'hero' && <QuizHero key="hero" />}
        {quizStage === 'question' && <QuestionCard key={`question-${currentQuestion}`} />}
        {quizStage === 'credibility' && <CredibilitySlide key="credibility" />}
        {quizStage === 'email' && <EmailGate key="email" />}
        {quizStage === 'loading' && <LoadingScreen key="loading" />}
        {quizStage === 'result' && <ResultDisplay key="result" />}
      </AnimatePresence>

      <ToolkitModal />
    </div>
  );
}
