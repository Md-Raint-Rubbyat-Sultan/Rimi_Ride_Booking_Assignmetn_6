import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IRideDetails } from "@/types";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { motion } from "motion/react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement
);

type Props = {
  data: IRideDetails[];
  totalEarning: number;
  weeklyEarning: number;
  monthlyEarning: number;
};

export default function EarningsChart({
  data,
  totalEarning,
  weeklyEarning,
  monthlyEarning,
}: Props) {
  const dailyEarnings = data?.map((ride) => ({
    day: new Date(ride?.createdAt).toLocaleDateString("en-US"),
    amount: ride?.costOfRide as number,
  }));

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
        <p className="text-muted-foreground">Visual breakdown of your rides</p>
      </motion.div>

      {/* Total Earnings */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold">Totla</p>
                <p className="text-4xl font-bold">
                  ৳ {totalEarning.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">Weekly</p>
                <p className="text-4xl font-bold">
                  ৳ {weeklyEarning.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">Monthly</p>
                <p className="text-4xl font-bold">
                  ৳ {monthlyEarning.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Earnings */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={{
              labels: dailyEarnings.map((d) => d.day),
              datasets: [
                {
                  label: "Earnings",
                  data: dailyEarnings.map((d) => d.amount),
                  backgroundColor: "rgba(99, 102, 241, 0.8)",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
