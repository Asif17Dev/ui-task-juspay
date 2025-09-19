import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const orders = [
  {
    id: "#CM9801",
    user: { name: "Natali Craig", avatar: "/1.png" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
  },
  {
    id: "#CM9802",
    user: { name: "Kate Morrison", avatar: "/2.png" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
  },
  {
    id: "#CM9803",
    user: { name: "Drew Cano", avatar: "/3.png" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    id: "#CM9804",
    user: { name: "Orlando Diggs", avatar: "/4.png" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
  },
  {
    id: "#CM9805",
    user: { name: "Andi Lane", avatar: "/5.png" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
  },
  {
    id: "#CM9806",
    user: { name: "John Doe", avatar: "/6.png" },
    project: "Portfolio Website",
    address: "Maple Street Denver",
    date: "Feb 3, 2023",
    status: "In Progress",
  },
  {
    id: "#CM9807",
    user: { name: "Jane Smith", avatar: "/7.png" },
    project: "E-commerce Store",
    address: "Pine Road Seattle",
    date: "Feb 5, 2023",
    status: "Complete",
  },
  {
    id: "#CM9808",
    user: { name: "Chris Adams", avatar: "/8.png" },
    project: "Mobile App",
    address: "Lakeview Chicago",
    date: "Feb 10, 2023",
    status: "Pending",
  },
  {
    id: "#CM9809",
    user: { name: "Emma Brown", avatar: "/9.png" },
    project: "Dashboard Revamp",
    address: "Cedar Lane Austin",
    date: "Feb 12, 2023",
    status: "Approved",
  },
  {
    id: "#CM9810",
    user: { name: "Michael Lee", avatar: "/10.png" },
    project: "SaaS Platform",
    address: "Broadway New York",
    date: "Feb 14, 2023",
    status: "Rejected",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Complete":
      return "#4AA785";
    case "In Progress":
      return "#8A8CD9";
    case "Pending":
      return "#59A8D4";
    case "Approved":
      return "#FFC555";
    case "Rejected":
      return "#FFFFFF66";
    default:
      return "#FFFFFF66";
  }
}

export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const { theme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-6">Order List</h1>

      {/* Toolbar */}
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 
                   gap-3 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-2 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="w-full md:w-64 pl-10" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox className="rounded " />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={`${order.id}-${index}`}>
                <TableCell>
                  <Checkbox className="rounded input" />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.user.avatar} />
                      <AvatarFallback>
                        {order.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {order.user.name}
                  </div>
                </TableCell>
                <TableCell>{order.project}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex gap-0.5 items-center">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background:
                          theme === "light" && order.status === "Rejected"
                            ? "#1C1C1C66"
                            : getStatusColor(order.status),
                      }}
                    />
                    <Badge
                      variant="secondary"
                      className="bg-transparent"
                      style={{
                        color:
                          theme === "light" && order.status === "Rejected"
                            ? "#1C1C1C66"
                            : getStatusColor(order.status),
                      }}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center md:justify-end gap-2 mt-6">
        <Button variant="outline" size="icon" disabled>
          1
        </Button>
        {[2, 3, 4, 5].map((page) => (
          <Button key={page} variant="ghost" size="icon">
            {page}
          </Button>
        ))}
        <Button variant="ghost" size="icon">
          →
        </Button>
      </div>
    </div>
  );
}
