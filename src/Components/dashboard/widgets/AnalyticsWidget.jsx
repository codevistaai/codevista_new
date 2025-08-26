import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Eye, Users, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockAnalyticsData = [
  { date: "Jan", visits: 1200, unique: 800, bounce: 45 },
  { date: "Feb", visits: 1800, unique: 1200, bounce: 42 },
  { date: "Mar", visits: 2400, unique: 1600, bounce: 38 },
  { date: "Apr", visits: 3200, unique: 2100, bounce: 35 },
  { date: "May", visits: 4100, unique: 2800, bounce: 32 },
  { date: "Jun", visits: 5200, unique: 3600, bounce: 28 }
];

export default function AnalyticsWidget({ widget, data, projects }) {
  const totalVisits = projects.reduce((sum, p) => sum + (p.analytics?.visits || Math.floor(Math.random() * 1000) + 500), 0);
  const uniqueVisitors = Math.floor(totalVisits * 0.68);
  const avgSessionTime = "3m 24s";
  const bounceRate = "32%";

  return (
    <Card className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            {widget.title}
          </div>
          <Badge className="bg-emerald-100 text-emerald-800">
            <TrendingUp className="w-3 h-3 mr-1" />
            +24%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 mb-1">
              <Eye className="w-5 h-5 text-blue-500" />
              {totalVisits.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Visits</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 mb-1">
              <Users className="w-5 h-5 text-purple-500" />
              {uniqueVisitors.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Unique Visitors</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 mb-1">
              <Clock className="w-5 h-5 text-emerald-500" />
              {avgSessionTime}
            </div>
            <p className="text-sm text-gray-600">Avg Session</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{bounceRate}</div>
            <p className="text-sm text-gray-600">Bounce Rate</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="unique" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}