const HowItWorks = () => {
  const steps = [
    {
      title: "Request a Ride",
      description:
        "Enter your pickup and destination locations to request a ride instantly.",
      icon: "📍",
    },
    {
      title: "Get Matched",
      description:
        "Nearby drivers will be notified and one will accept your request quickly.",
      icon: "🚗",
    },
    {
      title: "Enjoy the Ride",
      description:
        "Track your driver in real time and enjoy a safe, comfortable ride.",
      icon: "🛣️",
    },
    {
      title: "Pay",
      description:
        "Pay securely through the app and leave a rating for your driver.",
      icon: "💳",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-lg text-foreground mb-12">
          Book a ride in just a few simple steps
        </p>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
