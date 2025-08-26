import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Star, Users, Clock, Globe, Zap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import HeroSection from "../components/home/HeroSection";
import FeatureShowcase from "../components/home/FeatureShowcase";
import TestimonialsSection from "../components/home/TestimonialsSection";
import TemplateShowcase from "../components/home/TemplateShowcase";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      navigate(createPageUrl("Builder"));
    } else {
      try {
        await User.loginWithRedirect(createPageUrl("Builder"));
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <HeroSection 
        isAuthenticated={isAuthenticated} 
        onGetStarted={handleGetStarted}
        user={user}
      />

      {/* Stats Section */}
      <section className="py-12 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Websites Created", value: "10,000+", icon: Globe },
              { label: "Happy Customers", value: "2,500+", icon: Users },
              { label: "Avg. Build Time", value: "2 mins", icon: Clock },
              { label: "Success Rate", value: "99.9%", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <TemplateShowcase />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Ready to Build Your Dream Website?
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join thousands of businesses who trust our AI to create their professional online presence.
            </p>
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={handleGetStarted}
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {isAuthenticated ? 'Start Building Now' : 'Start Building - It\'s Free'}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}