import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export function MainAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen flex flex-col space-y-6 px-5 md:px-6 lg:px-10 xl:px-14">
      <header>
        <Header /> {/* Header component stays fixed at top */}
      </header>

      <main className="flex-grow">{children}</main>

      <footer>
        <Footer /> {/* Footer component stays fixed at bottom */}
      </footer>
    </div>
  );
}
