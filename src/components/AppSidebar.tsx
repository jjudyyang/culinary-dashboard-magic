
import { Plus, BookOpen, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarItems = [
  {
    title: "Create Recipe",
    icon: Plus,
    action: "create-recipe",
  },
  {
    title: "Create Cooklist",
    icon: BookOpen,
    action: "create-cooklist",
  },
  {
    title: "My Profile",
    icon: User,
    action: "my-profile",
  },
];

export function AppSidebar() {
  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    // Here you would implement the actual functionality for each action
  };

  return (
    <Sidebar side="right" className="border-l border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.action}>
                  <SidebarMenuButton 
                    onClick={() => handleAction(item.action)}
                    className="w-full h-16 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 justify-start"
                  >
                    <div className="flex items-center gap-3 w-full p-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
