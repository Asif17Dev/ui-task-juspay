import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  ShoppingCart,
  Briefcase,
  BookOpen,
  User,
  Settings,
  Building2,
  FileText,
  Share2,
  Home,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import {
  IconChevronDown,
  IconChevronRight,
  IconCircleFilled,
} from "@tabler/icons-react";

interface LeftSidebarProps {
  collapsed: boolean;
}

const navigationSections = [
  {
    title: "Favorites",
    items: [
      { name: "Overview", icon: Home, href: "/" },
      { name: "Projects", icon: Briefcase, href: "/projects" },
    ],
  },
  {
    title: "Recently",
  },
  {
    title: "Dashboards",
    items: [
      {
        name: "Default",
        icon: BarChart3,
        href: "/",
        active: true,
      },
      {
        name: "eCommerce",
        icon: ShoppingCart,
        href: "/ecommerce",
        subPages: ["Overview", "Orders", "Products", "Customers", "Discounts"],
      },
      {
        name: "Projects",
        icon: Briefcase,
        href: "/projects",
        subPages: ["All Projects", "New Project", "Templates", "Archived"],
      },
      {
        name: "Online Courses",
        icon: BookOpen,
        href: "/courses",
        subPages: ["Catalog", "My Courses", "Create Course", "Categories"],
      },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        name: "User Profile",
        icon: User,
        href: "/profile",
        subPages: [
          "Overview",
          "Projects",
          "Campaigns",
          "Documents",
          "Followers",
        ],
      },
      {
        name: "Account",
        icon: Settings,
        href: "/account",
        subPages: [
          "Profile Settings",
          "Billing & Plans",
          "Security",
          "API Keys",
          "Integrations",
        ],
      },
      {
        name: "Corporate",
        icon: Building2,
        href: "/corporate",
        subPages: ["Teams", "Departments", "Locations", "Policies", "Reports"],
      },
      {
        name: "Blog",
        icon: FileText,
        href: "/blog",
        subPages: ["All Posts", "New Post", "Categories", "Tags", "Authors"],
      },
      {
        name: "Social",
        icon: Share2,
        href: "/social",
        subPages: ["Feed", "Mentions", "Messages", "Pages", "Analytics"],
      },
    ],
  },
];

export function LeftSidebar({ collapsed }: LeftSidebarProps) {
  const [itemExpanded, setItemExpanded] = useState<Record<string, boolean>>({
    "User Profile": true,
  });
  const navigate = useNavigate();

  const toggleItem = (itemName: string) => {
    setItemExpanded((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  return (
    <aside
      className={cn(
        "border-r bg-sidebar-left transition-all duration-300 h-screen overflow-y-auto sticky top-0",
        collapsed ? "w-0 overflow-hidden" : "w-64"
      )}
    >
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 ring-2 ring-background">
            <AvatarImage src={"/avatar.png"} />
            <AvatarFallback className="text-xs">B</AvatarFallback>
          </Avatar>
          <span className="font-semibold">ByeWind</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          {navigationSections.slice(0, 2).map((section) => (
            <div key={section.title} className="cursor-pointer">
              <div className="w-full justify-between p-2 h-7 text-xs font-medium text-muted-foreground">
                <span className="tracking-wider">{section.title}</span>
              </div>

              {section.items && (
                <div className="space-y-0.5">
                  {section.items.map((page) => (
                    <div
                      key={page.name}
                      className="flex items-center gap-2 rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent/30 cursor-pointer"
                    >
                      <IconCircleFilled className="w-2" />
                      <span className="text-foreground">{page?.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="w-full justify-between p-2 h-7 text-xs font-medium text-muted-foreground">
            <span className="tracking-wider">Dashboards</span>
          </div>

          <div className="space-y-0.5 pl-2 mt-2">
            {navigationSections[2].items.map((item) => (
              <div key={item.name}>
                {item.subPages ? (
                  <button
                    type="button"
                    onClick={() => toggleItem(item.name)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors relative",
                      "hover:bg-accent hover:text-accent-foreground",
                      item.active &&
                        "bg-accent text-accent-foreground font-medium"
                    )}
                    aria-expanded={!!itemExpanded[item.name]}
                    aria-controls={`${item.name}-subs`}
                  >
                    {/* chevron */}
                    {itemExpanded[item.name] ? (
                      <IconChevronDown className="w-4 text-accent-foreground" />
                    ) : (
                      <IconChevronRight className="w-4 text-muted-foreground" />
                    )}

                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.name}</span>
                  </button>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.href ?? "#"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors relative",
                        "hover:bg-accent hover:text-accent-foreground",
                        (isActive || item.active) &&
                          "bg-accent text-accent-foreground font-medium",
                        item.name === "Default" && "pl-9"
                      )
                    }
                  >
                    {item.name === "Default" ? (
                      <div className="bg-[#1C1C1C] dark:bg-[#C6C7F8] absolute top-[20%] h-[60%] w-1 rounded left-0"></div>
                    ) : (
                      <IconChevronRight className="w-4 text-muted-foreground" />
                    )}
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                )}

                {item.subPages && itemExpanded[item.name] && (
                  <div
                    id={`${item.name}-subs`}
                    className="ml-7 space-y-0.5 mt-1"
                  >
                    {item.subPages.map((page) => (
                      <div
                        key={`${item.name}-sub-${page}`}
                        className="flex items-center gap-2 rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent/30 cursor-pointer"
                        onClick={() => {}}
                      >
                        <span className="w-2" />
                        <span>{page}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="w-full justify-between p-2 h-7 text-xs font-medium text-muted-foreground">
            <span className="tracking-wider">Pages</span>
          </div>

          <div className="space-y-0.5 pl-2 mt-2">
            {navigationSections[3].items.map((item) => (
              <div key={item.name}>
                {item.subPages ? (
                  <button
                    type="button"
                    onClick={() => toggleItem(item.name)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors relative",
                      "hover:bg-accent hover:text-accent-foreground",
                      item.active &&
                        "bg-accent text-accent-foreground font-medium"
                    )}
                    aria-expanded={!!itemExpanded[item.name]}
                    aria-controls={`${item.name}-subs`}
                  >
                    {itemExpanded[item.name] ? (
                      <IconChevronDown className="w-4 text-accent-foreground" />
                    ) : (
                      <IconChevronRight className="w-4 text-muted-foreground" />
                    )}
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.name}</span>
                  </button>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.href ?? "#"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors relative",
                        "hover:bg-accent hover:text-accent-foreground",
                        (isActive || item.active) &&
                          "bg-accent text-accent-foreground font-medium"
                      )
                    }
                  >
                    <IconChevronRight className="w-4 text-muted-foreground" />
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                )}

                {item.subPages && itemExpanded[item.name] && (
                  <div
                    id={`${item.name}-subs`}
                    className="ml-7 space-y-0.5 mt-1"
                  >
                    {item.subPages.map((page) => (
                      <div
                        key={`${item.name}-sub-${page}`}
                        className="flex items-center gap-2 rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent/30 cursor-pointer"
                      >
                        <span className="w-2" />
                        <span>{page}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
