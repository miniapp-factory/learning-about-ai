import { title, description } from "@/lib/metadata";
import { LessonCard } from "@/components/ui/lesson-card";
import { lessons } from "@/data/lessons";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 place-items-center px-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </main>
  );
}
