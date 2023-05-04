import React, { useState } from "react"

type FaqData = {
  question: string;
  answer: string;
};

const faqData: FaqData[] = [
  {
  question: "What is a model agency?",
  answer:
  "A model agency is a company that represents professional models for jobs in the fashion and media industry.",
  },
  {
  question: "How do I become a model with your agency?",
  answer:
  "You can submit your portfolio and headshots through our website or attend one of our open calls. We will review your submission and contact you if we are interested in working with you.",
  },
  {
  question: "What are the requirements to become a model?",
  answer:
  "We are looking for models who meet industry standards in terms of height, weight, and measurements. However, we also consider personality, professionalism, and potential for growth.",
  },
  {
  question: "What types of modeling jobs do you offer?",
  answer:
  "We offer a range of modeling jobs, including runway shows, editorial shoots, commercial campaigns, and brand endorsements.",
  },
  {
  question: "How much do models get paid?",
  answer:
  "The pay for modeling jobs varies depending on the type of job, the client, and the model's experience. We negotiate fair rates on behalf of our models.",
  },
  {
  question: "Do you represent models of all ages and sizes?",
  answer:
  "Yes, we represent models of all ages, sizes, and backgrounds. We believe in promoting diversity and inclusivity in the fashion industry.",
  },
  {
  question: "Can I work with other modeling agencies at the same time?",
  answer:
  "It depends on the terms of your contract with us. We generally prefer to work exclusively with our models, but we can make exceptions in certain cases.",
  },
  {
  question: "How can I contact your agency?",
  answer:
  "You can reach us through our website, by email, or by phone. Our contact information is listed on our website.",
  },
  ];

function FAQ(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleActiveIndex = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <section className="max-w-3xl text-black mx-auto px-4 py-5 md-8">
      <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div key={index} className="border-t border-black-200 pt-4">
          <button
            className="w-full text-left font-medium py-2"
            onClick={() => toggleActiveIndex(index)}
          >
            <div className="flex justify-between items-center">
              <span>{faq.question}</span>
              <span>
                {activeIndex === index ? (
                  <svg
                    className="w-4 h-4 fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L12 12.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.293 7.293a1 1 0 00-1.414 0L12 10.586l-2.879-2.88a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l3.5-3.5a1 1 0 000-                    1.414z" />
                  </svg>
                )}
              </span>
            </div>
          </button>
          <div
            className={`py-4 text-slate-700 ${
              activeIndex === index ? "block" : "hidden"
            }`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </section>
  );
  

};

export default FAQ;
