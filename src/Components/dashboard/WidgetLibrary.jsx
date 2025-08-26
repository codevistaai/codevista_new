import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Search, 
  Users, 
  Shield, 
  Calendar, 
  Zap, 
  BarChart3, 
  Activity,
  Plus,
  DollarSign,
  Mail,
  Globe,
  Heart,
  Camera,
  MessageCircle,
  FileText,
  Star,
  Target,
  Smartphone
} from "lucide-react";
import { DashboardWidget } from "@/entities/DashboardWidget";

const widgetCategories = {
  "Analytics": [
    {
      widget_type: "analytics_overview",
      title: "Website Analytics",
      description: "Track website traffic, visitors, and engagement metrics",
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
      w: 6, h: 4
    },
    {
      widget_type: "website_performance", 
      title: "Performance Monitor",
      description: "Monitor site speed, core web vitals, and performance scores",
      icon: Activity,
      color: "from-emerald-500 to-emerald-600",
      w: 6, h: 4
    },
    {
      widget_type: "traffic_sources",
      title: "Traffic Sources",
      description: "See where your visitors are coming from",
      icon: Globe,
      color: "from-cyan-500 to-cyan-600",
      w: 4, h: 3
    },
    {
      widget_type: "user_behavior",
      title: "User Behavior",
      description: "Analyze how users interact with your site",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      w: 4, h: 3
    }
  ],
  "SEO & Marketing": [
    {
      widget_type: "seo_health",
      title: "SEO Health Score",
      description: "Monitor your website's SEO performance and get recommendations",
      icon: Search,
      color: "from-purple-500 to-purple-600",
      w: 4, h: 4
    },
    {
      widget_type: "user_engagement",
      title: "User Engagement", 
      description: "Track user interactions, bounce rate, and session duration",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      w: 4, h: 3
    },
    {
      widget_type: "social_media",
      title: "Social Media Metrics",
      description: "Monitor social media engagement and follower growth",
      icon: MessageCircle,
      color: "from-orange-500 to-orange-600",
      w: 6, h: 3
    },
    {
      widget_type: "email_campaigns",
      title: "Email Marketing",
      description: "Track email open rates, clicks, and conversion metrics",
      icon: Mail,
      color: "from-teal-500 to-teal-600",
      w: 6, h: 3
    }
  ],
  "Business": [
    {
      widget_type: "revenue_tracking",
      title: "Revenue Tracker",
      description: "Monitor sales, revenue trends, and financial KPIs",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      w: 6, h: 4
    },
    {
      widget_type: "lead_generation",
      title: "Lead Generation",
      description: "Track leads, conversions, and sales funnel performance",
      icon: Target,
      color: "from-indigo-500 to-indigo-600",
      w: 4, h: 4
    },
    {
      widget_type: "conversion_funnel",
      title: "Conversion Funnel",
      description: "Visualize user journey from visit to conversion",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      w: 8, h: 4
    }
  ],
  "Content & Productivity": [
    {
      widget_type: "content_calendar",
      title: "Content Calendar",
      description: "Plan and schedule your content publishing",
      icon: Calendar,
      color: "from-teal-500 to-teal-600",
      w: 6, h: 4
    },
    {
      widget_type: "ai_recommendations",
      title: "AI Recommendations", 
      description: "Get AI-powered suggestions for website improvements",
      icon: Zap,
      color: "from-indigo-500 to-indigo-600",
      w: 6, h: 4
    },
    {
      widget_type: "recent_activity",
      title: "Recent Activity",
      description: "View latest website changes and user actions",
      icon: FileText,
      color: "from-gray-500 to-gray-600",
      w: 4, h: 3
    }
  ],
  "Security & Maintenance": [
    {
      widget_type: "security_status",
      title: "Security Monitor",
      description: "Track security scans, SSL status, and vulnerabilities",
      icon: Shield,
      color: "from-amber-500 to-amber-600",
      w: 4, h: 3
    },
    {
      widget_type: "backup_status",
      title: "Backup Status",
      description: "Monitor website backups and recovery points",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      w: 4, h: 3
    },
    {
      widget_type: "security_alerts",
      title: "Security Alerts",
      description: "Real-time security notifications and threat monitoring",
      icon: Shield,
      color: "from-red-500 to-red-600",
      w: 6, h: 3
    }
  ]
};

export default function WidgetLibrary({ isOpen, onClose, onAddWidget }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Analytics");

  const handleAddWidget = async (widgetConfig) => {
    try {
      const newWidget = await DashboardWidget.create({
        widget_type: widgetConfig.widget_type,
        title: widgetConfig.title,
        x: 0,
        y: 0,
        w: widgetConfig.w,
        h: widgetConfig.h,
        is_visible: true,
        is_resizable: true
      });
      
      onAddWidget(newWidget);
    } catch (error) {
      console.error("Error adding widget:", error);
    }
  };

  const filteredWidgets = Object.entries(widgetCategories).reduce((acc, [category, widgets]) => {
    const filtered = widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            Widget Library
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search widgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {Object.keys(widgetCategories).map(category => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {category.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              {Object.entries(filteredWidgets).map(([category, widgets]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {widgets.map(widget => (
                      <Card key={widget.widget_type} className="glass-effect border-0 hover:shadow-lg transition-all duration-300 group">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 bg-gradient-to-r ${widget.color} rounded-xl flex items-center justify-center`}>
                                <widget.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-base leading-5">{widget.title}</CardTitle>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {widget.w}×{widget.h}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{widget.description}</p>
                          <Button 
                            onClick={() => handleAddWidget(widget)}
                            size="sm" 
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white group-hover:shadow-md transition-all"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Widget
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}