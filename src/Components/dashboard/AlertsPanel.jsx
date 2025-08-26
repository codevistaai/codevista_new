import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AlertsPanel({ alerts = [] }) {
  const [dismissedAlerts, setDismissedAlerts] = React.useState([]);

  const visibleAlerts = alerts.filter((_, index) => !dismissedAlerts.includes(index));

  const handleDismiss = (index) => {
    setDismissedAlerts([...dismissedAlerts, index]);
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "success": return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "info": return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "warning": return "bg-yellow-50 border-yellow-200";
      case "success": return "bg-emerald-50 border-emerald-200";
      case "info": return "bg-blue-50 border-blue-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  const getAlertBadge = (type) => {
    switch (type) {
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "success": return "bg-emerald-100 text-emerald-800";
      case "info": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <Card className="glass-effect shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            System Alerts
            <Badge className="bg-amber-100 text-amber-800">
              {visibleAlerts.length} active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AnimatePresence>
              {visibleAlerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      {alert.action && (
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs text-indigo-600 mt-1">
                          {alert.action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getAlertBadge(alert.type)}`}>
                      {alert.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismiss(index)}
                      className="text-gray-500 hover:text-gray-700 w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}