import React, { useState, useEffect } from "react";
import { WebsiteProject } from "@/entities/WebsiteProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Download, 
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  Clock,
  MousePointer
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";

// Mock analytics data - in a real app this would come from your analytics service
const generateMockData = () => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), 'MMM dd'),
      visitors: Math.floor(Math.random() * 500) + 200,
      pageViews: Math.floor(Math.random() * 1000) + 500,
      bounceRate: Math.floor(Math.random() * 30) + 25,
      sessionDuration: Math.floor(Math.random() * 180) + 60
    });
  }
  return data;
};

const trafficSources = [
  { name: "Organic Search", value: 45, color: "#10b981" },
  { name: "Direct", value: 30, color: "#3b82f6" },
  { name: "Social Media", value: 15, color: "#8b5cf6" },
  { name: "Email", value: 10, color: "#f59e0b" }
];

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

export default function Analytics() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  const [analyticsData, setAnalyticsData] = useState(generateMockData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projectData = await WebsiteProject.list("-created_date");
      setProjects(projectData);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setLoading(false);
  };

  const totalVisitors = analyticsData.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageViews = analyticsData.reduce((sum, day) => sum + day.pageViews, 0);
  const avgBounceRate = Math.round(analyticsData.reduce((sum, day) => sum + day.bounceRate, 0) / analyticsData.length);
  const avgSessionDuration = Math.round(analyticsData.reduce((sum, day) => sum + day.sessionDuration, 0) / analyticsData.length);

  const exportReport = () => {
    console.log("Exporting analytics report...");
    // Implement export functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              Website Analytics
            </h1>
            <p className="text-gray-600">Comprehensive insights into your website performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select website" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Websites</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.business_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={exportReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: "Total Visitors",
              value: totalVisitors.toLocaleString(),
              change: "+12.5%",
              icon: Users,
              color: "from-blue-500 to-blue-600",
              trend: "up"
            },
            {
              title: "Page Views", 
              value: totalPageViews.toLocaleString(),
              change: "+8.2%",
              icon: Eye,
              color: "from-emerald-500 to-emerald-600",
              trend: "up"
            },
            {
              title: "Bounce Rate",
              value: `${avgBounceRate}%`,
              change: "-3.1%",
              icon: MousePointer,
              color: "from-amber-500 to-amber-600",
              trend: "down"
            },
            {
              title: "Avg Session",
              value: `${Math.floor(avgSessionDuration / 60)}m ${avgSessionDuration % 60}s`,
              change: "+15.7%", 
              icon: Clock,
              color: "from-purple-500 to-purple-600",
              trend: "up"
            }
          ].map((metric, index) => (
            <Card key={index} className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{metric.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${
                      metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? 
                        <ArrowUp className="w-4 h-4" /> : 
                        <ArrowDown className="w-4 h-4" />
                      }
                      {metric.change}
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Traffic Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect shadow-xl border-0 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Traffic Overview
                  <Badge className="bg-indigo-100 text-indigo-800">Last 30 Days</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
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
                        dataKey="visitors" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        name="Visitors"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pageViews" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                        name="Page Views"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect shadow-xl border-0 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: source.color }}
                        ></div>
                        <span className="text-gray-700">{source.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.slice(-14)}>
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
                    <Bar dataKey="bounceRate" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Bounce Rate %" />
                    <Bar dataKey="sessionDuration" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Session Duration (s)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}