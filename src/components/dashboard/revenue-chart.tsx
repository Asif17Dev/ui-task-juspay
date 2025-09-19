import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", current: 10, previous: 15 },
  { month: "Feb", current: 15, previous: 12 },
  { month: "Mar", current: 12, previous: 18 },
  { month: "Apr", current: 18, previous: 14 },
  { month: "May", current: 14, previous: 16 },
  { month: "Jun", current: 20, previous: 22 },
];

export function RevenueChart() {
  const { theme } = useTheme();
  return (
    <Card className="border-none bg-[#F7F9FB] dark:bg-[#FFFFFF0D] h-[450px]">
      <CardHeader className="flex xl:items-center flex-col xl:flex-row">
        <CardTitle className="text-lg">Revenue</CardTitle>
        <div className="h-5 w-[1px] bg-slate-400 mx-6 hidden xl:inline" />
        <div className="flex items-center gap-6 text-sm ">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#A8C5DA]" />
            Current Week <span className="font-medium">$58,211</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#1c1c1c]" />
            Previous Week <span className="font-medium">$68,768</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center h-full">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis hide />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#A8C5DA"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke={theme === "dark" ? "#C6C7F8" : "#1c1c1c"}
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
