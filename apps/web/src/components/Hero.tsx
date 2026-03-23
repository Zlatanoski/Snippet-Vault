import { Github, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-16 pt-24 text-center">
      <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-black sm:text-6xl dark:text-white">
        All you{" "}
        <span className="text-violet-600 dark:text-violet-400">need</span>.
        <br />
        Nothing you don&apos;t.
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
        Snippet Vault gives you clean planning, focused execution, and full
        ownership of your workflow from backlog to release.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" size="lg" className="gap-2">
          <Cloud className="h-4 w-4" />
          Cloud
        </Button>

        <Button size="lg">Get Started</Button>

        <Button variant="outline" size="lg" className="gap-2">
          <Github className="h-4 w-4" />
          GitHub
        </Button>
      </div>
    </section>
  );
}
