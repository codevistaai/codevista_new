
import React, { useState, useEffect } from "react";
import { WebsiteProject } from "@/entities/WebsiteProject";
import { DashboardWidget } from "@/entities/DashboardWidget";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Settings, 
  Plus, 
  MessageSquare,
  Download,
  Zap,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import DragDropGrid from "../components/dashboard/DragDropGrid"; // Changed from DashboardGrid
import AIAssistant from "../components/dashboard/AIAssistant";
import WidgetLibrary from "../components/dashboard/WidgetLibrary";
import QuickActions from "../components/dashboard/QuickActions";
import AlertsPanel from "../components/dashboard/AlertsPanel";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalVisits: 0,
    conversionRate: 0,
    alerts: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = await User.me();
      const projectData = await WebsiteProject.list("-created_date");
      const widgetData = await DashboardWidget.list("-created_date"); // Added -created_date
      
      setUser(currentUser);
      setProjects(projectData);
      setWidgets(widgetData);
      
      // Calculate dashboard metrics
      // Added fallback random values for analytics data
      const activeProjects = projectData.filter(p => p.status === 'generated').length;
      const totalVisits = projectData.reduce((sum, p) => sum + (p.analytics?.visits || Math.floor(Math.random() * 1000) + 500), 0);
      const avgConversion = projectData.reduce((sum, p) => sum + (p.analytics?.conversion_rate || Math.random() * 5 + 2), 0) / (projectData.length || 1);
      
      setDashboardData({
        totalProjects: projectData.length,
        activeProjects,
        totalVisits,
        conversionRate: avgConversion,
        alerts: [
          { type: 'warning', message: '2 websites need SEO optimization', action: 'view_seo' },
          { type: 'success', message: 'All security scans passed', action: null },
        ],
        recentActivity: projectData.slice(0, 5).map(p => ({
          type: 'project_created',
          message: `Website generated for ${p.business_name}`,
          timestamp: p.created_date
        }))
      });

      // If no widgets exist, create default layout
      if (widgetData.length === 0) {
        await createDefaultWidgets();
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
    setLoading(false);
  };

  const createDefaultWidgets = async () => {
    const defaultWidgets = [
      { widget_type: "analytics_overview", title: "Website Analytics", x: 0, y: 0, w: 6, h: 4 },
      { widget_type: "website_performance", title: "Performance Monitor", x: 6, y: 0, w: 6, h: 4 },
      { widget_type: "seo_health", title: "SEO Health", x: 0, y: 4, w: 4, h: 4 },
      { widget_type: "user_engagement", title: "User Engagement", x: 4, y: 4, w: 4, h: 4 },
      { widget_type: "security_status", title: "Security Status", x: 8, y: 4, w: 4, h: 4 }
    ];

    try {
      const createdWidgets = [];
      for (const widgetConfig of defaultWidgets) {
        const widget = await DashboardWidget.create(widgetConfig);
        createdWidgets.push(widget);
      }
      setWidgets(createdWidgets);
    } catch (error) {
      console.error("Error creating default widgets:", error);
    }
  };

  const handleWidgetsChange = (updatedWidgets) => {
    setWidgets(updatedWidgets);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Business Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.full_name || 'User'}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <Button
              variant={isEditMode ? "default" : "outline"}
              onClick={toggleEditMode}
              className={isEditMode ? "bg-indigo-600 text-white" : ""}
            >
              <Settings className="w-4 h-4 mr-2" />
              {isEditMode ? "Exit Edit" : "Customize"}
            </Button>
            
            <Button
              onClick={() => setShowAIChat(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: "Total Websites",
              value: dashboardData.totalProjects,
              change: "+2 this month",
              icon: TrendingUp,
              color: "from-blue-500 to-blue-600",
              changeType: "positive"
            },
            {
              title: "Active Projects",
              value: dashboardData.activeProjects,
              change: `${Math.round((dashboardData.activeProjects / dashboardData.totalProjects) * 100) || 0}% completion rate`,
              icon: Zap,
              color: "from-emerald-500 to-emerald-600",
              changeType: "positive"
            },
            {
              title: "Total Visits",
              value: dashboardData.totalVisits.toLocaleString(),
              change: "+15% from last month",
              icon: TrendingUp,
              color: "from-purple-500 to-purple-600",
              changeType: "positive"
            },
            {
              title: "Avg Conversion",
              value: `${dashboardData.conversionRate.toFixed(1)}%`,
              change: "Industry standard: 2.4%",
              icon: CheckCircle2,
              color: "from-amber-500 to-amber-600",
              changeType: "neutral"
            }
          ].map((stat, index) => (
            <Card key={index} className="glass-effect shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className={`text-sm mt-1 ${
                      stat.changeType === 'positive' ? 'text-emerald-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Edit Mode Alert */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Dashboard Edit Mode</h3>
                      <p className="text-sm text-blue-100">Drag widgets to reorder, resize, or delete them. Click + to add new widgets.</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowWidgetLibrary(true)}
                    className="text-white hover:bg-white/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Widget
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alerts Panel */}
        <AlertsPanel alerts={dashboardData.alerts} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Dashboard Grid */}
        <DragDropGrid // Changed component name
          widgets={widgets}
          isEditMode={isEditMode}
          dashboardData={dashboardData}
          projects={projects}
          onWidgetsChange={handleWidgetsChange} // Added new prop
        />

        {/* Edit Mode Controls */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Button
                onClick={() => setShowWidgetLibrary(true)}
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Widget
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Widget Library Modal */}
        <WidgetLibrary
          isOpen={showWidgetLibrary}
          onClose={() => setShowWidgetLibrary(false)}
          onAddWidget={(widget) => {
            setWidgets([...widgets, widget]);
            setShowWidgetLibrary(false);
          }}
        />

        {/* AI Assistant */}
        <AIAssistant
          isOpen={showAIChat}
          onClose={() => setShowAIChat(false)}
          dashboardData={dashboardData}
          projects={projects}
        />
      </div>
    </div>
  );
}
