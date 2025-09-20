import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderRow } from "./OrderRow";
import { Order } from "@/lib/order";

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: string[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectOrder: (orderId: string) => void;
}

export const OrdersTable = ({
  orders,
  selectedOrders,
  selectAll,
  onSelectAll,
  onSelectOrder,
}: OrdersTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                className="rounded"
                checked={selectAll && orders.length > 0}
                onCheckedChange={onSelectAll}
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
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderRow
                key={`${order.id}-${index}`}
                order={order}
                isSelected={selectedOrders.includes(order.id)}
                onSelect={onSelectOrder}
              />
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
  );
};
