import Benefits from "./features/home/components/Benefits";
import Hero from "./features/home/components/Hero";
import ProductGrid from "./features/home/components/ProductGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductGrid />
      <Benefits />
    </main>
  );
}
