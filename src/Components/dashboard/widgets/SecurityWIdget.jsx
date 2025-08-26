import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, AlertTriangle, Lock, RefreshCw } from "lucide-react";

export default function SecurityWidget({ widget, projects }) {
  const securityScore = 94;
  const lastScan = "2 hours ago";
  
  const securityChecks = [
    { name: "SSL Certificate", status: "active", icon: Lock, color: "emerald" },
    { name: "Malware Scan", status: "clean", icon: Shield, color: "emerald" },
    { name: "Vulnerability Check", status: "passed", icon: CheckCircle2, color: "emerald" },
    { name: "Backup Status", status: "warning", icon: AlertTriangle, color: "yellow" }
  ];

  const getStatusColor = (status, color) => {
    switch (color) {
      case "emerald": return "text-emerald-600";
      case "yellow": return "text-yellow-600";
      case "red": return "text-red-600";
      default: return "text-gray-600";
    }
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
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            {widget.title}
          </div>
          <Badge className={getScoreBadge(securityScore)}>
            Score: {securityScore}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-900">Secure</span>
          </div>
          <p className="text-sm text-emerald-700">All security checks passed</p>
          <p className="text-xs text-emerald-600 mt-1">Last scan: {lastScan}</p>
        </div>

        <div className="space-y-3 mb-6">
          {securityChecks.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <check.icon className={`w-5 h-5 ${getStatusColor(check.status, check.color)}`} />
                <span className="text-sm font-medium text-gray-700">{check.name}</span>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs capitalize ${
                  check.color === 'emerald' ? 'border-emerald-200 text-emerald-700' :
                  check.color === 'yellow' ? 'border-yellow-200 text-yellow-700' :
                  'border-red-200 text-red-700'
                }`}
              >
                {check.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="text-xs">
            <RefreshCw className="w-3 h-3 mr-2" />
            Run Scan
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}