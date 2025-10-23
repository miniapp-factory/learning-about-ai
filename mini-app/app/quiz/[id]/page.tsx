"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMiniAppContext } from "@/components/context/miniapp-provider";
import { lessons } from "@/data/lessons";
import { Button } from "@/components/ui/button";

export default function QuizPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { unlockLesson } = useMiniAppContext();
  const lesson = lessons.find((l) => l.quizId === id);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    unlockLesson(lesson?.id ?? "");
    const currentIndex = lessons.findIndex((l) => l.id === lesson?.id);
    const next = lessons[currentIndex + 1];
    if (next) {
      router.push(`/lesson/${next.id}`);
    } else {
      router.push("/");
    }
  };

  if (!lesson) return <p>Quiz not found.</p>;

  return (
    <main className="flex flex-col gap-4 place-items-center px-4">
      <h1 className="text-2xl font-bold">{lesson.title} – Quiz</h1>
      <p>Quiz content for {lesson.title} goes here.</p>
      <Button onClick={handleSubmit} disabled={submitted}>
        {submitted ? "Completed" : "Submit Quiz"}
      </Button>
    </main>
  );
}
