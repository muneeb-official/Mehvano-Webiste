import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// PortfolioFab (the floating realtor agent widget) has moved out of the app
// with the rest of the portfolio — it now lives at
// portfolio/components/PortfolioFab.tsx. See portfolio/README.md to restore.

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
