import { useState } from "react";
import { Search, Plus, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SortConfig } from "@/lib/order";

interface OrdersToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string[];
  onStatusFilterChange: (statuses: string[]) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

const getStatusColor = (status: string) => {
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
};

export const OrdersToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortConfig,
  onSort,
}: OrdersToolbarProps) => {
  const toggleStatusFilter = (status: string) => {
    const newFilter = statusFilter.includes(status)
      ? statusFilter.filter((s) => s !== status)
      : [...statusFilter, status];
    onStatusFilterChange(newFilter);
  };

  const clearFilters = () => onStatusFilterChange([]);

  const statuses = [
    "Complete",
    "In Progress",
    "Pending",
    "Approved",
    "Rejected",
  ];
  const sortOptions = [
    { key: "id", label: "Order ID" },
    { key: "user", label: "User" },
    { key: "project", label: "Project" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-2 rounded-lg">
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
              {statuses.map((status) => (
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
                  onClick={clearFilters}
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
              {sortOptions.map(({ key, label }) => (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => onSort(key)}
                >
                  {label}{" "}
                  {sortConfig.key === key &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Button>
              ))}
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
