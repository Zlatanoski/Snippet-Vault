import { Github, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "@/components/DashboardPreview";

export function Hero() {
    return (
        <>
            {/* Text + buttons */}
            <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center">
                <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-black sm:text-7xl dark:text-white">
                    All you{" "}
                    <span className="text-violet-600 dark:text-violet-400">need</span>.
                    <br />
                    Nothing you don&apos;t.
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-neutral-500 dark:text-neutral-400">
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

            {/* Dashboard preview */}
            <div className="mx-auto mt-4 max-w-7xl px-6 pb-24">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-2xl dark:border-neutral-800">

                    {/* Bottom fade — makes the crop look intentional */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white dark:from-neutral-950" />

                    {/* Fixed height window — no scrolling */}
                    <div className="h-[560px] overflow-hidden">
                        <div
                            className="pointer-events-auto origin-top-left"
                            style={{
                                transform: "scale(0.75)",
                                width: "133.33%",   /* 100 / 0.75 */
                            }}
                        >
                            <DashboardPreview />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}