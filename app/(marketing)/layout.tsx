import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// PortfolioFab (the floating realtor agent widget) is temporarily hidden while
// the real-estate division is offline — restore its import + render to bring
// it back.

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
