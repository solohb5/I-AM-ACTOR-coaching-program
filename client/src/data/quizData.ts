import { QuizQuestion, ResultType } from '@/types/quiz';

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "When you watch movies or TV, do you ever think 'I could do that'?",
    answers: [
      { text: "Yes, all the time", scores: { storyteller: 3, transformer: 2 } },
      { text: "Sometimes", scores: { truthTeller: 2, observer: 2 } },
      { text: "Rarely, but I'm curious", scores: { lateBlocker: 2, observer: 1 } }
    ]
  },
  {
    id: 2,
    question: "What type of content do you watch most?",
    answers: [
      { text: "Dramas that make me feel something", scores: { truthTeller: 3, storyteller: 1 } },
      { text: "Comedies that make me laugh", scores: { observer: 3 } },
      { text: "Action, thrillers, or fantasy", scores: { transformer: 3 } },
      { text: "Everything — I love it all", scores: { storyteller: 2, lateBlocker: 1 } }
    ]
  },
  {
    id: 3,
    question: "Have you ever acted before? (School plays, community theater, etc.)",
    answers: [
      { text: "Yes, and I loved it", scores: { storyteller: 3, truthTeller: 2 } },
      { text: "A little bit, long ago", scores: { lateBlocker: 3, transformer: 1 } },
      { text: "No, but I've always wanted to", scores: { lateBlocker: 3, observer: 2 } },
      { text: "No, I'm just exploring", scores: { observer: 2, transformer: 1 } }
    ]
  },
  {
    id: 4,
    question: "How long have you been thinking about acting?",
    answers: [
      { text: "Less than a year", scores: { observer: 1, transformer: 1, storyteller: 1, truthTeller: 1, lateBlocker: 1 } },
      { text: "1-3 years", scores: { transformer: 2, storyteller: 2 } },
      { text: "3-10 years", scores: { truthTeller: 2, lateBlocker: 2 } },
      { text: "More than 10 years", scores: { lateBlocker: 3, truthTeller: 2 } }
    ]
  },
  {
    id: 5,
    question: "What draws you to acting?",
    answers: [
      { text: "Expressing real emotions", scores: { truthTeller: 3 } },
      { text: "Making people laugh", scores: { observer: 3 } },
      { text: "Becoming different characters", scores: { transformer: 3 } },
      { text: "Telling important stories", scores: { storyteller: 3 } }
    ]
  },
  {
    id: 6,
    question: "What kind of roles excite you most?",
    answers: [
      { text: "Deep, emotional, dramatic roles", scores: { truthTeller: 3 } },
      { text: "Comedy and making people laugh", scores: { observer: 3 } },
      { text: "Villains, heroes, transformations", scores: { transformer: 3 } },
      { text: "Roles that tell meaningful stories", scores: { storyteller: 3 } }
    ]
  },
  {
    id: 7,
    question: "Do people in your life know you want to act?",
    answers: [
      { text: "No, I keep it to myself", scores: { truthTeller: 3, lateBlocker: 2 } },
      { text: "A few people know", scores: { observer: 2, storyteller: 2 } },
      { text: "Yes, everyone knows", scores: { storyteller: 3, transformer: 1 } }
    ]
  },
  {
    id: 8,
    question: "What's really stopped you from starting?",
    answers: [
      { text: "Someone told me it wasn't practical", scores: { lateBlocker: 3, truthTeller: 2 } },
      { text: "I thought I was too old", scores: { lateBlocker: 3, storyteller: 1 } },
      { text: "I was scared of being judged", scores: { truthTeller: 3, observer: 1 } },
      { text: "I didn't know where to begin", scores: { observer: 2, transformer: 2 } },
      { text: "All of the above", scores: { lateBlocker: 4, truthTeller: 2, observer: 1, transformer: 1, storyteller: 1 } }
    ]
  },
  {
    id: 9,
    question: "If I sent you 5 simple lines right now, could you record yourself saying them on your phone?",
    subtext: "If you said yes, check your inbox.",
    answers: [
      { text: "Yes", scores: { storyteller: 2, truthTeller: 2, transformer: 2 } },
      { text: "Maybe", scores: { truthTeller: 2, observer: 1 } },
      { text: "No, not yet", scores: { lateBlocker: 2, observer: 1 } }
    ]
  }
];

export const resultTypes: Record<string, ResultType> = {
  truthTeller: {
    name: "The Emotional Truth-Teller",
    headline: "You're an Emotional Truth-Teller.",
    body: `
      <p>You feel things deeply — and it shows.</p>
      <p>You're drawn to drama, to moments that crack people open. The roles that stay with you are the ones that make you FEEL something. You've probably cried at movies more than you'd admit.</p>
      <p>Meryl Streep, Viola Davis, Joaquin Phoenix — they're Emotional Truth-Tellers. They don't just act. They expose something real.</p>
      <p>Here's the thing: <strong>You've been rehearsing for this your whole life.</strong> Every time you felt something deeply and held it in? That's material. Every heartbreak, every joy, every moment of rage you swallowed? That's fuel.</p>
      <p>This thing you've been feeling — the pull toward acting — it's not random. It's not silly. It's not too late.</p>
      <p><strong>It's a signal.</strong></p>
      <p><strong>You're allowed to want this.</strong></p>
    `
  },
  observer: {
    name: "The Witty Observer",
    headline: "You're a Witty Observer.",
    body: `
      <p>You see what others miss.</p>
      <p>The absurdity. The irony. The tiny human moments that are actually hilarious if anyone would just pay attention. You've been making people laugh your whole life — sometimes on purpose, sometimes just by being yourself.</p>
      <p>Robin Williams, Julia Louis-Dreyfus, Bill Hader — they're Witty Observers. They don't tell jokes. They reveal truth through humor.</p>
      <p>Here's the thing: <strong>Comedy isn't about being funny. It's about seeing clearly.</strong> And you already do that. You notice the weird, wonderful, ridiculous details of being human.</p>
      <p>That's not a party trick. That's a superpower.</p>
      <p>The world needs people who can make others laugh. Especially now.</p>
      <p><strong>You're allowed to want this.</strong></p>
    `
  },
  transformer: {
    name: "The Transformer",
    headline: "You're a Transformer.",
    body: `
      <p>You disappear into other people.</p>
      <p>Different voice. Different walk. Different soul. You're not interested in playing yourself — you want to become someone else entirely. The idea of transformation thrills you.</p>
      <p>Gary Oldman, Cate Blanchett, Christian Bale — they're Transformers. You watch their work and forget who's underneath.</p>
      <p>Here's the thing: <strong>You've been shapeshifting your whole life.</strong> Adapting to situations. Reading rooms. Becoming who you needed to be. That's not fakeness. That's range.</p>
      <p>Most people are stuck being one version of themselves. You have access to multitudes.</p>
      <p>That's not weird. That's a gift.</p>
      <p><strong>You're allowed to want this.</strong></p>
    `
  },
  storyteller: {
    name: "The Natural Storyteller",
    headline: "You're a Natural Storyteller.",
    body: `
      <p>When you talk, people lean in.</p>
      <p>You have presence. Something about the way you tell a story — the timing, the pauses, the way you hold a room — makes people want to listen. You've probably been told you're "captivating" or "magnetic" without fully understanding why.</p>
      <p>Tom Hanks, Oprah, Denzel Washington — they're Natural Storytellers. They don't need tricks. They just ARE compelling.</p>
      <p>Here's the thing: <strong>Presence isn't something you learn. It's something you uncover.</strong> And you already have it — you just might not have had a place to use it.</p>
      <p>The camera loves people like you. Audiences trust people like you.</p>
      <p>Stop hiding in rooms where no one's paying attention.</p>
      <p><strong>You're allowed to want this.</strong></p>
    `
  },
  lateBlocker: {
    name: "The Late Bloomer",
    headline: "You're a Late Bloomer.",
    body: `
      <p>You've been carrying this dream for a long time.</p>
      <p>Years. Maybe decades. You've watched others do what you secretly wanted to do. You've told yourself it's too late, you're too old, the window closed.</p>
      <p><strong>It didn't.</strong></p>
      <p>Morgan Freeman got his first major role at 52. Alan Rickman was in his 40s. Kathryn Joosten started at 56. Viola Davis didn't get her breakthrough until 43.</p>
      <p>Here's the thing: <strong>Late Bloomers have something 22-year-olds don't.</strong> Life experience. Depth. Stories written on your face. You can't fake that. You can't teach it.</p>
      <p>The industry is desperate for actors who look like real people, not teenagers playing adults.</p>
      <p>Your "lateness" isn't a disadvantage. It's your edge.</p>
      <p><strong>You're allowed to want this.</strong></p>
    `
  }
};

// Priority order for result calculation (lateBlocker checked first)
export const resultPriority = ['lateBlocker', 'truthTeller', 'transformer', 'storyteller', 'observer'];
