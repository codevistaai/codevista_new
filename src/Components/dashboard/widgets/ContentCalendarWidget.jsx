import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Clock, Plus } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

export default function ContentCalendarWidget({ widget, projects }) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  
  const contentSchedule = [
    { 
      date: format(today, 'MMM dd'), 
      title: "SEO Blog: Roofing Tips", 
      type: "Blog Post", 
      status: "Published",
      engagement: "High"
    },
    { 
      date: format(addDays(today, 1), 'MMM dd'), 
      title: "Social Media Campaign", 
      type: "Social", 
      status: "Scheduled",
      engagement: "Medium"
    },
    { 
      date: format(addDays(today, 3), 'MMM dd'), 
      title: "Email Newsletter", 
      type: "Email", 
      status: "Draft",
      engagement: "High"
    },
    { 
      date: format(addDays(today, 5), 'MMM dd'), 
      title: "Landing Page Update", 
      type: "Website", 
      status: "Planned",
      engagement: "Medium"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Published": return "bg-emerald-100 text-emerald-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Planned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Blog Post": return <FileText className="w-4 h-4" />;
      case "Email": return <Clock className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <Card className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            {widget.title}
          </div>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {contentSchedule.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">{item.date}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{item.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${item.engagement === 'High' ? 'border-emerald-200 text-emerald-700' : 'border-gray-200 text-gray-600'}`}>
                  {item.engagement}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
            <div className="text-lg font-bold text-emerald-900">12</div>
            <p className="text-xs text-emerald-700">Published</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-lg font-bold text-blue-900">5</div>
            <p className="text-xs text-blue-700">Scheduled</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
            <div className="text-lg font-bold text-yellow-900">3</div>
            <p className="text-xs text-yellow-700">Drafts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}