"use client";

import { Card } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CustomButton } from "./ui/CustomButton";
import { SOCIAL_LINKS } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

const RaceChainLanding = () => {
  const launchDate = useMemo(() => new Date("2025-07-30T00:00:00Z"), []);
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
  }, [launchDate]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="w-full py-6">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center">
                <h1 className="text-gradient text-xl md:text-2xl font-extrabold">
                  RaceChain
                </h1>
              </div>
            </div>

            {/* Glass navigation menu */}
            <nav className="hidden md:block bg-[rgba(15,15,25,0.5)] border border-[var(--color-border)] backdrop-blur-lg rounded-xl px-6 py-2">
              <div className="flex space-x-8">
                {["Features", "How it Works", "Roadmap"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>

            <Link href="/meetings">
              <CustomButton color="primary">Get Started</CustomButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                  Revolutionizing Horse Racing with{" "}
                  <span className="text-gradient">On-Chain Betting</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10">
                  AI-powered odds, decentralized liquidity pools, and near-zero
                  fees. Bringing transparency and fairness to the $120B+ horse
                  racing industry.
                </p>
              </motion.div>

              <div className="flex justify-center gap-4">
                <Link href="/meetings">
                  <CustomButton size="lg" color="primary">
                    Get Started
                  </CustomButton>
                </Link>
                <CustomButton size="lg" color="outlined">
                  Learn More
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#121022]/30 to-[#0f263e]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "90% Lower Fees",
                desc: "Just 1% platform fee vs traditional 10% house cuts",
                icon: "💸",
              },
              {
                title: "AI-Powered Odds",
                desc: "Machine learning models generate fair odds using historical data",
                icon: "🤖",
              },
              {
                title: "Fully On-Chain",
                desc: "Transparent betting with automated smart contract payouts",
                icon: "🔗",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 bg-[rgba(15,15,25,0.5)] border border-[var(--color-border)] backdrop-blur-lg rounded-[var(--radius-base)] text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Launching Soon
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The future of on-chain horse race betting is almost here
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {["Days", "Hours", "Mins", "Secs"].map((label) => {
              const key = label.toLowerCase() as keyof typeof timeLeft;
              return (
                <Card
                  key={label}
                  className="flex flex-col items-center justify-center p-4 sm:p-6 bg-[rgba(15,15,25,0.5)] border border-[var(--color-border)] backdrop-blur-lg rounded-[var(--radius-base)]"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white">
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
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[#121022]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Revolutionizing the Betting Industry
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Built on blockchain technology to bring transparency, fairness,
              and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "AI Odds Engine",
                desc: "Machine learning models generate fair odds using historical race data",
                icon: "🧠",
              },
              {
                title: "Decentralized Pools",
                desc: "Transparent liquidity pools instead of centralized bookmakers",
                icon: "🔄",
              },
              {
                title: "1% Platform Fees",
                desc: "Drastically lower than traditional 10% house cuts",
                icon: "💸",
              },
              {
                title: "On-Chain Settlements",
                desc: "Automated payouts via smart contracts with verified results",
                icon: "🔗",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 bg-[rgba(15,15,25,0.5)] border border-[var(--color-border)] backdrop-blur-lg rounded-[var(--radius-base)]">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it%20works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How RaceChain Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A seamless on-chain betting experience from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Select a Race",
                desc: "Browse upcoming horse races with AI-generated odds",
                icon: "/icons/horse-racing.svg",
              },
              {
                step: "2",
                title: "Place Your Bet",
                desc: "Connect your wallet and wager on your chosen outcome",
                icon: "/icons/chips-bet.svg",
              },
              {
                step: "3",
                title: "Watch the Race",
                desc: "Follow the event as the oracle verifies the results",
                icon: "/icons/eye.svg",
              },
              {
                step: "4",
                title: "Get Paid",
                desc: "Smart contracts distribute winnings instantly to winners",
                icon: "/icons/money-bag.svg",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col items-center justify-center p-6 bg-[rgba(15,15,25,0.5)] border border-[var(--color-border)] backdrop-blur-lg rounded-[var(--radius-base)] text-center">
                  <Image
                    src={step.icon}
                    alt={`${step.title} icon`}
                    width={64}
                    height={64}
                    unoptimized
                    className="mb-4"
                  />
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[#14161A] font-bold text-lg mb-4 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4 bg-[#121022]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Development Roadmap
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our journey to revolutionize horse race betting
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-16 h-2 bg-[var(--color-primary)]"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  quarter: "Q3 2025",
                  title: "MVP Launch",
                  items: [
                    "Hackathon MVP",
                    "Core betting functionality",
                    "Initial AI odds engine",
                  ],
                },
                {
                  quarter: "Q4 2025",
                  title: "Global Expansion",
                  items: [
                    "Support all international races",
                    "Mobile app launch",
                    "Enhanced UI/UX",
                  ],
                },
                {
                  quarter: "Q1 2026",
                  title: "Token Ecosystem",
                  items: [
                    "$RACE token launch",
                    "Staking rewards",
                    "Governance features",
                  ],
                },
                {
                  quarter: "Q2 2026",
                  title: "Community AI",
                  items: [
                    "Data contribution rewards",
                    "Model training incentives",
                    "DAO governance",
                  ],
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative z-10">
                    <div className="hidden md:block absolute top-0 left-1/2 -translate-y-8 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--color-primary)] border-4 border-[#121022]"></div>
                    <Card className="h-full p-6 bg-[rgba(15,15,25,0.5)] border border-[var(--color-border)] backdrop-blur-lg rounded-[var(--radius-base)]">
                      <div className="text-[var(--color-primary)] font-bold">
                        {milestone.quarter}
                      </div>
                      <h3 className="text-xl font-bold text-white my-3">
                        {milestone.title}
                      </h3>
                      <ul className="space-y-2">
                        {milestone.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <div className="text-[var(--color-primary)] mr-2">
                              ✓
                            </div>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Powered by Blockchain Technology
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                RaceChain leverages the security and transparency of blockchain
                to create a trustless betting environment:
              </p>

              <div className="space-y-4">
                {[
                  "Smart contract-managed liquidity pools",
                  "On-chain settlement with verified results",
                  "Transparent fee structure (only 1% platform fee)",
                  "Immutable betting records",
                  "Fast transactions using Block DAG technology",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-[var(--color-primary)] mr-3 mt-1">
                      ✓
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1b1138] rounded-[var(--radius-base)] border border-[var(--color-border)] p-8">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-[#121022] border border-[var(--color-border)] rounded-lg flex items-center justify-center"
                  >
                    <div className="text-[var(--color-primary)] font-mono text-sm">
                      0x{index.toString(16)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-gray-400">
                Block DAG infrastructure for high scalability
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 px-4 bg-gradient-to-r from-[#121022] to-[#1b1138]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Future of Betting?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Join RaceChain today and be part of the on-chain betting revolution.
          </p>

          <Link href="/meetings">
            <CustomButton color="primary" size="lg">
              Get Started Now
            </CustomButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-[var(--color-border)]">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <h1 className="text-gradient text-xl font-extrabold">
                RaceChain
              </h1>
            </div>

            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RaceChain — Simuka Solutions
            </div>

            <div className="flex space-x-2 mt-6 md:mt-0">
              {SOCIAL_LINKS.map(({ platform, link, icon }) => (
                <a
                  key={platform}
                  href={link}
                  aria-label={`${platform} link`}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={icon}
                    alt={`${platform} icon`}
                    width={24}
                    height={24}
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RaceChainLanding;
