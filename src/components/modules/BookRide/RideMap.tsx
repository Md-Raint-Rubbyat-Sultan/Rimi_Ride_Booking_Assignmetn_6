import type { LatLng } from "@/types/BookRide/rideTypes";
import { motion } from "framer-motion";
import L from "leaflet";
import React from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";

type Props = {
  start: LatLng | null;
  end: LatLng | null;
};

// Fix Leaflet default marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: import("leaflet/dist/images/marker-icon.png"),
  shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
});

// Fly map to searched location
const FlyToLocation = ({ location }: { location: LatLng | null }) => {
  const map = useMap();
  React.useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 14);
    }
  }, [location, map]);
  return null;
};

const RideMap: React.FC<Props> = ({ start, end }) => {
  return (
    <div className="space-y-4 border-2 rounded-2xl overflow-hidden">
      <motion.div
        className="h-[500px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {start && <Marker position={start}></Marker>}
          {end && <Marker position={end}></Marker>}

          {start && <FlyToLocation location={start} />}
          {end && <FlyToLocation location={end} />}

          {start && end && (
            <Polyline
              positions={[
                [start.lat, start.lng],
                [end.lat, end.lng],
              ]}
              pathOptions={{ color: "blue", weight: 4 }}
            />
          )}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default RideMap;
