import { ThemeProvider } from "../ThemeProvider";
import { LandingPage } from "../LandingPage";

export default function LandingPageExample() {
  return (
    <ThemeProvider>
      <LandingPage onEnterApp={() => console.log("Enter app clicked")} />
    </ThemeProvider>
  );
}
