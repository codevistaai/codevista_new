import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, AlertTriangle, XCircle, ExternalLink } from "lucide-react";

// Custom circular progress component
const CircularProgress = ({ value, size = 128, strokeWidth = 8, color = "#10b981" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
    </div>
  );
};

export default function SEOHealthWidget({ widget, projects }) {
  const seoScore = 78;
  const seoIssues = [
    { type: "error", title: "Missing meta descriptions", count: 3 },
    { type: "warning", title: "Slow loading images", count: 5 },
    { type: "success", title: "All title tags optimized", count: 0 }
  ];

  const getIssueIcon = (type) => {
    switch (type) {
      case "error": return <XCircle className="w-4 h-4 text-red-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "success": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default: return null;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <Card className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            {widget.title}
          </div>
          <Badge className={`${seoScore >= 80 ? 'bg-emerald-100 text-emerald-800' : seoScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            {seoScore >= 80 ? 'Excellent' : seoScore >= 60 ? 'Good' : 'Needs Work'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <CircularProgress
            value={seoScore}
            color={getScoreColor(seoScore)}
          />
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-900">SEO Health Check</h4>
          {seoIssues.map((issue, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getIssueIcon(issue.type)}
                <span className="text-sm font-medium text-gray-700">{issue.title}</span>
              </div>
              {issue.count > 0 && (
                <Badge variant="outline" className="text-xs">
                  {issue.count} issues
                </Badge>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="text-xs">
            <ExternalLink className="w-3 h-3 mr-2" />
            View Report
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
            Fix Issues
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}