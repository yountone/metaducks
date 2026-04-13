import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularTickets } from "@/components/home/PopularTickets";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <CategoryGrid />
        <PopularTickets />
      </main>
      <BottomNav />
    </>
  );
}
