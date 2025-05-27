import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomePage from "./dashboard/_components/WelcomePage";

const DashboardProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
      {/* <SidebarTrigger /> */}
      <WelcomePage/>
      {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
