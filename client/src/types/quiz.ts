export interface QuizAnswer {
  text: string;
  scores: {
    truthTeller?: number;
    observer?: number;
    transformer?: number;
    storyteller?: number;
    lateBlocker?: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtext?: string;
  answers: QuizAnswer[];
}

export interface QuizScores {
  truthTeller: number;
  observer: number;
  transformer: number;
  storyteller: number;
  lateBlocker: number;
}

export interface ResultType {
  name: string;
  headline: string;
  body: string;
}

export type QuizStage = 'hero' | 'question' | 'credibility' | 'email' | 'loading' | 'result';
