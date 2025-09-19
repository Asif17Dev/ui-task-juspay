import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", projections: 18, actuals: 15 },
  { month: "Feb", projections: 20, actuals: 25 },
  { month: "Mar", projections: 25, actuals: 20 },
  { month: "Apr", projections: 28, actuals: 30 },
  { month: "May", projections: 22, actuals: 18 },
  { month: "Jun", projections: 26, actuals: 28 },
];

export function ProjectionsChart() {
  return (
    <Card className="border-none bg-[#F7F9FB] dark:bg-[#FFFFFF0D]">
      <CardHeader>
        <CardTitle className="text-lg">Projections vs Actuals</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} barCategoryGap="30%">
            {/* X Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />

            {/* Y Axis with "M" formatting */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `${value}M`}
            />

            {/* Tooltip only */}
            <Tooltip
              formatter={(val) => `${val}M`}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              itemStyle={{ color: "#000" }}
            />

            {/* Stacked Bars */}
            <Bar
              dataKey="projections"
              stackId="a"
              fill="#A8C5DA"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="actuals"
              stackId="a"
              fill="#E5ECF6"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
