import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Building, Target, Users } from "lucide-react";

const businessTypes = [
  { value: "roofing", label: "Roofing Services" },
  { value: "plumbing", label: "Plumbing Services" },
  { value: "electrical", label: "Electrical Services" },
  { value: "pest_control", label: "Pest Control" },
  { value: "water_damage", label: "Water Damage Restoration" },
  { value: "porta_potty", label: "Porta Potty Rental" },
  { value: "landscaping", label: "Landscaping" },
  { value: "hvac", label: "HVAC Services" },
  { value: "cleaning", label: "Cleaning Services" },
  { value: "auto_repair", label: "Auto Repair" },
  { value: "restaurant", label: "Restaurant & Food" },
  { value: "fitness", label: "Fitness & Gym" },
  { value: "consulting", label: "Consulting" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "real_estate", label: "Real Estate" },
  { value: "technology", label: "Technology" },
  { value: "other", label: "Other Service Business" }
];

const businessGoals = [
  { id: "generate_leads", label: "Generate more leads" },
  { id: "increase_sales", label: "Increase online sales" },
  { id: "build_brand", label: "Build brand awareness" },
  { id: "customer_service", label: "Improve customer service" },
  { id: "showcase_portfolio", label: "Showcase portfolio/work" },
  { id: "online_presence", label: "Establish online presence" }
];

export default function BusinessForm({ formData, setFormData, onNext }) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      business_goals: prev.business_goals.includes(goalId)
        ? prev.business_goals.filter(id => id !== goalId)
        : [...prev.business_goals, goalId]
    }));
  };

  const canProceed = formData.business_name && formData.business_type && formData.description;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Tell Us About Your Business
        </h2>
        <p className="text-gray-600 text-lg">
          The more details you provide, the better we can tailor your website to your needs.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="glass-effect shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business_name" className="text-sm font-semibold text-gray-700">
                    Business Name *
                  </Label>
                  <Input
                    id="business_name"
                    placeholder="Enter your business name"
                    value={formData.business_name}
                    onChange={(e) => handleInputChange('business_name', e.target.value)}
                    className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_type" className="text-sm font-semibold text-gray-700">
                    Business Type *
                  </Label>
                  <Select value={formData.business_type} onValueChange={(value) => handleInputChange('business_type', value)}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-indigo-500">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  Business Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your services, what makes you unique, your experience, target market, etc. Be as detailed as possible."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[120px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 resize-none"
                />
                <p className="text-xs text-gray-500">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                    Service Area
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, State or Region you serve"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target_audience" className="text-sm font-semibold text-gray-700">
                    Target Audience
                  </Label>
                  <Input
                    id="target_audience"
                    placeholder="Who are your ideal customers?"
                    value={formData.target_audience}
                    onChange={(e) => handleInputChange('target_audience', e.target.value)}
                    className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact_phone" className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="contact_phone"
                    placeholder="(555) 123-4567"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                    className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="contact_email"
                    type="email"
                    placeholder="contact@yourbusiness.com"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                    className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url" className="text-sm font-semibold text-gray-700">
                  Current Website (Optional)
                </Label>
                <Input
                  id="website_url"
                  placeholder="https://yourwebsite.com"
                  value={formData.website_url}
                  onChange={(e) => handleInputChange('website_url', e.target.value)}
                  className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="glass-effect shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Business Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                What do you want to achieve with your website?
              </p>
              <div className="space-y-3">
                {businessGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={goal.id}
                      checked={formData.business_goals.includes(goal.id)}
                      onCheckedChange={() => handleGoalToggle(goal.id)}
                    />
                    <Label htmlFor={goal.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                      {goal.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect shadow-xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
              <p className="text-sm text-gray-600">
                The more specific you are about your business and goals, the better your AI-generated website will be.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8"
        >
          Continue to Templates
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}