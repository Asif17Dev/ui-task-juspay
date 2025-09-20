import { Order, SortConfig } from "@/lib/order";
import { useMemo } from "react";

export const useOrdersData = (
  orders: Order[],
  searchQuery: string,
  statusFilter: string[],
  sortConfig: SortConfig
) => {
  return useMemo(() => {
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
  }, [orders, searchQuery, statusFilter, sortConfig]);
};
