import { useNavigate } from "react-router-dom";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ProjectionsChart } from "@/components/dashboard/projections-chart";
import { LocationMap } from "@/components/dashboard/location-map";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ProductsTable } from "@/components/dashboard/products-table";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-medium">eCommerce</h1>

      {/* Metrics Cards */}

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <MetricCard
              title="Customers"
              value="3,781"
              change="+11.01%"
              isPositive={true}
            />
            <MetricCard
              title="Orders"
              value="1,219"
              change="-0.03%"
              isPositive={false}
              onClick={() => navigate("/orders")}
            />
            <MetricCard
              title="Revenue"
              value="$695"
              change="+15.03%"
              isPositive={true}
            />
            <MetricCard
              title="Growth"
              value="30.1%"
              change="+6.08%"
              isPositive={true}
            />
          </div>
        </div>
        <div className="xl:col-span-2">
          <ProjectionsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <LocationMap />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProductsTable />
        </div>
        <SalesChart />
      </div>
    </div>
  );
}
