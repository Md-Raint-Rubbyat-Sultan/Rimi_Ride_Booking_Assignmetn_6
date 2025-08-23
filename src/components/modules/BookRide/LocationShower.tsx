import { Card } from "@/components/ui/card";
import type { LatLng } from "@/types/BookRide/rideTypes";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

type Props = {
  start: LatLng | null;
  end: LatLng | null;
};

const LocationShower: React.FC<Props> = ({ start, end }) => {
  return (
    <AnimatePresence>
      {(start || end) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="space-y-1 px-4"
        >
          {start && (
            <Card className="p-2">
              📍 Start: {start.lat.toFixed(5)}, {start.lng.toFixed(5)}
            </Card>
          )}
          {end && (
            <Card className="p-2">
              🏁 End: {end.lat.toFixed(5)}, {end.lng.toFixed(5)}
            </Card>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationShower;
