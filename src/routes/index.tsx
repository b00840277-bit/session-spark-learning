import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guest Speaker Hub | ESSEC Digital Platforms" },
      { name: "description", content: "Interactive quizzes to consolidate each ESSEC Digital Platforms guest speaker session." },
      { property: "og:title", content: "ESSEC Digital Platforms - Guest Speaker Hub" },
      { property: "og:description", content: "Play a quick game after each guest speaker session." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Question = { q: string; options: string[]; answer: number };
type Session = { id: string; label: string; title: string; active: boolean; questions?: Question[] };

// Add more sessions here: set active: true and provide questions.
const SESSIONS: Session[] = [
  {
    id: "s1",
    label: "Session 1",
    title: "LaunchLab Vibe Coding",
    active: true,
    questions: [
      {
        q: "According to the slides, what is index.html?",
        options: [
          "The look: colours, fonts, spacing, and how it changes on a phone versus a laptop.",
          "The words, structure, every heading, button and paragraph people actually read.",
          "The behaviour: what happens when somebody clicks, types, or hits submit.",
          "Reads your GitHub repo, builds the site, and hosts it at a live public link.",
        ],
        answer: 1,
      },
      {
        q: "What is styles.css used for?",
        options: [
          "The single location where all project files and their history are kept.",
          "The words, structure, every heading, button and paragraph people actually read.",
          "The look: colours, fonts, spacing, and how it changes on a phone versus a laptop.",
          "The behaviour: what happens when somebody clicks, types, or hits submit.",
        ],
        answer: 2,
      },
      {
        q: "What does script.js control?",
        options: [
          "The behaviour: what happens when somebody clicks, types, or hits submit.",
          "The look: colours, fonts, spacing, and how it changes on a phone versus a laptop.",
          "Reads your GitHub repo, builds the site, and hosts it at a live public link.",
          "The words, structure, every heading, button and paragraph people actually read.",
        ],
        answer: 0,
      },
      {
        q: "What is a GitHub Repository?",
        options: [
          "Reads your GitHub repo, builds the site, and hosts it at a live public link.",
          "The behaviour: what happens when somebody clicks, types, or hits submit.",
          "The words, structure, every heading, button and paragraph people actually read.",
          "The single location where all project files and their history are kept.",
        ],
        answer: 3,
      },
      {
        q: "What is the main function of Vercel?",
        options: [
          "The single location where all project files and their history are kept.",
          "Reads your GitHub repo, builds the site, and hosts it at a live public link.",
          "The look: colours, fonts, spacing, and how it changes on a phone versus a laptop.",
          "The behaviour: what happens when somebody clicks, types, or hits submit.",
        ],
        answer: 1,
      },
    ],
  },
  { id: "s2", label: "Session 2", title: "Guest Speaker", active: false },
  { id: "s3", label: "Session 3", title: "Guest Speaker", active: false },
  { id: "s4", label: "Session 4", title: "Guest Speaker", active: false },
];

function Index() {
  const [tab, setTab] = useState(SESSIONS[0].id);
  const current = SESSIONS.find((s) => s.id === tab)!;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 pt-4">
          <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            ESSEC MMD <span className="text-primary">·</span> Digital Platforms Hub
          </h1>
          <nav className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-3" role="tablist">
            {SESSIONS.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={tab === s.id}
                disabled={!s.active}
                onClick={() => setTab(s.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  tab === s.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : s.active
                      ? "bg-card hover:bg-secondary"
                      : "cursor-not-allowed bg-muted text-muted-foreground"
                }`}
              >
                {s.label}: {s.title}
                {!s.active && <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs">Soon</span>}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">{current.label}</p>
        <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl">{current.title}</h2>
        <p className="mt-2 text-muted-foreground">
          Concept match quiz — pick the definition that matches the slides.
        </p>
        {current.questions && <Quiz key={current.id} questions={current.questions} />}
      </main>
    </div>
  );
}

function Quiz({ questions }: { questions: Question[] }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mt-8 rounded-2xl border bg-card p-8 text-center shadow-sm">
        <p className="text-6xl font-extrabold text-primary" style={{ fontFamily: "var(--font-display)" }}>
          {score}/{questions.length}
        </p>
        <p className="mt-3 text-lg font-bold">
          {pct === 100 ? "Perfect! You nailed every definition 🎉" : pct >= 60 ? "Nice work — almost there!" : "Worth another round 💪"}
        </p>
        <button onClick={restart} className="mt-6 rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground hover:opacity-90">
          Play again
        </button>
      </div>
    );
  }

  const q = questions[i];
  const answered = picked !== null;

  return (
    <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
        <span>Question {i + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${((i + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>
      <h3 className="mt-6 text-xl font-bold sm:text-2xl">{q.q}</h3>
      <div className="mt-5 grid gap-3">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.answer;
          const state = !answered ? "idle" : isCorrect ? "right" : idx === picked ? "wrong" : "dim";
          return (
            <button
              key={idx}
              disabled={answered}
              onClick={() => { setPicked(idx); if (isCorrect) setScore((s) => s + 1); }}
              className={`rounded-xl border-2 p-4 text-left font-semibold transition ${
                state === "idle" ? "hover:border-primary hover:bg-secondary"
                : state === "right" ? "border-success bg-success-soft"
                : state === "wrong" ? "border-destructive bg-destructive-soft"
                : "opacity-50"
              }`}
            >
              {state === "right" && "✅ "}{state === "wrong" && "❌ "}{opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className={`font-bold ${picked === q.answer ? "text-success" : "text-destructive"}`}>
            {picked === q.answer ? "Correct!" : "Not quite — the green one is right."}
          </p>
          <button
            onClick={() => { if (i + 1 < questions.length) { setI(i + 1); setPicked(null); } else setDone(true); }}
            className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground hover:opacity-90"
          >
            {i + 1 < questions.length ? "Next question →" : "See my score"}
          </button>
        </div>
      )}
    </div>
  );
}
