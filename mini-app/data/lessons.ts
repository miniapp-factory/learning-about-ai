export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  quizId: string;
}

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Introduction to Blockchain",
    description: "Learn what a blockchain is and how it works.",
    content: "Blockchain is a distributed ledger that records transactions across many computers. It ensures data integrity, transparency, and decentralization, enabling secure peer-to-peer interactions without a central authority.",
    quizId: "quiz-1",
  },
  {
    id: "lesson-2",
    title: "Smart Contracts",
    description: "Understand how smart contracts automate agreements.",
    content: "Smart contracts are self-executing contracts with the terms directly written into code. They run on blockchain networks, automatically enforcing rules and conditions without intermediaries.",
    quizId: "quiz-2",
  },
  {
    id: "lesson-3",
    title: "Decentralized Applications (DApps)",
    description: "Explore how DApps are built on blockchain networks.",
    content: "DApps are applications that run on a decentralized network, typically using smart contracts. They offer greater resilience, censorship resistance, and often provide new economic models for users.",
    quizId: "quiz-3",
  },
];
