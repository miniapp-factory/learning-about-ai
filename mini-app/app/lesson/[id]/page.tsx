"use client";

import { useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { PageProps } from "next";

export default function LessonPage({ params }: PageProps<{ id: string }>) {
  const { id } = params;
  const router = useRouter();
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) return <p>Lesson not found.</p>;

  return (
    <main className="flex flex-col gap-4 place-items-center px-4">
      <h1 className="text-3xl font-bold">{lesson.title}</h1>
      <p>{lesson.content}</p>
      <Button onClick={() => router.push(`/quiz/${lesson.quizId}`)}>
        Take Quiz
      </Button>
    </main>
  );
}
