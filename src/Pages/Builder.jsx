import React, { useState, useEffect } from "react";
import { WebsiteProject } from "@/entities/WebsiteProject";
import { User } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Sparkles, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";

import BusinessForm from "../components/builder/BusinessForm";
import TemplateSelector from "../components/builder/TemplateSelector";

export default function Builder() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    business_name: "",
    business_type: "",
    description: "",
    location: "",
    contact_phone: "",
    contact_email: "",
    website_url: "",
    target_audience: "",
    business_goals: []
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState("modern-business");
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3.5-sonnet");
  const [templateCustomization, setTemplateCustomization] = useState({
    colors: { primary: "#3b82f6", secondary: "#8b5cf6" },
    fonts: { heading: "Inter", body: "Inter" },
    style: "modern"
  });

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      
      // Pre-fill some data if available from user profile
      if (currentUser.business_info) {
        setFormData(prev => ({
          ...prev,
          ...currentUser.business_info
        }));
      }
    } catch (error) {
      setIsAuthenticated(false);
      // Redirect to login
      try {
        await User.loginWithRedirect(createPageUrl("Builder"));
      } catch (loginError) {
        console.error("Login error:", loginError);
        navigate(createPageUrl("Home"));
      }
    }
    setLoading(false);
  };

  const steps = [
    { id: 1, title: "Business Info", description: "Tell us about your business" },
    { id: 2, title: "Choose Template", description: "Select your preferred design" },
    { id: 3, title: "Customize", description: "Personalize your website" },
    { id: 4, title: "Generate", description: "Create your website" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async () => {
    setIsGenerating(true);
    try {
      const projectData = {
        ...formData,
        template_type: selectedTemplate,
        ai_model: selectedModel,
        template_customization: templateCustomization,
        status: "draft",
        project_type: "multi_page"
      };

      // Save business info to user profile for future use
      await User.updateMyUserData({
        business_info: {
          business_name: formData.business_name,
          business_type: formData.business_type,
          location: formData.location,
          contact_phone: formData.contact_phone,
          contact_email: formData.contact_email
        }
      });

      const project = await WebsiteProject.create(projectData);
      navigate(createPageUrl("Editor") + `?project=${project.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
    }
    setIsGenerating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading builder...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8">
            <Button 
              onClick={() => navigate(createPageUrl("Home"))}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            {user && (
              <div className="flex items-center gap-2 text-white/80">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">Building for {user.full_name}</span>
              </div>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">
              Build Your Website with AI
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
              Follow our simple step-by-step process to create a professional website tailored to your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all ${
                    step.id <= currentStep
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id < currentStep ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-2 md:ml-4 hidden sm:block">
                    <h3 className={`font-semibold text-sm md:text-base ${
                      step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-all ${
                    step.id < currentStep ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <BusinessForm 
                formData={formData}
                setFormData={setFormData}
                onNext={handleNext}
              />
            )}
            
            {currentStep === 2 && (
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentStep === 3 && (
              <div className="space-y-8">
                <Card className="glass-effect shadow-xl border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize Your Website</h2>
                    <p className="text-gray-600 mb-6">Your website will be customized with your business colors and preferences.</p>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePrevious}>
                        Previous
                      </Button>
                      <Button onClick={handleNext}>
                        Continue to Generation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="text-center space-y-8">
                <Card className="glass-effect shadow-xl border-0 max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Ready to Generate Your Website
                    </h2>
                    
                    <p className="text-gray-600 mb-8">
                      We'll create a professional, multi-page website based on your business information and preferences. 
                      This process typically takes 1-2 minutes.
                    </p>
                    
                    <div className="space-y-4 text-left bg-gray-50 rounded-lg p-6 mb-8">
                      <h3 className="font-semibold text-gray-900">Your Website Will Include:</h3>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          Homepage with hero section
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          About Us page
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          Services/Products page
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          Contact page
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          Mobile responsive design
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          SEO optimization
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" onClick={handlePrevious} disabled={isGenerating}>
                        Go Back
                      </Button>
                      <Button 
                        onClick={handleFormSubmit}
                        disabled={isGenerating}
                        size="lg"
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating Website...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate My Website
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}