
export interface QuizAnswer {
  questionId: number;
  answerText: string;
  scoreValue: 'hot' | 'maybe' | 'cold';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: 'hot' | 'maybe' | 'cold';
  }[];
}
