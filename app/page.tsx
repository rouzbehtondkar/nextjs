import Benefits from "./features/home/components/Benefits";
import Hero from "./features/home/components/Hero";
import ProductGridLoader from "./features/home/components/ProductGridLoader";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductGridLoader />
      <Benefits />
    </main>
  );
}
