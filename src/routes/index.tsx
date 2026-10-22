import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guest Speaker Hub | ESSEC Digital Platforms" },
    { name: "description", content: "Recap each ESSEC Digital Platforms guest speaker session, then play an interactive quiz to consolidate what you learned." },
    { property: "og:title", content: "ESSEC Digital Platforms - Guest Speaker Hub" },
    { property: "og:description", content: "Session recaps plus a quick game after each guest speaker session." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Question = { q: string; options: string[]; answer: number };
type SummaryItem = { title: string; body: string; note?: string };
type SummaryCard = { part: string; heading: string; items: SummaryItem[] };
type Session = { id: string; label: string; title: string; active: boolean; summary?: SummaryCard[]; questions?: Question[] };

const SESSION1_SUMMARY: SummaryCard[] = [
  {
    part: "Part 1",
    heading: "Front-End Design, Prompting & Workflow",
    items: [
      {
        title: "Effective Prompting",
        body: "Move from generic requests to structured prompts that spell out your Role, Goal, Target Audience, Core Pages, and Visual Style.",
      },
      {
        title: "Visual Shell & Building",
        body: "Design the visual shell with Claude Design, then use Handoff to build the code with agentic tools such as Claude Code or Lovable.",
      },
    ],
  },
  {
    part: "Part 2",
    heading: "The Web File Triad, GitHub & Vercel",
    items: [
      {
        title: "Core Files",
        body: "index.html holds the structure & text, styles.css handles the visual style & responsive layout, and script.js drives interactivity & behavior.",
      },
      {
        title: "Version Control (GitHub)",
        body: "Manage code through Repositories and understand Fork, Clone, Commit, Push, Pull Request (PR), and Merge.",
        note: "Lovable connects directly via Settings → GitHub → Connect.",
      },
      {
        title: "Continuous Deployment (Vercel)",
        body: "Host GitHub repositories online with automatic updates on every Push.",
      },
    ],
  },
  {
    part: "Part 3",
    heading: "Static Site Limits, Auth & Supabase",
    items: [
      {
        title: "Limits of Static Sites",
        body: "They lack persistent session memory (they forget users) and cannot display live dynamic data.",
      },
      {
        title: "Authentication & Tokens",
        body: "Sign Up creates a user table entry, Log In checks credentials and issues a temporary token, and Log Out removes that token.",
      },
      {
        title: "Supabase",
        body: "An open-source Backend-as-a-Service (BaaS) providing authentication and database support, integrated with GitHub, Vercel, and Lovable.",
      },
    ],
  },
];

// Add more sessions here: set active: true and provide questions + summary.
const SESSIONS: Session[] = [
  {
    id: "s1",
    label: "Session 1",
    title: "Vibe Coding & Web Dev",
    active: true,
    summary: SESSION1_SUMMARY,
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
  const [tab, setTab] = useState(SESSIONS[0]!.id);
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

      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">{current.label}</p>
        <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl">{current.title}</h2>
        <p className="mt-2 text-muted-foreground">
          A recap of what we covered, straight from the course slides — then test yourself with the quiz below.
        </p>

        {current.summary && (
          <section aria-label="Session summary" className="mt-10 space-y-8">
            {current.summary.map((card) => (
              <article
                key={card.part}
                className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary-foreground">
                    {card.part}
                  </span>
                  <h3 className="text-lg font-extrabold sm:text-xl">{card.heading}</h3>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {card.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border bg-background p-5 transition hover:shadow-md"
                    >
                      <h4 className="font-bold text-primary">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                      {item.note && (
                        <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground">
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {current.questions && (
          <section aria-label="Session quiz" className="mt-12">
            <h3 className="text-2xl font-extrabold sm:text-3xl">Test yourself</h3>
            <p className="mt-2 text-muted-foreground">
              Concept match quiz — pick the definition that matches the slides.
            </p>
            <Quiz key={current.id} questions={current.questions} />
          </section>
        )}
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

  const q = questions[i]!;
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
