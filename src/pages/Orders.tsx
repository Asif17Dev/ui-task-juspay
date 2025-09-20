import { useState, useMemo } from "react";
import { SortConfig } from "@/lib/order";
import { generateOrders } from "@/lib/generateOrders";
import { useOrdersData } from "@/hooks/useOrdersData";
import { OrdersToolbar } from "@/components/orders/OrdersToolbar";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Pagination } from "@/components/orders/Pagination";

const orders = generateOrders();

export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const itemsPerPage = 10;

  const filteredOrders = useOrdersData(
    orders,
    searchQuery,
    statusFilter,
    sortConfig
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
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

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-6">Order List</h1>

      <OrdersToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

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

      <OrdersTable
        orders={currentOrders}
        selectedOrders={selectedOrders}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        onSelectOrder={handleSelectOrder}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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
