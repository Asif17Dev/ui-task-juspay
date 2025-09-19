import { Bug, UserPlus, Settings, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  collapsed: boolean;
}

const notifications = [
  {
    id: 1,
    icon: Bug,
    title: "You have a bug that needs...",
    time: "Just now",
    avatar: "B",
  },
  {
    id: 2,
    icon: UserPlus,
    title: "New user registered",
    time: "59 minutes ago",
    avatar: "U",
  },
  {
    id: 3,
    icon: Bug,
    title: "You have a bug that needs...",
    time: "12 hours ago",
    avatar: "B",
  },
  {
    id: 4,
    icon: Bug,
    title: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
    avatar: "B",
  },
];

const activities = [
  {
    id: 1,
    user: "You have a bug that needs...",
    time: "Just now",
    avatar: "/1.png",
  },
  {
    id: 2,
    user: "Released a new version",
    time: "59 minutes ago",
    avatar: "/2.png",
  },
  {
    id: 3,
    user: "Submitted a bug",
    time: "12 hours ago",
    avatar: "/3.png",
  },
  {
    id: 4,
    user: "Modified a data in Page X",
    time: "Today, 11:59 AM",
    avatar: "/4.png",
  },
  {
    id: 5,
    user: "Deleted a page in Project X",
    time: "Feb 2, 2023",
    avatar: "/5.png",
  },
];

const contacts = [
  { name: "Natali Craig", avatar: "/6.png" },
  { name: "Drew Cano", avatar: "/7.png", online: true },
  { name: "Orlando Diggs", avatar: "/8.png" },
  { name: "Andi Lane", avatar: "/9.png" },
  { name: "Kate Morrison", avatar: "/10.png" },
];

export function RightSidebar({ collapsed }: RightSidebarProps) {
  return (
    <aside
      className={cn(
        "border-l bg-sidebar-right transition-all duration-300 h-screen overflow-y-auto sticky top-0",
        collapsed ? "w-0 overflow-hidden" : "w-80"
      )}
    >
      <div className="p-4">
        {/* Notifications */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="space-y-3">
            {notifications.map((notification, i) => (
              <div key={notification.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full bg-muted",
                    i % 2 == 0 ? "bg-[#E3F5FF]" : "bg-[#E5ECF6]"
                  )}
                >
                  <notification.icon className="h-4 w-4 text-[#1c1c1c]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="mb-6">
          <h3 className="mb-4 font-medium">Activities</h3>
          <div className="relative space-y-4 ">
            {/* Timeline vertical line */}
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />

            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="relative flex items-start gap-3"
              >
                {/* Avatar with timeline dot */}
                <div className="relative z-10">
                  <Avatar className="h-8 w-8 ring-2 ring-background">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="text-xs">
                      {activity.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Text content */}
                <div className="flex-1">
                  <p className="text-sm">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="mb-4 font-medium">Contacts</h3>
          <div className="space-y-2">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="text-xs">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-sidebar-right" />
                  )}
                </div>
                <span className="text-sm">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
