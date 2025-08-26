import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";

const templates = [
  {
    id: "modern-business",
    name: "Modern Business",
    description: "Perfect for service businesses and consultants",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    category: "Business",
    color: "from-blue-500 to-cyan-500",
    features: ["Hero Section", "Services", "Testimonials", "Contact"]
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio", 
    description: "Showcase your creative work beautifully",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    category: "Portfolio",
    color: "from-purple-500 to-pink-500",
    features: ["Gallery", "About", "Projects", "Blog"]
  },
  {
    id: "restaurant-cafe",
    name: "Restaurant & Cafe",
    description: "Appetizing designs for food businesses",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    category: "Food & Drink", 
    color: "from-orange-500 to-red-500",
    features: ["Menu", "Reservations", "Gallery", "Location"]
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    description: "Innovative designs for technology companies",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    category: "Technology",
    color: "from-emerald-500 to-teal-500",
    features: ["Product Demo", "Features", "Pricing", "Team"]
  }
];

export default function TemplateShowcase() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium mb-4">
            <Palette className="w-4 h-4 mr-2" />
            Professional Templates
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Choose from Stunning Templates
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI adapts these professionally designed templates to match your business perfectly. 
            Every template is mobile-responsive and optimized for conversions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect shadow-lg border-0 hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                <div className="relative">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button size="sm" variant="secondary" className="w-full backdrop-blur-sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Template
                      </Button>
                    </div>
                  </div>
                  <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${template.color} text-white border-0`}>
                    {template.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              See Your Template Come to Life
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our AI doesn't just use templates - it transforms them with your content, 
              colors, and branding to create something uniquely yours.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Choose Template</h4>
                <p className="text-sm text-gray-600">Select the template that best fits your business style</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Customization</h4>
                <p className="text-sm text-gray-600">Our AI adapts colors, content, and layout to your needs</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Launch Website</h4>
                <p className="text-sm text-gray-600">Export or deploy your professional website instantly</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}