export const ServiceHighlights = () => {
  const highlights = [
    {
      title: "Car Rides",
      description:
        "Comfortable and convenient car rides for long and short trips.",
      icon: "🚘",
    },
    {
      title: "Bike Rides",
      description:
        "Affordable and quick bike rides to beat the traffic hassle.",
      icon: "🏍️",
    },
    {
      title: "Smart Navigation",
      description: "Advanced navigation ensures the fastest and safest routes.",
      icon: "🗺️",
    },
    {
      title: "Secure Experience",
      description:
        "Your safety is our priority with verified drivers & secure payments.",
      icon: "🔒",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Our Service Highlights
        </h2>
        <p className="text-lg text-foreground mb-12">
          Enjoy a seamless, safe, and reliable ride-sharing experience
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-card rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
