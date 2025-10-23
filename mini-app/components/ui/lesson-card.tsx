import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { useMiniAppContext } from "../context/miniapp-provider";
import Link from "next/link";
import { Lock } from "lucide-react";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  quizId: string;
}

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { unlockedLessons, unlockLesson, isLessonUnlocked } = useMiniAppContext();
  const unlocked = isLessonUnlocked(lesson.id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{lesson.content.slice(0, 100)}...</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {unlocked ? (
          <Link href={`/lesson/${lesson.id}`}>
            <Button>Start Lesson</Button>
          </Link>
        ) : (
          <Button disabled>
            <Lock className="mr-2" /> Locked
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
