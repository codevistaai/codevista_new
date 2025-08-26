import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, TrendingUp, Search, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AIRecommendationsWidget({ widget, projects }) {
  const aiRecommendations = [
    {
      id: 1,
      type: "seo",
      priority: "high",
      title: "Optimize images for better Core Web Vitals",
      description: "5 images are slowing down your site. Compress them to improve loading speed by 23%.",
      impact: "+23% faster loading",
      effort: "5 minutes",
      icon: TrendingUp,
      color: "emerald"
    },
    {
      id: 2,
      type: "content",
      priority: "medium", 
      title: "Add FAQ section to services page",
      description: "Users are searching for specific questions about your services. Adding FAQs can increase engagement.",
      impact: "+15% engagement",
      effort: "10 minutes",
      icon: Users,
      color: "blue"
    },
    {
      id: 3,
      type: "seo",
      priority: "medium",
      title: "Update meta descriptions",
      description: "3 pages have missing meta descriptions. This affects click-through rates from search results.",
      impact: "+8% CTR",
      effort: "3 minutes",
      icon: Search,
      color: "purple"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800"; 
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "emerald": return "text-emerald-600 bg-emerald-50";
      case "blue": return "text-blue-600 bg-blue-50";
      case "purple": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            {widget.title}
          </div>
          <Badge className="bg-indigo-100 text-indigo-800">
            {aiRecommendations.length} suggestions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(rec.color)}`}>
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{rec.title}</h4>
                    <Badge className={`text-xs mt-1 ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 ml-13">{rec.description}</p>
              
              <div className="flex items-center justify-between ml-13">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {rec.impact}
                  </span>
                  <span>⏱ {rec.effort}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-xs h-8 px-3">
                    Dismiss
                  </Button>
                  <Button size="sm" className={`text-xs h-8 px-3 ${
                    rec.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                    rec.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    'bg-purple-600 hover:bg-purple-700'
                  } text-white`}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full text-sm">
            View All Recommendations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}