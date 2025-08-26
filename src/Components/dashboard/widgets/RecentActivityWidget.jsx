import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Globe, FileText, Users, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export default function RecentActivityWidget({ widget, projects, data }) {
  const recentActivities = [
    {
      type: "website_generated",
      title: "New website generated",
      description: "Elite Roofing Solutions website completed",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: Globe,
      color: "blue"
    },
    {
      type: "seo_improvement",
      title: "SEO score improved",
      description: "Johnson Plumbing moved from 72% to 85%",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      icon: TrendingUp,
      color: "emerald"
    },
    {
      type: "content_update",
      title: "Content updated",
      description: "Homepage content optimized for better engagement",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      icon: FileText,
      color: "purple"
    },
    {
      type: "user_engagement",
      title: "High user engagement",
      description: "Green Thumb Landscaping saw 34% increase in visitors",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      icon: Users,
      color: "pink"
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case "blue": return "text-blue-600 bg-blue-50";
      case "emerald": return "text-emerald-600 bg-emerald-50";
      case "purple": return "text-purple-600 bg-purple-50";
      case "pink": return "text-pink-600 bg-pink-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return format(timestamp, 'MMM dd, yyyy');
  };

  return (
    <Card className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(activity.color)}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-2">{getTimeAgo(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-lg font-bold text-blue-900">{projects.length}</div>
              <p className="text-xs text-blue-700">Total Projects</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
              <div className="text-lg font-bold text-emerald-900">{projects.filter(p => p.status === 'generated').length}</div>
              <p className="text-xs text-emerald-700">Active Sites</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}