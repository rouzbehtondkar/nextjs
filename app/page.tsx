import Link from "next/link";
import Benefits from "./features/home/components/Benefits";
import Hero from "./features/home/components/Hero";
import ProductGridLoader from "./features/home/components/ProductGridLoader";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductGridLoader />
      <Benefits />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/next-lab"
            className="theme-surface block rounded-3xl border p-8 transition hover:-translate-y-1"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="theme-muted text-sm font-bold">Next.js Learning Lab</p>
            <h2 className="theme-text mt-2 text-2xl font-black">دموهای SSR، CSR، SSG، ISR و Components</h2>
            <p className="theme-muted-strong mt-3">برای تمرین مباحث رندرینگ Next.js وارد آزمایشگاه شو ←</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
