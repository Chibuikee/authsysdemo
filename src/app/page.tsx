"use client";
import React, { useState, useEffect } from "react";

interface NavigationItem {
  href: string;
  label: string;
}

const Home: React.FC = () => {
  const [navScrolled, setNavScrolled] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
    { href: "#home", label: "Home" }
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      setNavScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ): void => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSignupClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    // You can add analytics tracking or other logic here
    console.log("Signup clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800 text-black">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm border-b border-white border-opacity-20 ${
          navScrolled ? "bg-white bg-opacity-20" : "bg-white bg-opacity-10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-between items-center py-4">
            <a
              href="#"
              className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300"
              aria-label="Home"
            >
              Auth System
            </a>

            <ul className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="relative font-medium hover:text-yellow-300 hover:transform hover:-translate-y-1 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/signup"
                  onClick={handleSignupClick}
                  className="bg-gradient-to-r from-red-400 to-pink-400 px-6 py-3 rounded-full font-semibold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 hover:from-red-500 hover:to-pink-500"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-20 h-20 bg-white bg-opacity-10 rounded-full top-20 left-10 animate-bounce"
            style={{
              animationDuration: "6s",
              animationDelay: "0s",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute w-32 h-32 bg-white bg-opacity-10 rounded-full top-60 right-10 animate-bounce"
            style={{
              animationDuration: "6s",
              animationDelay: "2s",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute w-16 h-16 bg-white bg-opacity-10 rounded-full bottom-20 left-20 animate-bounce"
            style={{
              animationDuration: "6s",
              animationDelay: "4s",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Background Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-900 from-opacity-30 via-transparent to-pink-900 to-opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent animate-pulse">
              Welcome to the Future
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-90 leading-relaxed">
              Experience innovation like never before. Join thousands of users
              who have already transformed their workflow with our cutting-edge
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/signup"
                onClick={handleSignupClick}
                className="bg-gradient-to-r from-red-400 to-pink-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 hover:from-red-500 hover:to-pink-500 w-full sm:w-auto text-center"
              >
                Get Started
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, "#about")}
                className="bg-white bg-opacity-10 backdrop-blur-sm text-red-400 px-8 py-4 rounded-full font-semibold text-lg border-2 border-white border-opacity-30 hover:bg-opacity-20 hover:border-opacity-50 hover:transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
