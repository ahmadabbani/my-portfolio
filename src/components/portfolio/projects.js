import { projectCatalog } from "./project-catalog";

// Presentation metadata only. All project text comes from the original catalog.
const presentation = {
  "23": {
    "imageWidth": 1200,
    "imageHeight": 591,
    "tone": "mint",
    "imageAlt": "TenMiles agency website with a mint background and an eagle illustration"
  },
  "22": {
    "imageWidth": 1200,
    "imageHeight": 587,
    "tone": "rose",
    "imageAlt": "Monarc cosmetics storefront with monochrome photography and red lipstick"
  },
  "0": {
    "imageWidth": 1366,
    "imageHeight": 584,
    "tone": "slate"
  },
  "1": {
    "imageWidth": 1335,
    "imageHeight": 580,
    "tone": "blue",
    "imageAlt": "Mediaex digital agency homepage with a navy background and yellow typography"
  },
  "2": {
    "imageWidth": 1350,
    "imageHeight": 583,
    "tone": "sand"
  },
  "21": {
    "imageWidth": 1200,
    "imageHeight": 580,
    "tone": "umber"
  },
  "3": {
    "imageWidth": 1366,
    "imageHeight": 586,
    "tone": "blue"
  },
  "4": {
    "imageWidth": 1086,
    "imageHeight": 503,
    "tone": "mint"
  },
  "5": {
    "imageWidth": 1366,
    "imageHeight": 653,
    "tone": "blue"
  },
  "6": {
    "imageWidth": 1345,
    "imageHeight": 589,
    "tone": "mint"
  },
  "7": {
    "imageWidth": 1358,
    "imageHeight": 626,
    "tone": "rose"
  },
  "8": {
    "imageWidth": 1100,
    "imageHeight": 474,
    "tone": "sand"
  },
  "9": {
    "imageWidth": 1366,
    "imageHeight": 587,
    "tone": "blue"
  },
  "10": {
    "imageWidth": 1100,
    "imageHeight": 469,
    "tone": "slate"
  },
  "11": {
    "imageWidth": 1100,
    "imageHeight": 530,
    "tone": "mint"
  },
  "12": {
    "imageWidth": 1366,
    "imageHeight": 640,
    "tone": "umber"
  },
  "13": {
    "imageWidth": 1366,
    "imageHeight": 573,
    "tone": "mint"
  },
  "14": {
    "imageWidth": 1337,
    "imageHeight": 638,
    "tone": "blue"
  },
  "15": {
    "imageWidth": 1338,
    "imageHeight": 575,
    "tone": "rose"
  },
  "16": {
    "imageWidth": 1342,
    "imageHeight": 580,
    "tone": "sand"
  },
  "17": {
    "imageWidth": 1073,
    "imageHeight": 648,
    "tone": "slate"
  },
  "18": {
    "imageWidth": 1078,
    "imageHeight": 631,
    "tone": "sand"
  },
  "19": {
    "imageWidth": 1366,
    "imageHeight": 583,
    "tone": "slate"
  },
  "20": {
    "imageWidth": 1366,
    "imageHeight": 583,
    "tone": "sand"
  }
};
const technologyNames = {
  "shopify.png": "Shopify",
  "liquid.png": "Liquid",
  "calendly.png": "Calendly",
  "react.png": "React",
  "motion.svg": "Framer Motion",
  "supabase.png": "Supabase",
  "nodejs.svg": "Node.js",
  "vercel5.png": "Vercel",
  "railway.png": "Railway",
  "postgres.png": "PostgreSQL",
  "tevello.png": "Tevello",
  "javascript.png": "JavaScript",
  "php.png": "PHP",
  "mysql.png": "MySQL",
  "stripe.svg": "Stripe",
  "tailwind.png": "Tailwind CSS",
  "nextjs.png": "Next.js",
  "express.png": "Express",
  "jwt.png": "JWT",
  "cloudinary.svg": "Cloudinary",
  "html.png": "HTML",
  "css.png": "CSS",
  "bootstrap.png": "Bootstrap",
  "firebase.png": "Firebase",
  "chakra.png": "Chakra UI",
  "strapi.png": "Strapi",
  "clerk.jpg": "Clerk"
};

export const allProjects = projectCatalog.map((project, index) => ({
  id: project.id,
  name: project.title,
  category: project.category,
  description: project.fullDesc,
  summary: project.fullDesc.trim().split(/(?<=\.)\s+/)[0],
  image: project.image,
  imageAlt: `${project.title.trim()} project screenshot`,
  ...presentation[project.id],
  technologies: project.stack.map(asset => technologyNames[asset]),
  url: project.liveUrl.trim() ? (/^https?:\/\//i.test(project.liveUrl.trim()) ? project.liveUrl.trim() : `https://${project.liveUrl.trim()}`) : "",
  number: index + 1,
  type: project.stack.includes("shopify.png") ? "shopify" : /full-stack|^web application$|^ecommerce$/i.test(project.category) ? "applications" : "websites",
}));

export const featuredProjects = [23, 22, 1].map(id => allProjects.find(project => project.id === id));
