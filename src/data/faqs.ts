import { helpEmail } from "@/data/committee";

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "When and where is the reunion?",
    answer:
      "Date and venue are still TBA — we're aiming for around Fall 2027. Join the mailing list and you'll hear first when we lock things in.",
  },
  {
    question: "Who can come?",
    answer:
      "This is for the Huntsville High Class of 2017. Guest policy (plus-ones, family events) will be decided after we settle the event format.",
  },
  {
    question: "How much will tickets cost?",
    answer:
      "TBD after we survey the class and draft a budget. Expect updates once venue and catering options are clearer.",
  },
  {
    question: "How do I update my contact info?",
    answer:
      "Submit the registration form again with your current details.",
  },
  {
    question: "Is this affiliated with Huntsville City Schools or HHS?",
    answer:
      "No — this is an independent alumni effort. For official school information, visit the Huntsville High School website.",
  },
  {
    question: "How can I help?",
    answer: `The committee isn't adding members. If you want to help, email ${helpEmail}.`,
  },
];
