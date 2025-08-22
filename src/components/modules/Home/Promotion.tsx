import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const promotions = [
  {
    title: "🎉 20% Off First Ride",
    description: "Sign up today and enjoy 20% off your first car or bike ride.",
    badge: "New Users",
  },
  {
    title: "👫 Refer & Earn",
    description:
      "Invite friends and earn ride credits when they take their first trip.",
    badge: "Referral",
  },
  {
    title: "🚖 Ride More, Save More",
    description: "Get up to 30% cashback on your 5th ride this month.",
    badge: "Loyalty",
  },
];

const Promotion = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
          Promotions & Offers
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo, idx) => (
            <Card key={idx} className="shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <Badge className="mb-2">{promo.badge}</Badge>
                <CardTitle>{promo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{promo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotion;
