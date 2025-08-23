import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

interface FeatureGroup {
  role: string;
  features: string[];
}

const featureGroups: FeatureGroup[] = [
  {
    role: "Riders",
    features: [
      "Request a ride with pickup & destination location",
      "Cancel a ride (within allowed window)",
      "View ride history",
    ],
  },
  {
    role: "Drivers",
    features: [
      "Accept/reject ride requests",
      "Update ride status (Picked Up → In Transit → Completed)",
      "View earnings history",
      "Set availability status (Online/Offline)",
    ],
  },
  {
    role: "Admins",
    features: [
      "View all users, drivers, and rides",
      "Approve/suspend drivers",
      "Block/unblock user accounts",
    ],
  },
];

const Features: React.FC<Props> = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the powerful capabilities designed for Riders, Drivers, and
          Admins to make our ride-sharing platform secure, efficient, and
          user-friendly.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featureGroups.map((group, index) => (
          <motion.div
            key={group.role}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="h-full relative overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {group.role}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Progress Timeline */}
                <div className="relative pl-8">
                  {/* Animated line */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute left-3 top-0 w-[2px] bg-primary/40"
                  />

                  <div className="space-y-8">
                    {group.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.15 }}
                        className="relative flex items-start gap-3 group"
                      >
                        {/* Step Circle using Badge */}
                        <motion.div
                          initial={{ scale: 0.8 }}
                          whileInView={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute -left-8 flex items-center justify-center"
                        >
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold transition-colors bg-accent",
                              "group-hover:bg-primary group-hover:text-primary-foreground"
                            )}
                          >
                            {i + 1}
                          </Badge>
                        </motion.div>

                        {/* Feature Label */}
                        <span className="text-foreground group-hover:text-primary transition-colors pl-2">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
