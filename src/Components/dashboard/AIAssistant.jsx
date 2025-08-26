import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/integrations/Core";
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  Zap, 
  TrendingUp, 
  BarChart3,
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAssistant({ isOpen, onClose, dashboardData, projects }) {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Hi! I'm your AI business assistant. I can help you analyze your dashboard data, suggest improvements, or answer questions about your websites. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    {
      icon: BarChart3,
      title: "Analyze Performance",
      prompt: "Analyze my website performance and give me insights on how to improve.",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "SEO Recommendations", 
      prompt: "What are the top 3 SEO improvements I should make to increase traffic?",
      color: "emerald"
    },
    {
      icon: Lightbulb,
      title: "Growth Ideas",
      prompt: "Suggest 5 creative ways to grow my business using my current websites.",
      color: "purple"
    },
    {
      icon: CheckCircle2,
      title: "Action Plan",
      prompt: "Create a 30-day action plan to improve my online presence and conversions.",
      color: "amber"
    }
  ];

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      type: "user",
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create context from dashboard data
      const context = `
        Dashboard Context:
        - Total Projects: ${dashboardData.totalProjects}
        - Active Projects: ${dashboardData.activeProjects}
        - Total Visits: ${dashboardData.totalVisits}
        - Conversion Rate: ${dashboardData.conversionRate}%
        - Recent Projects: ${projects.slice(0, 3).map(p => `${p.business_name} (${p.business_type})`).join(', ')}
        - Current Alerts: ${dashboardData.alerts.map(a => a.message).join(', ')}
      `;

      const prompt = `You are an AI business consultant helping a user optimize their websites and online presence. 

${context}

User Question: ${messageText}

Provide helpful, actionable advice based on the dashboard data. Be specific and practical. If you're suggesting improvements, explain the potential impact. Keep responses concise but valuable.`;

      const response = await InvokeLLM({
        prompt,
        add_context_from_internet: false
      });

      const aiMessage = {
        type: "ai",
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: "ai",
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleQuickAction = (prompt) => {
    handleSendMessage(prompt);
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "blue": return "from-blue-500 to-blue-600";
      case "emerald": return "from-emerald-500 to-emerald-600";
      case "purple": return "from-purple-500 to-purple-600";
      case "amber": return "from-amber-500 to-amber-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            AI Business Assistant
            <Badge className="bg-purple-100 text-purple-800">
              <Zap className="w-3 h-3 mr-1" />
              Powered by AI
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex gap-4 min-h-0">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <Card className={`max-w-[80%] ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0' 
                        : 'glass-effect border-0'
                    }`}>
                      <CardContent className="p-4">
                        {message.type === 'ai' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">AI Assistant</span>
                          </div>
                        )}
                        <div className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-700'}`}>
                          {message.content}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <Card className="glass-effect border-0">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="mt-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your business or websites..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 h-12 border-gray-200 focus:border-purple-500"
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="h-12 px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="w-80 space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Card 
                  key={index}
                  className="glass-effect border-0 cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${getColorClasses(action.color)} rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{action.prompt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-effect border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
                <p className="text-sm text-gray-600">
                  Ask specific questions about your data for better insights. I can analyze trends, suggest improvements, and create action plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}