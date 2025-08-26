import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Grip, 
  X, 
  Settings2, 
  Maximize2, 
  Minimize2,
  RotateCcw
} from "lucide-react";
import { DashboardWidget } from "@/entities/DashboardWidget";

import AnalyticsWidget from "./widgets/AnalyticsWidget";
import PerformanceWidget from "./widgets/PerformanceWidget";
import SEOHealthWidget from "./widgets/SEOHealthWidget";
import EngagementWidget from "./widgets/EngagementWidget";
import ContentCalendarWidget from "./widgets/ContentCalendarWidget";
import SecurityWidget from "./widgets/SecurityWidget";
import AIRecommendationsWidget from "./widgets/AIRecommendationsWidget";
import RecentActivityWidget from "./widgets/RecentActivityWidget";

export default function DragDropGrid({ 
  widgets = [], 
  isEditMode, 
  dashboardData, 
  projects,
  onWidgetsChange 
}) {
  const [widgetLayout, setWidgetLayout] = useState(widgets);
  const [selectedWidget, setSelectedWidget] = useState(null);

  useEffect(() => {
    setWidgetLayout(widgets);
  }, [widgets]);

  const handleDragEnd = async (result) => {
    if (!result.destination || !isEditMode) return;

    const items = Array.from(widgetLayout);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      y: Math.floor(index / 3) * 4, // Arrange in 3 columns
      x: (index % 3) * 4
    }));

    setWidgetLayout(updatedItems);
    
    // Save to database
    try {
      for (const widget of updatedItems) {
        if (widget.id) {
          await DashboardWidget.update(widget.id, {
            x: widget.x,
            y: widget.y,
            w: widget.w,
            h: widget.h
          });
        }
      }
      onWidgetsChange(updatedItems);
    } catch (error) {
      console.error("Error saving widget layout:", error);
    }
  };

  const handleWidgetResize = async (widgetId, newSize) => {
    const updatedWidgets = widgetLayout.map(widget => 
      widget.id === widgetId 
        ? { ...widget, ...newSize }
        : widget
    );
    
    setWidgetLayout(updatedWidgets);
    
    try {
      await DashboardWidget.update(widgetId, newSize);
      onWidgetsChange(updatedWidgets);
    } catch (error) {
      console.error("Error saving widget size:", error);
    }
  };

  const handleWidgetDelete = async (widgetId) => {
    const updatedWidgets = widgetLayout.filter(w => w.id !== widgetId);
    setWidgetLayout(updatedWidgets);
    
    try {
      await DashboardWidget.delete(widgetId);
      onWidgetsChange(updatedWidgets);
    } catch (error) {
      console.error("Error deleting widget:", error);
    }
  };

  const renderWidget = (widget) => {
    const commonProps = {
      widget,
      data: dashboardData,
      projects,
      isEditMode
    };

    switch (widget.widget_type) {
      case "analytics_overview":
        return <AnalyticsWidget {...commonProps} />;
      case "website_performance":  
        return <PerformanceWidget {...commonProps} />;
      case "seo_health":
        return <SEOHealthWidget {...commonProps} />;
      case "user_engagement":
        return <EngagementWidget {...commonProps} />;
      case "content_calendar":
        return <ContentCalendarWidget {...commonProps} />;
      case "security_status":
        return <SecurityWidget {...commonProps} />;
      case "ai_recommendations":
        return <AIRecommendationsWidget {...commonProps} />;
      default:
        return <RecentActivityWidget {...commonProps} />;
    }
  };

  const getGridStyle = (widget, isDragging) => {
    const cols = 12;
    const width = `${(widget.w / cols) * 100}%`;
    const minHeight = `${widget.h * 80}px`;

    return {
      width,
      minHeight,
      opacity: isDragging ? 0.8 : 1,
      transform: isDragging ? 'rotate(2deg)' : 'none',
      transition: isDragging ? 'none' : 'all 0.3s ease'
    };
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard-grid">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px] transition-all duration-300 ${
                snapshot.isDraggingOver && isEditMode ? 'bg-blue-50/50 rounded-lg p-4' : ''
              }`}
            >
              <AnimatePresence>
                {widgetLayout.map((widget, index) => (
                  <Draggable
                    key={widget.id || widget.widget_type}
                    draggableId={widget.id || widget.widget_type}
                    index={index}
                    isDragDisabled={!isEditMode}
                  >
                    {(provided, snapshot) => {
                      const isDragging = snapshot.isDragging;
                      
                      return (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          style={{
                            ...provided.draggableProps.style,
                            ...getGridStyle(widget, isDragging)
                          }}
                          className={`relative group ${
                            isDragging ? 'z-50 shadow-2xl' : ''
                          }`}
                        >
                          {/* Edit Mode Controls */}
                          {isEditMode && (
                            <div className="absolute -top-2 -right-2 z-10 flex gap-1">
                              <div className="flex bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                <div
                                  {...provided.dragHandleProps}
                                  className="p-2 hover:bg-gray-50 cursor-grab active:cursor-grabbing border-r border-gray-200"
                                >
                                  <Grip className="w-4 h-4 text-gray-500" />
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-2 h-auto border-r border-gray-200 hover:bg-gray-50"
                                  onClick={() => setSelectedWidget(widget)}
                                >
                                  <Settings2 className="w-4 h-4 text-gray-500" />
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-2 h-auto hover:bg-red-50"
                                  onClick={() => handleWidgetDelete(widget.id)}
                                >
                                  <X className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Resize Handles (Edit Mode Only) */}
                          {isEditMode && (
                            <>
                              <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="w-3 h-3 text-white m-0.5" />
                              </div>
                              
                              {widget.w > (widget.min_w || 3) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute bottom-2 right-8 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                                  onClick={() => handleWidgetResize(widget.id, { 
                                    w: Math.max(widget.w - 1, widget.min_w || 3) 
                                  })}
                                >
                                  <Minimize2 className="w-3 h-3" />
                                </Button>
                              )}
                            </>
                          )}

                          {/* Widget Content */}
                          <div className={`h-full ${isEditMode ? 'pointer-events-none' : ''}`}>
                            {renderWidget(widget)}
                          </div>
                        </motion.div>
                      );
                    }}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
              
              {/* Drop Zone Indicator */}
              {isEditMode && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-h-[200px] border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center text-blue-500 bg-blue-50/30"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      <Grip className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium">Drop widgets here</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}