import CostCard from "@/components/modules/BookRide/CostCard";
import LocationShower from "@/components/modules/BookRide/LocationShower";
import RideMap from "@/components/modules/BookRide/RideMap";
import RideSearchFields from "@/components/modules/BookRide/RideSearchFields";
import type { LatLng } from "@/types/BookRide/rideTypes";
import { calculateDistance } from "@/utils/calculateDistance";

import React, { useEffect, useState } from "react";

type Props = {};

const BookRide: React.FC<Props> = () => {
  const [start, setStart] = useState<LatLng | null>(null);
  const [end, setEnd] = useState<LatLng | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    if (start && end) {
      const distanceInKm = calculateDistance(
        start.lat,
        start.lng,
        end.lat,
        end.lng
      );
      setDistance(distanceInKm);
      setAmount(distanceInKm * 60);
    } else {
      setDistance(0);
      setAmount(0);
    }
  }, [start, end, distance]);

  return (
    <div className="px-4 py-16 space-y-8">
      <h3 className="text-2xl text-foreground">Search Location</h3>
      <RideSearchFields setStart={setStart} setEnd={setEnd} />
      <h3 className="text-2xl text-foreground">Destination</h3>
      <LocationShower start={start} end={end} />
      <h3 className="text-2xl text-foreground">Cost</h3>
      <CostCard amount={amount} distance={distance} start={start} end={end} />
      <h3 className="text-2xl text-foreground">Map</h3>
      <RideMap start={start} end={end} />
    </div>
  );
};

export default BookRide;
