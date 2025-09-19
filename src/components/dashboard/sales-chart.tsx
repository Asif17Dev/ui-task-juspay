import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Direct", value: 38.6, color: "#C6C7F8" },
  { name: "Affiliate", value: 22.5, color: "#BAEDBD" },
  { name: "Sponsored", value: 30.8, color: "#95A4FC" },
  { name: "E-mail", value: 8.1, color: "#B1E3FF" },
];

const salesData = [
  { type: "Direct", amount: "$300.56" },
  { type: "Affiliate", amount: "$135.18" },
  { type: "Sponsored", amount: "$154.02" },
  { type: "E-mail", amount: "$48.96" },
];

export function SalesChart() {
  return (
    <Card className="border-none bg-[#F7F9FB] dark:bg-[#FFFFFF0D]">
      <CardHeader>
        <CardTitle className="text-lg">Total Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeOpacity={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {salesData.map((item) => (
            <div
              key={item.type}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: data.find((d) => d.name === item.type)
                      ?.color,
                  }}
                />
                <span className="text-muted-foreground">{item.type}</span>
              </div>
              <span className="font-medium">{item.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
