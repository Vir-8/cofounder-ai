"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setLoading(true);
    router.push("/analysis");
  };

  return (
    <>
      <Head>
        <title>Empowering Solo Founders with AI</title>
        <meta
          name="description"
          content="Co-Founder AI provides AI-powered insights, automations, and strategic tools to help solo founders launch and grow their startups."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-[#131619] text-white">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-20 py-6">
          <div className="flex gap-2 items-center font-regular text-2xl">
            <a className="flex gap-2" href="/">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-semibold text-white">
                Co-Founder AI
              </span>
            </a>
          </div>
          <div className="flex gap-4">
            <a
              className="hidden sm:flex font-semibold items-center gap-2 px-4 py-2 text-white bg-transparent border border-white/20 rounded-lg hover:bg-white/5"
              href="https://github.com/vir-8/cofounder-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/refinedgithub.svg"}
                alt="GitHub Logo"
                width={20}
                height={20}
              />
              <span>GitHub</span>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-1 items-center justify-center text-center px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-blue-600">Empower Your Startup:</span> AI Tools Tailored for Solo Founders
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10">
              Our platform is designed exclusively for solo founders. We provide AI-driven insights, automated workflows, and strategic guidance to help you overcome challenges, streamline operations, and scale your venture.
            </p>

            <form className="flex flex-col md:flex-row items-center gap-4 justify-center">
              <button
                type="submit"
                className={`bg-[#2E3238] hover:bg-[#3A4149] text-white text-lg font-semibold px-8 py-3 rounded-md transition-colors shadow-lg
                  ${loading ? "opacity-50 cursor-not-allowed hover-not-allowed" : ""}`}
                disabled={loading}
                onClick={handleButtonClick}
              >
                Get Started
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-4">
              Discover how AI can accelerate your journey as a solo founder.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Co-Founder AI. All rights reserved.
        </footer>
      </div>
    </>
  );
}
