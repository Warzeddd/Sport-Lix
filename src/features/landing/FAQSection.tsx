import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Section } from "./Section";
  
  const FAQS: { question: string; answer: string }[] = [
    {
      question: "What types of workouts are included in the Sport-Lix programs?",
      answer:
        "Sport-Lix offers a wide variety of workouts, including strength training, cardio, HIIT, flexibility exercises, and more. Each program is designed to cater to different fitness levels and goals.",
    },
    {
      question: "Can I customize my workout plan on Sport-Lix?",
      answer:
        "Yes, Sport-Lix allows you to customize your workout plan based on your fitness level, goals, and preferences. You can adjust the intensity, duration, and type of exercises in your plan.",
    },
    {
      question: "How do I track my progress with Sport-Lix?",
      answer:
        "You can track your progress through the Sport-Lix dashboard, where you can log your workouts, monitor your performance, and see your improvements over time.",
    },
    {
      question: "Are there meal plans included with the Sport-Lix programs?",
      answer:
        "Yes, Sport-Lix includes meal plans tailored to complement your workout regimen. These plans are designed to help you achieve your fitness goals, whether it's weight loss, muscle gain, or maintaining a healthy lifestyle.",
    },
    {
      question: "Can I access Sport-Lix on my mobile device?",
      answer:
        "Absolutely! Sport-Lix is fully optimized for mobile devices, allowing you to access your workout plans, track progress, and follow routines from anywhere.",
    },
    {
      question: "Is there a community or support group for Sport-Lix members?",
      answer:
        "Yes, Sport-Lix provides access to a vibrant community of fitness enthusiasts where you can share your journey, get support, and stay motivated. Our support team is also available to assist you with any questions.",
    },
    {
      question: "How often are new workout programs added?",
      answer:
        "New workout programs are added regularly to keep your fitness routine fresh and challenging. You’ll receive notifications whenever new content is available.",
    },
    {
      question: "Can I integrate Sport-Lix with other fitness apps?",
      answer:
        "Yes, Sport-Lix can be integrated with popular fitness apps and devices to provide a seamless experience in tracking your overall fitness journey.",
    },
    {
      question: "What if I need help with my workout routine?",
      answer:
        "Our expert trainers are available to provide guidance and answer any questions you may have about your workout routine. You can reach out to them through the support section in your dashboard.",
    },
    {
      question: "Is there a free trial available for Sport-Lix?",
      answer:
        "Yes, Sport-Lix offers a free trial period so you can explore our platform and see if it’s the right fit for your fitness goals before committing to a subscription.",
    },
  ];
  
  export const FAQSection = () => {
    return (
      <Section className="flex w-full flex-row items-start gap-4 max-lg:flex-col max-lg:items-center">
        <div className="flex-1 max-lg:text-center">
          <h2 className="text-xl font-bold text-primary">FAQ</h2>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="w-full max-w-lg flex-1 text-left">
          <Accordion type="multiple">
            {FAQS.map((faq, index) => (
              <AccordionItem
                value={faq.question}
                key={faq.question}
                className="text-left"
              >
                <AccordionTrigger>
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    );
  };
  