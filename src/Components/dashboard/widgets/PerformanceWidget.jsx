import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, Globe, Smartphone } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { name: "Homepage", desktop: 85, mobile: 72, score: "Good" },
  { name: "Services", desktop: 92, mobile: 78, score: "Excellent" },
  { name: "About", desktop: 88, mobile: 75, score: "Good" },
  { name: "Contact", desktop: 95, mobile: 82, score: "Excellent" }
];

export default function PerformanceWidget({ widget, projects }) {
  const avgLoadTime = "2.1s";
  const performanceScore = 87;
  const coreWebVitals = "Passed";

  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return "bg-emerald-100 text-emerald-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            {widget.title}
          </div>
          <Badge className={getScoreBadge(performanceScore)}>
            Score: {performanceScore}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">{avgLoadTime}</span>
            </div>
            <p className="text-sm text-blue-700">Avg Load Time</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span className={`text-2xl font-bold ${getScoreColor(performanceScore)}`}>
                {performanceScore}
              </span>
            </div>
            <p className="text-sm text-emerald-700">Performance</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-purple-600" />
              <span className="text-xl font-bold text-purple-900">{coreWebVitals}</span>
            </div>
            <p className="text-sm text-purple-700">Core Web Vitals</p>
          </div>
        </div>

        <div className="h-64">
          <h4 className="font-semibold text-gray-900 mb-4">Page Performance Scores</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="desktop" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mobile" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}