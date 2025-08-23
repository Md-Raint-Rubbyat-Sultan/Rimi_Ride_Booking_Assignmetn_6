import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LatLng } from "@/types/BookRide/rideTypes";
import axios from "axios";
import { motion } from "motion/react";
import { CircleAlert, Loader } from "lucide-react";

type Props = {
  setStart: (T: LatLng | null) => void;
  setEnd: (T: LatLng | null) => void;
};

const RideSearchFields: React.FC<Props> = ({ setStart, setEnd }) => {
  const [startQuery, setStartQuery] = useState("");
  const [endQuery, setEndQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const geocodeLocation = async (query: string): Promise<LatLng | null> => {
    if (!query) return null;
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      if (res.data.length > 0) {
        return {
          lat: parseFloat(res.data[0].lat),
          lng: parseFloat(res.data[0].lon),
        };
      }
      return null;
    } catch (err) {
      console.error("Geocoding error:", err);
      return null;
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const s = await geocodeLocation(startQuery);
      const d = await geocodeLocation(endQuery);
      setStart(s);
      setEnd(d);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className="flex flex-wrap md:flex-nowrap items-center gap-2 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Input
        placeholder="Enter start location"
        value={startQuery}
        onChange={(e) => setStartQuery(e.target.value)}
      />
      <Input
        placeholder="Enter destination"
        value={endQuery}
        onChange={(e) => setEndQuery(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        Search {isLoading && <Loader className="animate-spin" />}
      </Button>
    </motion.form>
  );
};

export default RideSearchFields;
