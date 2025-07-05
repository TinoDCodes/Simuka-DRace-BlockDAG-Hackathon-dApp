// app/page.tsx
"use client";

import { Card } from "@heroui/react";
import { useEffect, useState } from "react";

const ComingSoon = () => {
  const launchDate = new Date("2025-07-30T00:00:00Z");
  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    mins: "--",
    secs: "--",
  });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = launchDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", mins: "00", secs: "00" });
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        mins: String(mins).padStart(2, "0"),
        secs: String(secs).padStart(2, "0"),
      });
    };

    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Logo in top left corner */}
      <div className="mt-6 ml-6 absolute">
        <h1 className="text-gradient text-2xl md:text-3xl font-extrabold">
          RaceChain
        </h1>
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 mt-10">
        {/* Title - Replaced with "Coming Soon!" */}
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-center tracking-tight">
          Coming Soon!
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-300 max-w-lg text-center mb-12">
          On‑chain horse race betting with AI‑generated odds, decentralized
          pools & near‑zero fees.
        </p>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md mb-12">
          {["Days", "Hours", "Mins", "Secs"].map((label, i) => {
            const key = label.toLowerCase() as keyof typeof timeLeft;
            return (
              <Card
                key={label}
                className="flex flex-col items-center justify-center p-4 sm:p-6 bg-[var(--background)] bg-opacity-50 backdrop-blur-lg rounded-[var(--radius-base)]"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  {timeLeft[key]}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wide text-gray-400 mt-1">
                  {label}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} RaceChain — Simuka Solutions
      </footer>
    </main>
  );
};

export default ComingSoon;
