import FilterRideHistory from "@/components/modules/Profile/FilterRideHistory";
import PaginationUi from "@/components/paginationUi";
import { SkeletonDemo } from "@/components/skeletonRegular";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRideHistoryQuery } from "@/redux/feature/ride/ride.api";
import type { IMetaData } from "@/types";
import { formatDate } from "@/utils/formatdate";
import React, { useState } from "react";

type Props = {};

const RideHistory: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { data, isLoading } = useGetRideHistoryQuery({
    page,
    sort,
    rideStatus: status,
  });

  if (isLoading) return <SkeletonDemo />;

  console.log(data);

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>A list of your recent rides.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((items, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{items?.rideStatus}</TableCell>
              <TableCell>
                {typeof items?.driverId === "string"
                  ? items?.driverId
                  : "Not assigned"}
              </TableCell>
              <TableCell>{formatDate(items?.createdAt)}</TableCell>
              <TableCell className="text-right">{items?.costOfRide}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <FilterRideHistory setSort={setSort} setStatus={setStatus} />
        {(data?.meta?.totalPage as number) > 1 && (
          <PaginationUi meta={data?.meta as IMetaData} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default RideHistory;
