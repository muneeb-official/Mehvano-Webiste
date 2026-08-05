import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="grid min-h-[70vh] place-items-center bg-cream pt-24">
        <Container className="text-center">
          <Eyebrow>Page not found</Eyebrow>
          <p className="mt-6 font-display text-7xl font-black text-fg sm:text-8xl">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-fg">
            We couldn&rsquo;t find that page
          </h1>
          <p className="mx-auto mt-3 max-w-md text-fg-muted">
            The link may be broken or the page may have moved. Let&rsquo;s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" icon="arrow-up-right">Back home</Button>
            <Button href="/services" variant="outline">Browse services</Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
