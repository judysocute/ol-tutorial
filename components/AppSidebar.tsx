import {
  ScanEye,
  Fullscreen,
  RulerDimensionLine,
  Locate,
  MapPlus,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    id: "zoomSlider",
    title: "Zoom Slider",
    turnOn: false,
    icon: ScanEye,
  },
  {
    id: "scaleLine",
    title: "Scale Line",
    turnOn: false,
    icon: RulerDimensionLine,
  },
  {
    id: "fullScreen",
    title: "Full Screen Button",
    turnOn: false,
    icon: Fullscreen,
  },
  {
    id: "mousePosition",
    title: "Mouse Position",
    turnOn: false,
    icon: Locate,
  },
  {
    id: "overviewMap",
    title: "Map Overview",
    turnOn: false,
    icon: MapPlus,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Map</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Function Display</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  className="flex items-center space-x-2"
                >
                  <Switch id={item.id}></Switch>
                  <Label htmlFor={item.id}>{item.title}</Label>
                  {/* <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton> */}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
