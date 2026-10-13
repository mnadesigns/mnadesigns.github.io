// Client reviews shown in the Client Stories section on the home page, in the clients' own words.
export type ClientStory = {
  rating: number; // 0 to 5, halves allowed
  quote: string[]; // one entry per paragraph
  name: string;
  role: string;
  slug: string; // the photo is /images/clients/<slug>.webp and the company logo, if there is one, <slug>-logo.webp
  logo?: boolean;
  photo?: boolean; // false when there is no photo file yet
  bold?: string[]; // phrases of the quote shown in bold, copied exactly from the text
};

export const clientStoriesIntro = {
  kicker: "Client Stories",
};

export const clientStories: ClientStory[] = [
  {
    rating: 5,
    quote: [
      "Muhammad transformed our outdated site into a modern, mobile-friendly experience. Since the April 2024 launch, online orders are up 30%, and customer feedback has been fantastic.",
      "He made the process easy, understood our goals, and delivered a site that truly supports our business.",
    ],
    name: "Ray Capaldi",
    slug: "ray-capaldi",
    bold: ["online orders are up 30%"],
    logo: true,
    role: "Chef & Owner @ Wonderpies",
  },
  {
    rating: 5,
    quote: ["Naeem is my go-to freelancer on Upwork. He is exceptionally talented and goes the extra mile to ensure he delivers to meet and exceed your expectations. You will be so lucky to work with him."],
    name: "Charletta Jean-Louis",
    slug: "charletta-jean-louis",
    bold: ["exceptionally talented"],
    logo: true,
    role: "IT Manager @ Erlybird Incubator",
  },
  {
    rating: 5,
    quote: ["Another successful project from Naeem. Fantastic quality as always."],
    name: "Brent Thomson",
    slug: "brent-thomson",
    bold: ["Fantastic quality as always"],
    role: "CEO/Founder @ Validate",
  },
  {
    rating: 5,
    quote: ["Naeem is very committed and provides excellent job quality. One of the best designers on Upwork!"],
    name: "Michel Fotsing",
    slug: "michel-fotsing",
    bold: ["One of the best designers on Upwork!"],
    logo: true,
    role: "IT Manager @ SkyVue Solutions",
  },
  {
    rating: 5,
    quote: ["Muhammad did excellent work. He made sure to get as much detail about my vision as possible, was easy to work with, accepted critique, and made changes promptly. I would definitely work with him again."],
    name: "Joe Hungerman",
    slug: "joe-hungerman",
    bold: ["excellent work"],
    logo: true,
    role: "Founder/CEO @ SEE/EYE",
  },
  {
    rating: 5,
    quote: ["Naeem understood the job thoroughly. I didn't need to retouch any of his designs except for making some minor changes. He helped us with designing a new product and new landing page for a new item and was extremely helpful."],
    name: "Azim Aziz-Uribe",
    slug: "azim-u",
    bold: ["I didn't need to retouch any of his designs"],
    logo: true,
    role: "Managing Director @ INSIGLOBEX LLC",
  },
  {
    rating: 5,
    quote: ["Naeem worked extremely well under difficult circumstances in terms of delays in client feedback. His Adobe XD designs were thoughtful and well executed and his files were well organized for the development team."],
    name: "Adam Bronstorph",
    slug: "adam-bronstorph",
    bold: ["thoughtful and well executed"],
    logo: true,
    role: "President @ Socimedia",
  },
  {
    rating: 5,
    quote: [
      "Muhammad is a skilled professional and a pleasure to work with. He made himself available to meet our tight schedule and has understood well our complex requirements.",
      "He is disciplined and process-oriented, but also attentive to suggestions/alternatives. Definitely an exception in the landscape of freelancers.",
    ],
    name: "Corrado R.",
    slug: "corrado-ronchi",
    bold: ["disciplined and process-oriented", "an exception in the landscape of freelancers"],
    logo: true,
    role: "CEO @ EISST International Ltd",
  },
  {
    rating: 4.5,
    quote: ["You are the best web expert I have worked with over the years. Thanks for your expert work. We are very happy for the high grade professional work you did. Our project would have failed without you. Thank you so much."],
    name: "Uduak Asuquo",
    slug: "uduak-asuquo",
    bold: ["the best web expert I have worked with"],
    logo: true,
    role: "Operations Excellence & Management Systems @ Seplat Energy Plc",
  },
];
