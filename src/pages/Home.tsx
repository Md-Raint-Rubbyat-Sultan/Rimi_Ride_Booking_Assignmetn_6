import React from "react";
import { motion } from "motion/react";
import CallToActionSection from "@/components/modules/Home/CallToAction";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import Promotion from "@/components/modules/Home/Promotion";
import ServiceHighlights from "@/components/modules/Home/ServiceHighlighte";

type Props = {};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home: React.FC<Props> = () => {
  return (
    <main className="overflow-hidden">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <HowItWorks />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ServiceHighlights />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Promotion />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <CallToActionSection />
      </motion.div>
    </main>
  );
};

export default Home;
