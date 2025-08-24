import EarningsChart from "@/components/modules/Earnings/EarningsCharts";
import { SkeletonCard } from "@/components/skeletonCard";
import { useGetEarningHistoryQuery } from "@/redux/feature/driver/driver.api";
import React from "react";

type Props = {};

const Earnings: React.FC<Props> = () => {
  const { data, isLoading } = useGetEarningHistoryQuery(undefined);
  if (isLoading) return <SkeletonCard />;

  console.log(data);

  return (
    <div>
      <EarningsChart
        data={data?.data.data || []}
        totalEarning={data?.data.totalEarning || 0}
        weeklyEarning={data?.data.weeklyEarning || 0}
        monthlyEarning={data?.data.monthlyEarning || 0}
      />
    </div>
  );
};

export default Earnings;
