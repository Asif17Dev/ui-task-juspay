import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTheme } from "next-themes";
import { Order } from "../../types/order";

interface OrderRowProps {
  order: Order;
  isSelected: boolean;
  onSelect: (orderId: string) => void;
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

export const OrderRow = ({ order, isSelected, onSelect }: OrderRowProps) => {
  const { theme } = useTheme();

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          className="rounded input"
          checked={isSelected}
          onCheckedChange={() => onSelect(order.id)}
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
  );
};
