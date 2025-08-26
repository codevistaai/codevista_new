import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, BarChart3, Settings, Download, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Website",
      description: "Generate a new AI-powered website",
      icon: Plus,
      color: "from-indigo-500 to-purple-600",
      onClick: () => navigate(createPageUrl("Builder"))
    },
    {
      title: "View Analytics", 
      description: "Deep dive into performance metrics",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-600",
      onClick: () => navigate(createPageUrl("Analytics"))
    },
    {
      title: "Manage Projects",
      description: "Edit and customize your websites", 
      icon: Globe,
      color: "from-blue-500 to-cyan-600",
      onClick: () => navigate(createPageUrl("Projects"))
    },
    {
      title: "Export Reports",
      description: "Download performance reports",
      icon: Download,
      color: "from-amber-500 to-orange-600",
      onClick: () => console.log("Export reports")
    },
    {
      title: "AI Optimization",
      description: "Let AI improve your websites",
      icon: Zap,
      color: "from-pink-500 to-rose-600", 
      onClick: () => console.log("AI optimization")
    },
    {
      title: "Settings",
      description: "Configure preferences and API keys",
      icon: Settings,
      color: "from-gray-500 to-slate-600",
      onClick: () => navigate(createPageUrl("Settings"))
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            <Card 
              className="glass-effect shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
              onClick={action.onClick}
            >
              <CardContent className="p-4 text-center h-full flex flex-col">
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{action.title}</h3>
                <p className="text-xs text-gray-600 flex-1">{action.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}