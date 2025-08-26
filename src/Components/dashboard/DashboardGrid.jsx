import React from "react";
import DragDropGrid from "./DragDropGrid";

export default function DashboardGrid({ 
  widgets, 
  isEditMode, 
  dashboardData, 
  projects,
  onWidgetsChange 
}) {
  return (
    <DragDropGrid 
      widgets={widgets}
      isEditMode={isEditMode}
      dashboardData={dashboardData}
      projects={projects}
      onWidgetsChange={onWidgetsChange}
    />
  );
}