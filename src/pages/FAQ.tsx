import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";

type Props = {};

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I request a ride?",
    answer:
      "Open the app, enter your pickup and destination locations, and select your preferred ride type.",
  },
  {
    question: "Can I choose between a car and a bike?",
    answer:
      "Yes! Our app allows you to select either a car for comfort or a bike for faster rides.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Absolutely. We use encrypted payments and secure processing to ensure your transactions are safe.",
  },
  {
    question: "How do I track my ride?",
    answer:
      "Once your ride is confirmed, you can track your driver in real-time on the map.",
  },
  {
    question: "What if I need to cancel a ride?",
    answer:
      "You can cancel any ride from the app. Depending on timing, cancellation fees may apply.",
  },
];

const FAQ: React.FC<Props> = () => {
  const [search, setSearch] = useState("");

  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>

      <div className="mb-8 text-center">
        <Input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 mx-auto"
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredFAQs.length ? (
            filteredFAQs.map((faq, idx) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="shadow hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle>{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.p
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500"
            >
              No questions found.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FAQ;
