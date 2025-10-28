import { ArrowRight, Lock, Zap, FileDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "./ThemeToggle";

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <h1 className="text-2xl font-heading font-bold text-foreground">
            NOTE-MINT
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 lg:py-32 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-6 text-foreground">
              Premium Note-Taking,
              <br />
              <span className="text-primary">Zero Compromises</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Blazing-fast, ultra-private note-taking with instant PDF export.
              Your notes stay with you, nothing stored on our servers.
            </p>
            <Button
              size="lg"
              onClick={onEnterApp}
              className="gap-2 text-lg px-8 py-6 h-auto"
              data-testid="button-enter-app"
            >
              Start Taking Notes
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-center mb-12">
              Built for Privacy & Speed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Session-Only Storage</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your notes are stored only in your browser session. Close the tab, and everything disappears automatically.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Lightning Fast</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Instant load times, smooth interactions, and zero lag. Built for productivity without the bloat.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileDown className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Instant PDF Export</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Export any note as a professionally formatted PDF with a single click. All processing happens in your browser.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="p-8 lg:p-12 text-center bg-primary/5 border-primary/20">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl lg:text-3xl font-heading font-semibold mb-4">
                Your Privacy is Guaranteed
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                NOTE-MINT operates entirely in your browser. We don't collect, store, or transmit your notes.
                When you close your browser tab, your session data is automatically cleared.
                It's that simple.
              </p>
              <div className="flex flex-wrap gap-3 justify-center text-sm">
                <div className="px-4 py-2 rounded-full bg-background border">
                  ✓ No server storage
                </div>
                <div className="px-4 py-2 rounded-full bg-background border">
                  ✓ No data tracking
                </div>
                <div className="px-4 py-2 rounded-full bg-background border">
                  ✓ No accounts required
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NOTE-MINT. Premium note-taking for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
