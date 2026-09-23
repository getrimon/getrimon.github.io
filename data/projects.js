/**
 * PROJECT DATA
 * ------------
 * This is the single source of truth for every project shown on the
 * site (home page featured grid, /work.html grid, and project detail
 * pages). Add, remove, reorder, or edit projects by editing this array.
 *
 * Fields:
 *  id, slug        — slug is used in the URL: project.html?p=slug
 *  title, client
 *  category        — must match one of CATEGORIES below for filtering
 *  year
 *  shortDescription — shown on cards
 *  description      — shown at top of detail page
 *  challenge, whatIDid, solution, businessValue[] — case-study sections
 *  technologies[]   — badge list
 *  websiteUrl       — live site, omit/leave "" if none
 *  featured         — true = shown on home page
 *  thumbnail        — image path or URL, 4:3 works best
 *  gallery[]        — extra image paths/URLs for the detail page
 *  video            — optional MP4 or YouTube/Vimeo URL, omit if none
 */

window.CATEGORIES = [
  "All",
  "Web Development",
  "WordPress",
  "WooCommerce",
  "Automation",
  "AI",
];

window.PROJECTS = [
  {
    id: 1,
    slug: "example-dental-site",
    title: "Bright Smile Dental — Website & Lead System",
    client: "Bright Smile Dental (example)",
    category: "WordPress",
    year: 2025,
    shortDescription:
      "A fast, appointment-focused WordPress site with automated enquiry handling.",
    description:
      "Rebuilt an outdated dental practice website into a fast, appointment-focused experience, then connected form submissions to an automated notification and follow-up workflow.",
    challenge:
      "The old site was slow, hard to update, and enquiries often sat unread for days.",
    whatIDid:
      "Rebuilt the site in WordPress with Elementor, restructured the booking flow, and connected the enquiry form to an automated notification workflow.",
    solution:
      "A clean, mobile-first design focused on booking, paired with instant staff notifications and an automatic reply to every new enquiry.",
    businessValue: [
      "Faster page loads on mobile",
      "Easier enquiry capture",
      "Instant staff notification on new leads",
      "Simple content editing for non-technical staff",
    ],
    technologies: ["WordPress", "Elementor", "PHP", "Automation"],
    websiteUrl: "",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80",
    gallery: [],
    video: "",
  },
  {
    id: 2,
    slug: "example-lead-automation",
    title: "Enquiry-to-Reply Automation",
    client: "Local Service Business (example)",
    category: "Automation",
    year: 2025,
    shortDescription:
      "Connected web forms, WhatsApp, and a spreadsheet CRM into one automated flow.",
    description:
      "Built a lightweight automation layer that takes a website enquiry and moves it through notification, logging, and follow-up without manual steps.",
    challenge:
      "Leads were captured but tracked nowhere consistent, so follow-up was inconsistent.",
    whatIDid:
      "Connected the website form to a spreadsheet-based CRM and set up automated notifications and reminder follow-ups.",
    solution:
      "A simple pipeline: form submission → logged automatically → instant notification → scheduled follow-up reminder.",
    businessValue: [
      "No enquiry gets missed",
      "Faster first response time",
      "Clear follow-up schedule",
      "Owner can see pipeline at a glance",
    ],
    technologies: ["Automation", "Google Sheets", "APIs"],
    websiteUrl: "",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    gallery: [],
    video: "",
  },
  {
    id: 3,
    slug: "example-woocommerce-store",
    title: "WooCommerce Storefront Rebuild",
    client: "E-commerce Client (example)",
    category: "WooCommerce",
    year: 2024,
    shortDescription:
      "Rebuilt a slow storefront for better speed, structure, and checkout usability.",
    description:
      "Restructured a WooCommerce store's product pages, categories, and checkout for better usability and performance.",
    challenge:
      "Slow product pages and a confusing checkout were affecting the customer experience.",
    whatIDid:
      "Optimized images and plugins, restructured category pages, and simplified the checkout steps.",
    solution:
      "A leaner theme setup, optimized assets, and a shorter, clearer checkout flow.",
    businessValue: [
      "Faster product page loads",
      "Clearer product navigation",
      "Simplified checkout steps",
      "Easier catalog management",
    ],
    technologies: ["WordPress", "WooCommerce", "Performance"],
    websiteUrl: "",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    gallery: [],
    video: "",
  },
];

/** Helper: get a project by its slug. */
window.getProjectBySlug = function (slug) {
  return window.PROJECTS.find((p) => p.slug === slug);
};
