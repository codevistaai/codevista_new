import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MousePointer, Clock, Heart } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const engagementData = [
  { name: "Direct", value: 35, color: "#3b82f6" },
  { name: "Organic Search", value: 45, color: "#10b981" },
  { name: "Social Media", value: 12, color: "#8b5cf6" },
  { name: "Email", value: 8, color: "#f59e0b" }
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export default function EngagementWidget({ widget, projects }) {
  const engagementRate = 67;
  const avgTimeOnPage = "4m 12s";
  const pageViews = 2847;
  const interactions = 1023;

  return (
    <Card className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            {widget.title}
          </div>
          <Badge className="bg-pink-100 text-pink-800">
            {engagementRate}% Rate
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-900 mb-1">
              <MousePointer className="w-4 h-4" />
              {pageViews.toLocaleString()}
            </div>
            <p className="text-xs text-blue-700">Page Views</p>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-emerald-900 mb-1">
              <Heart className="w-4 h-4" />
              {interactions.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-700">Interactions</p>
          </div>
        </div>

        <div className="h-48 mb-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Traffic Sources</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between text-center">
          <div>
            <div className="flex items-center justify-center gap-1 font-bold text-gray-900">
              <Clock className="w-4 h-4 text-gray-500" />
              {avgTimeOnPage}
            </div>
            <p className="text-xs text-gray-600">Avg Time</p>
          </div>
          <div>
            <div className="font-bold text-gray-900">{engagementRate}%</div>
            <p className="text-xs text-gray-600">Engagement</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}