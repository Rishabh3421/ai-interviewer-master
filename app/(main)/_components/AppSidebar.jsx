"use client"
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarNavigations } from "@/services/constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  console.log(path)
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center">
        <Image
          src={"/ChatGPT.png"}
          alt="logo"
          height={100}
          width={200}
          className="h-[100px] object-cover"
        />
        <Button className="-mt-3 hover:bg-purple-400 cursor-pointer hover:scale-105 w-[90%]">
          <Plus className="mr-2" />
          Create An Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className={"p-1"}>
            {SidebarNavigations.map((option, idx) => (
              <SidebarMenuItem key={idx} className={`p-2 rounded-md ${path ==option.path && 'bg-primary' }`}>
                <SidebarMenuButton asChild>
                  <Link href={option.path} className="flex items-center">
                    <option.icon className={`mr-2 ${path ==option.path && 'text-white'}`} />
                    <span className={`text-[16px] ${path ==option.path && 'text-white'}`}>{option.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
