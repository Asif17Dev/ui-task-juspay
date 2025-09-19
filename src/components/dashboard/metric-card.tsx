import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  change,
  isPositive,
  onClick,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        `cursor-pointer transition-all hover:shadow-md border-none rounded-2xl overflow-hidden`,
        onClick && "hover:scale-105",
        title === "Customers" && "bg-[#E3F5FF]",
        title === "Growth" && "bg-[#E5ECF6]",
        title !== "Customers" &&
          title !== "Growth" &&
          "bg-[#F7F9FB] dark:bg-[#FFFFFF0D]"
      )}
      onClick={onClick}
    >
      <CardContent
        className={cn(
          "p-6 py-10",
          title === "Customers" && "text-black",
          title === "Growth" && "text-black"
        )}
      >
        <div className="flex items-end justify-between">
          <div>
            <p className={cn("text-sm font-medium text-muted-foreground mb-1")}>
              {title}
            </p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <div className={cn("flex items-center gap-1 text-sm font-medium")}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
