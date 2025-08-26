import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection({ isAuthenticated, onGetStarted, user }) {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Simplified background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Website Generation
            </Badge>
            
            {isAuthenticated && user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 md:mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span className="text-sm">Welcome back, {user.full_name?.split(' ')[0] || 'User'}!</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            Create Professional Websites
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              in Minutes, Not Months
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-indigo-100 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your business idea into a stunning, fully functional website using our AI-powered platform. 
            No coding required - just describe your business and watch the magic happen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-12"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-indigo-600 hover:bg-gray-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {isAuthenticated ? 'Continue Building' : 'Start Building - It\'s Free'}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl backdrop-blur-sm w-full sm:w-auto"
            >
              Watch Demo
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-indigo-100"
          >
            {[
              "✨ AI-Generated Content",
              "📱 Mobile Responsive", 
              "⚡ Lightning Fast",
              "🔒 SEO Optimized"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm md:text-base">
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}