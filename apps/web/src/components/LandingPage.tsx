import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar />
      <Hero />
    </div>
  );
}
