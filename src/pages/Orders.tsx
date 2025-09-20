import { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Generate more sample data
const generateOrders = () => {
  const baseOrders = [
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
  ];

  const additionalNames = [
    "John Doe",
    "Jane Smith",
    "Chris Adams",
    "Emma Brown",
    "Michael Lee",
    "Sarah Wilson",
    "David Johnson",
    "Lisa Anderson",
    "Robert Taylor",
    "Maria Garcia",
    "James Martinez",
    "Patricia Rodriguez",
    "William Davis",
    "Jennifer Lopez",
    "Richard Brown",
    "Mary Miller",
    "Thomas Wilson",
    "Barbara Moore",
    "Daniel Taylor",
    "Elizabeth Anderson",
  ];

  const projects = [
    "Portfolio Website",
    "E-commerce Store",
    "Mobile App",
    "Dashboard Revamp",
    "SaaS Platform",
    "Blog Platform",
    "Social Media App",
    "Analytics Dashboard",
    "Payment Gateway",
    "API Integration",
    "Marketing Website",
    "Content Management",
    "Customer Portal",
    "Booking System",
    "Learning Platform",
  ];

  const addresses = [
    "Maple Street Denver",
    "Pine Road Seattle",
    "Lakeview Chicago",
    "Cedar Lane Austin",
    "Broadway New York",
    "Sunset Blvd Los Angeles",
    "Main Street Boston",
    "Park Avenue Miami",
    "River Road Portland",
    "Oak Street Phoenix",
    "Valley View Dallas",
    "Mountain Road Vegas",
    "Beach Drive San Diego",
    "Forest Lane Atlanta",
    "Hill Street Detroit",
  ];

  const statuses = [
    "Complete",
    "In Progress",
    "Pending",
    "Approved",
    "Rejected",
  ];
  const dates = [
    "Just now",
    "2 minutes ago",
    "5 minutes ago",
    "10 minutes ago",
    "30 minutes ago",
    "1 hour ago",
    "2 hours ago",
    "Yesterday",
    "2 days ago",
    "Feb 1, 2023",
    "Feb 3, 2023",
    "Feb 5, 2023",
    "Feb 8, 2023",
    "Feb 10, 2023",
    "Feb 12, 2023",
    "Feb 14, 2023",
    "Feb 16, 2023",
    "Feb 18, 2023",
    "Feb 20, 2023",
    "Feb 22, 2023",
  ];

  const allOrders = [...baseOrders];

  // Generate 45 more orders to make total 50
  for (let i = 6; i <= 50; i++) {
    const orderId = `#CM${9800 + i}`;
    const randomNameIndex = Math.floor(Math.random() * additionalNames.length);
    const randomProjectIndex = Math.floor(Math.random() * projects.length);
    const randomAddressIndex = Math.floor(Math.random() * addresses.length);
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const randomDateIndex = Math.floor(Math.random() * dates.length);

    allOrders.push({
      id: orderId,
      user: {
        name: additionalNames[randomNameIndex],
        avatar: `/${(i % 10) + 1}.png`,
      },
      project: projects[randomProjectIndex],
      address: addresses[randomAddressIndex],
      date: dates[randomDateIndex],
      status: statuses[randomStatusIndex],
    });
  }

  return allOrders;
};

const orders = generateOrders();

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const { theme } = useTheme();

  const itemsPerPage = 10;

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((order) =>
        statusFilter.includes(order.status)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case "id":
            aValue = a.id;
            bValue = b.id;
            break;
          case "user":
            aValue = a.user.name;
            bValue = b.user.name;
            break;
          case "project":
            aValue = a.project;
            bValue = b.project;
            break;
          case "address":
            aValue = a.address;
            bValue = b.address;
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          case "date":
            // Convert date strings to sortable values
            const dateOrder = [
              "Just now",
              "A minute ago",
              "2 minutes ago",
              "5 minutes ago",
              "10 minutes ago",
              "30 minutes ago",
              "1 hour ago",
              "2 hours ago",
              "Yesterday",
              "2 days ago",
            ];
            aValue =
              dateOrder.indexOf(a.date) !== -1
                ? dateOrder.indexOf(a.date)
                : 999;
            bValue =
              dateOrder.indexOf(b.date) !== -1
                ? dateOrder.indexOf(b.date)
                : 999;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchQuery, statusFilter, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map((order) => order.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = Math.max(1, totalPages - 4); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 bg-page-background">
              <div className="space-y-2">
                <p className="text-sm font-semibold mb-2">Filter by Status</p>
                {[
                  "Complete",
                  "In Progress",
                  "Pending",
                  "Approved",
                  "Rejected",
                ].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={status}
                      checked={statusFilter.includes(status)}
                      onCheckedChange={() => toggleStatusFilter(status)}
                    />
                    <label
                      htmlFor={status}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: getStatusColor(status) }}
                      />
                      {status}
                    </label>
                  </div>
                ))}
                {statusFilter.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => setStatusFilter([])}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 bg-page-background">
              <div className="space-y-1">
                <p className="text-sm font-semibold mb-2">Sort by</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSort("id")}
                >
                  Order ID{" "}
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSort("user")}
                >
                  User{" "}
                  {sortConfig.key === "user" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSort("project")}
                >
                  Project{" "}
                  {sortConfig.key === "project" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSort("date")}
                >
                  Date{" "}
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="w-full md:w-64 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results info */}
      {(searchQuery || statusFilter.length > 0) && (
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredOrders.length} of {orders.length} results
          {statusFilter.length > 0 && (
            <span className="ml-2">
              (Filtered by: {statusFilter.join(", ")})
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  className="rounded"
                  checked={selectAll && currentOrders.length > 0}
                  onCheckedChange={handleSelectAll}
                />
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
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <TableRow key={`${order.id}-${index}`}>
                  <TableCell>
                    <Checkbox
                      className="rounded input"
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => handleSelectOrder(order.id)}
                    />
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center md:justify-end gap-2 mt-6">
        {currentPage > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            ←
          </Button>
        )}

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "outline" : "ghost"}
            size="icon"
            disabled={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        {currentPage < totalPages && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          >
            →
          </Button>
        )}
      </div>

      {/* Selected items indicator */}
      {selectedOrders.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground text-center">
          {selectedOrders.length} order{selectedOrders.length > 1 ? "s" : ""}{" "}
          selected
        </div>
      )}
    </div>
  );
}
