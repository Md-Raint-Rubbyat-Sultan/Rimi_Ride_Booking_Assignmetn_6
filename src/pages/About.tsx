import { SkeletonCard } from "@/components/skeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminsQuery } from "@/redux/feature/user/user.api";
import type { IUser } from "@/types";
import { motion } from "framer-motion";
import type React from "react";

type Props = {};

// const team: TeamMember[] = [
//   { name: "Ronit", role: "Founder & Lead Admin", image: "/avatars/ronit.png" },
//   { name: "Samiul", role: "Admin", image: "/avatars/samiul.png" },
//   { name: "Rakib", role: "Admin", image: "/avatars/rakib.png" },
//   { name: "Nusrat", role: "Admin", image: "/avatars/nusrat.png" },
// ];

const About: React.FC<Props> = () => {
  const { data: admins, isLoading: adminLoadings } =
    useGetAdminsQuery(undefined);

  if (adminLoadings) return <SkeletonCard />;
  console.log(admins);

  const team: IUser[] = admins?.data || [];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Company Background */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We are a ride-sharing company based in Bangladesh, committed to
          redefining safe and user-friendly transportation. Our mission is to
          connect people with reliable rides while ensuring security, comfort,
          and efficiency at every step.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the{" "}
              <span className="font-semibold">
                best ride-sharing company in Bangladesh
              </span>
              , delivering the{" "}
              <span className="font-semibold">most secure</span> and{" "}
              <span className="font-semibold">user-friendly</span> experience
              for all riders and drivers.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Profiles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="text-center p-4">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  {member?.picture ? (
                    <AvatarImage src={member?.picture} alt={member.name} />
                  ) : (
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
