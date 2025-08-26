import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Smartphone, 
  Search, 
  Shield, 
  Palette, 
  Globe,
  Code,
  BarChart3,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description: "Advanced AI analyzes your business and creates custom content, layouts, and designs tailored specifically to your industry and goals.",
    color: "from-yellow-400 to-orange-500",
    badge: "Smart"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Every website is built with mobile responsiveness as the top priority, ensuring perfect performance on all devices and screen sizes.",
    color: "from-blue-400 to-indigo-600",
    badge: "Responsive"
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built-in SEO best practices including meta tags, structured data, fast loading speeds, and search engine friendly URLs.",
    color: "from-green-400 to-emerald-600",
    badge: "Optimized"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SSL certificates, secure hosting, automatic backups, and protection against common web vulnerabilities.",
    color: "from-red-400 to-pink-600",
    badge: "Secure"
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Full customization of colors, fonts, layouts, and imagery to match your brand identity and create a unique online presence.",
    color: "from-purple-400 to-indigo-600",
    badge: "Branded"
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast loading times worldwide with our global content delivery network, ensuring optimal performance everywhere.",
    color: "from-cyan-400 to-blue-600",
    badge: "Fast"
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Production-ready, semantic HTML5, optimized CSS, and efficient JavaScript that follows web standards and best practices.",
    color: "from-gray-400 to-slate-600",
    badge: "Quality"
  },
  {
    icon: BarChart3,
    title: "Analytics Ready",
    description: "Built-in integration with Google Analytics, tracking pixels, and conversion monitoring to measure your website's success.",
    color: "from-emerald-400 to-green-600",
    badge: "Insights"
  },
  {
    icon: Clock,
    title: "Quick Deployment",
    description: "From concept to live website in under 5 minutes. Export your files or deploy directly to your domain with one click.",
    color: "from-orange-400 to-red-600",
    badge: "Instant"
  }
];

export default function FeatureShowcase() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge className="bg-indigo-100 text-indigo-800 px-4 py-2 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Everything You Need for Success
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform includes all the features and tools you need to create, 
            customize, and manage a professional website that drives results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect shadow-lg border-0 hover:shadow-2xl transition-all duration-500 h-full group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience These Features?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses who have already transformed their online presence 
              with our AI-powered website builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                No coding required
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Free to get started
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Cancel anytime
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}