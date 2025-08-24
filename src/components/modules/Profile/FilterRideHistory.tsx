import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
  setSort: (T: string | null) => void;
  setStatus: (T: string | null) => void;
};

const FilterRideHistory: React.FC<Props> = ({ setSort, setStatus }) => {
  const onFilterSubmit = async (data: string) => {
    setSort(data);
  };

  const onStatusSubmit = async (data: string) => {
    if (data === "DEFAULT") {
      setStatus(null);
    } else {
      setStatus(data);
    }
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <Select onValueChange={onFilterSubmit}>
        <SelectTrigger>
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Date</SelectItem>
          <SelectItem value="costOfRide">Cost Range</SelectItem>
        </SelectContent>
      </Select>
      {/* Status */}
      <Select onValueChange={onStatusSubmit}>
        <SelectTrigger>
          <SelectValue placeholder="DEFAULT" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DEFAULT">DEFAULT</SelectItem>
          <SelectItem value="REQUESTED">REQUESTED</SelectItem>
          <SelectItem value="ACCEPTED">ACCEPTED</SelectItem>
          <SelectItem value="PICKED_UP">PICKED UP</SelectItem>
          <SelectItem value="IN_TRANSIT">IN TRANSIT</SelectItem>
          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
          <SelectItem value="CANCELED">CANCELLED</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterRideHistory;
