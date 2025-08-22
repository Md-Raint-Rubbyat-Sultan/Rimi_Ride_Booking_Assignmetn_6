import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner from "@/assets/images/banner.jpg";
import { Link } from "react-router";
import { useGetMeQuery } from "@/redux/feature/user/user.api";

const Hero = () => {
  const { data: user } = useGetMeQuery(undefined);

  return (
    <section>
      <div className="container">
        <div className="bg-muted grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <p>✨ RideShare App – Secure, Reliable & Seamless</p>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Welcome to Rimi
            </h1>
            <div className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              <div className="max-w-3xl mx-auto p-6 text-foreground">
                <p className="mb-4">
                  Experience the most secure and well-structured ride-sharing
                  platform designed for your convenience. Whether you need a car
                  for comfort or a bike for speed, our app ensures every ride
                  is:
                </p>

                <ul className="list-none space-y-3 mb-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">🔒</span>
                    <span>
                      <strong>Highly Secure</strong> – Verified drivers,
                      encrypted payments, and 24/7 safety support.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">🚗</span>
                    <span>
                      <strong>Flexible Options</strong> – Choose between car
                      rides for longer journeys or quick bike rides to beat the
                      traffic.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">🧭</span>
                    <span>
                      <strong>Smart Navigation</strong> – Optimized routes
                      powered by real-time traffic updates.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">⚡</span>
                    <span>
                      <strong>Seamless Experience</strong> – From booking to
                      payment, everything is smooth, fast, and reliable.
                    </span>
                  </li>
                </ul>

                <p>
                  Join thousands of happy riders who trust us daily for a safe,
                  affordable, and hassle-free journey. 🚀
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {/* <Button>
                Primary
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">Secondary</Button> */}
              <Button className="px-6 py-3 text-lg" asChild>
                <Link to="/book-ride">
                  Book a Ride Now <ArrowRight className="size-4" />
                </Link>
              </Button>
              {!user?.data?.email && (
                <Button variant="outline" className="px-6 py-3 text-lg" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              )}
            </div>
          </div>
          <img
            src={banner}
            alt="hero banner"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
