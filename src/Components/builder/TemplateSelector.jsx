import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Eye, Palette, CheckCircle2 } from "lucide-react";

const templates = [
  {
    id: "modern-business",
    name: "Modern Business",
    description: "Clean, professional design perfect for service businesses",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    features: ["Hero Section", "Services Grid", "Team Showcase", "Contact Form", "Testimonials"],
    category: "Business",
    color: "from-blue-500 to-cyan-500",
    recommended: true
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Showcase your work with stunning visual layouts",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
    features: ["Project Gallery", "About Story", "Skills Display", "Blog Section", "Contact"],
    category: "Portfolio",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "restaurant-cafe",
    name: "Restaurant & Cafe",
    description: "Appetizing design for food and beverage businesses",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&crop=center",
    features: ["Menu Display", "Online Reservations", "Photo Gallery", "Reviews", "Location"],
    category: "Food & Drink",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    description: "Modern, innovative design for technology companies",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
    features: ["Product Demo", "Feature Highlights", "Pricing Plans", "Team Page", "Blog"],
    category: "Technology",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "fitness-wellness",
    name: "Fitness & Wellness",
    description: "Energetic design for health and fitness businesses",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&crop=center",
    features: ["Class Schedule", "Trainer Profiles", "Membership Plans", "Success Stories", "Contact"],
    category: "Health & Fitness",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Trustworthy design for consulting and professional firms",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center",
    features: ["Service Pages", "Case Studies", "Team Bios", "Client Testimonials", "Resources"],
    category: "Professional",
    color: "from-slate-500 to-gray-600"
  }
];

export default function TemplateSelector({ selectedTemplate, setSelectedTemplate, onNext, onPrevious }) {
  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Choose Your Template
        </h2>
        <p className="text-gray-600 text-lg">
          Select a professionally designed template that fits your business style. 
          You can customize colors, fonts, and content later.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`group cursor-pointer transition-all duration-300 border-2 ${
              selectedTemplate === template.id
                ? 'border-indigo-500 bg-indigo-50 shadow-xl scale-105'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg glass-effect'
            } overflow-hidden`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="relative">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <Button size="sm" variant="secondary" className="w-full backdrop-blur-sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Template
                  </Button>
                </div>
              </div>

              {/* Selected indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Category badge */}
              <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${template.color} text-white border-0`}>
                {template.category}
              </Badge>

              {/* Recommended badge */}
              {template.recommended && (
                <Badge className="absolute top-10 left-3 bg-emerald-500 text-white border-0">
                  Recommended
                </Badge>
              )}
            </div>

            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{template.description}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Includes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected template preview */}
      {selectedTemplateData && (
        <Card className="glass-effect shadow-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${selectedTemplateData.color} rounded-xl flex items-center justify-center`}>
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Selected: {selectedTemplateData.name}
                </h3>
                <p className="text-gray-600 mb-4">{selectedTemplateData.description}</p>
                <p className="text-sm text-gray-500">
                  This template will be customized with your business information, colors, and content. 
                  You can further customize it in the next step.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Business Info
        </Button>
        <Button 
          onClick={onNext}
          disabled={!selectedTemplate}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
        >
          Continue to Customization
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}   