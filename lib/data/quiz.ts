import type { QuizQuestion } from '@/lib/types'

export const QUIZ_CATEGORIES = [
  'World Cup',
  'Champions League',
  'Premier League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Managers',
  'Transfers',
  'Legends',
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'World Cup',
    question: 'Which country won the 2014 FIFA World Cup?',
    options: ['Brazil', 'Germany', 'Argentina', 'Netherlands'],
    answer: 1,
  },
  {
    id: 'q2',
    category: 'World Cup',
    question: 'Who won the Golden Ball at the 2022 World Cup?',
    options: ['Kylian Mbappé', 'Lionel Messi', 'Luka Modrić', 'Antoine Griezmann'],
    answer: 1,
  },
  {
    id: 'q3',
    category: 'Champions League',
    question: 'Which club has won the most Champions League titles?',
    options: ['Barcelona', 'AC Milan', 'Real Madrid', 'Bayern Munich'],
    answer: 2,
  },
  {
    id: 'q4',
    category: 'Champions League',
    question: 'Who scored the winning goal in the 2005 final comeback for Liverpool?',
    options: ['Steven Gerrard', 'Xabi Alonso', 'Vladimír Šmicer', 'Penalty shootout'],
    answer: 3,
  },
  {
    id: 'q5',
    category: 'Premier League',
    question: 'Which club went unbeaten in the 2003-04 Premier League season?',
    options: ['Manchester United', 'Chelsea', 'Arsenal', 'Liverpool'],
    answer: 2,
  },
  {
    id: 'q6',
    category: 'Premier League',
    question: 'Who holds the record for most Premier League goals?',
    options: ['Wayne Rooney', 'Alan Shearer', 'Harry Kane', 'Sergio Agüero'],
    answer: 1,
  },
  {
    id: 'q7',
    category: 'La Liga',
    question: 'How many La Liga goals did Lionel Messi score in 2011-12?',
    options: ['50', '46', '38', '43'],
    answer: 0,
  },
  {
    id: 'q8',
    category: 'Serie A',
    question: 'Which club is known as "La Vecchia Signora"?',
    options: ['AC Milan', 'Inter', 'Juventus', 'Roma'],
    answer: 2,
  },
  {
    id: 'q9',
    category: 'Bundesliga',
    question: 'Which club has dominated the Bundesliga with the most titles?',
    options: ['Borussia Dortmund', 'Bayern Munich', 'Schalke 04', 'Hamburg'],
    answer: 1,
  },
  {
    id: 'q10',
    category: 'Managers',
    question: 'Which manager won the treble with Barcelona in 2009?',
    options: ['José Mourinho', 'Pep Guardiola', 'Frank Rijkaard', 'Luis Enrique'],
    answer: 1,
  },
  {
    id: 'q11',
    category: 'Transfers',
    question: 'Which player holds the record for the most expensive transfer?',
    options: ['Kylian Mbappé', 'Neymar', 'Philippe Coutinho', 'João Félix'],
    answer: 1,
  },
  {
    id: 'q12',
    category: 'Legends',
    question: 'Which legend was nicknamed "Der Kaiser"?',
    options: ['Gerd Müller', 'Franz Beckenbauer', 'Lothar Matthäus', 'Paul Breitner'],
    answer: 1,
  },
  {
    id: 'q13',
    category: 'Legends',
    question: 'Which country did Diego Maradona lead to World Cup glory in 1986?',
    options: ['Brazil', 'Argentina', 'Italy', 'Uruguay'],
    answer: 1,
  },
  {
    id: 'q14',
    category: 'World Cup',
    question: 'Where was the 1970 World Cup, won by Brazil, held?',
    options: ['Mexico', 'Spain', 'Germany', 'Argentina'],
    answer: 0,
  },
  {
    id: 'q15',
    category: 'Champions League',
    question: 'Which club won the first ever Champions League (rebranded 1992-93)?',
    options: ['AC Milan', 'Marseille', 'Barcelona', 'Ajax'],
    answer: 1,
  },
]

export const QUIZ_RANKS = ['Bronze', 'Silver', 'Gold', 'Elite', 'Legend']
