import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    business: "Elite Cleaning Services",
    role: "Business Owner",
    content: "I couldn't believe how quickly I had a professional website up and running. The AI understood exactly what my cleaning business needed and created something better than I imagined.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b3?w=150&h=150&fit=crop&crop=face",
    results: "300% increase in online bookings"
  },
  {
    name: "Mike Rodriguez",
    business: "Phoenix Roofing Pro",
    role: "Founder",
    content: "As a roofer, I know nothing about websites. This platform made it so easy - I just described my business and got a website that actually brings in leads. Worth every penny!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    results: "5x more qualified leads"
  },
  {
    name: "Emily Chen",
    business: "Zen Yoga Studio",
    role: "Studio Owner",
    content: "The website perfectly captured the peaceful, welcoming vibe of my yoga studio. My students love booking classes online, and I've seen a huge boost in new member sign-ups.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    results: "200% growth in memberships"
  },
  {
    name: "David Thompson",
    business: "Thompson Law Firm",
    role: "Attorney",
    content: "Professional, trustworthy, and exactly what a law firm needs. The AI created content that speaks to potential clients while maintaining the professional tone we require.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    results: "150% more consultations"
  },
  {
    name: "Lisa Martinez",
    business: "Gourmet Delights Catering",
    role: "Chef & Owner",
    content: "The website showcases our food beautifully and makes it easy for clients to book catering services. I've been booked solid ever since launching!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    results: "400% increase in bookings"
  },
  {
    name: "Robert Kim",
    business: "Kim's Auto Repair",
    role: "Shop Owner",
    content: "Simple, straightforward, and gets customers in the door. The website explains our services clearly and makes scheduling appointments a breeze. Exactly what we needed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
    results: "250% more appointments"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge className="bg-amber-100 text-amber-800 px-4 py-2 text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Customer Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Trusted by Business Owners Everywhere
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI-powered platform has helped thousands of businesses 
            create stunning websites and grow their online presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect shadow-lg border-0 hover:shadow-2xl transition-all duration-500 h-full">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                    <Quote className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed italic text-sm md:text-base">
                    "{testimonial.content}"
                  </p>

                  <div className="mb-6">
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      {testimonial.results}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {testimonial.role}
                      </p>
                      <p className="text-indigo-600 text-xs md:text-sm font-medium">
                        {testimonial.business}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 md:mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">98%</div>
                <p className="text-gray-600 text-sm md:text-base">Customer Satisfaction</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">10,000+</div>
                <p className="text-gray-600 text-sm md:text-base">Websites Created</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">2.5x</div>
                <p className="text-gray-600 text-sm md:text-base">Avg. Lead Increase</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-2">24/7</div>
                <p className="text-gray-600 text-sm md:text-base">Customer Support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}