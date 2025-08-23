import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/feature/user/user.api";
import { Link } from "react-router";

const CallToActionSection = () => {
  const { data: user } = useGetMeQuery(undefined);

  return (
    <section className="border-l-8 border-primary py-20 mt-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-accent-foreground mb-4">
          Ready to Ride?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sign up now or book a ride instantly and enjoy a safe, fast, and
          reliable journey.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {!user?.data?.email && (
            <Button variant="outline" className="px-6 py-3 text-lg" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          )}
          <Button className="px-6 py-3 text-lg" asChild>
            <Link to="/book-ride">Book a Ride Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
