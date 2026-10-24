export const SECTION_DEFS = [
  {
    key: 'home',
    label: 'Hero / Home',
    defaultHeading: 'Wholesale Used Clothing Supplier & Exporter in UAE',
    defaultBody: 'Usman Global F.Z.C. sources pre-owned clothing and textile collections from Europe, the UK, Australia, the GCC and other markets, then sorts, grades and packs them in our UAE facilities for wholesale export to Africa, Asia and worldwide destinations.',
  },
  {
    key: 'about',
    label: 'About Company',
    defaultHeading: 'Large-Scale Used Clothing Sorting & Export Network',
    defaultBody: 'With 35+ years of industry experience, Usman Global F.Z.C. operates large-scale sorting and export facilities in the UAE, supported by operations in Pakistan, Malaysia and Turkey. Our teams grade used clothing, shoes, bags and other reusable goods for consistent wholesale export.',
  },
  {
    key: 'directors',
    label: 'Directors',
    defaultHeading: 'Meet Our Directors',
    defaultBody: 'The experienced leadership guiding Usman Global F.Z.C. with decades of combined expertise in used clothing sourcing, sorting, wholesale trade and international export.',
  },
  {
    key: 'products',
    label: 'Products',
    defaultHeading: 'Wholesale Used Clothing, Shoes, Bags & More',
    defaultBody: 'Source professionally sorted used clothing bales, used shoes, handbags, belts, toys, vintage apparel and recyclable textiles in grades matched to the needs of different wholesale and resale markets.',
  },
  {
    key: 'sorting',
    label: 'Process / Sorting',
    defaultHeading: 'Used Clothing Sorting, Grading & Export Process',
    defaultBody: 'From collection and first sorting to repair, recycling, fine grading, bale packing and container loading, our process is built to recover value from textiles and prepare consistent, export-ready wholesale shipments.',
  },
  {
    key: 'why',
    label: 'Why Choose Us',
    defaultHeading: 'Why Global Buyers Choose Usman Global',
    defaultBody: 'Large-scale sourcing, consistent grading, high-capacity UAE processing, export-ready packing and established logistics for wholesale used clothing buyers across Africa, Asia, the Middle East and other markets.',
  },
  {
    key: 'global',
    label: 'World Map / Global',
    defaultHeading: 'Used Clothing Supply & Export Across Global Markets',
    defaultBody: 'From our UAE hub and operations in Pakistan, Malaysia and Mersin, Turkey, Usman Global serves wholesale buyers across Africa, South Asia, the Middle East and other international markets, supported by a broad sourcing network across the GCC, Europe, the UK and Australia.',
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    defaultHeading: 'Genuine Testimonials',
    defaultBody: 'Feedback from international buyers who value Usman Global’s product consistency, grading, packing, communication and dependable wholesale export service.',
  },
  {
    key: 'contact',
    label: 'Contact',
    defaultHeading: 'Wholesale Used Clothing Inquiry — UAE',
    defaultBody: 'Looking for used clothing bales, shoes, bags or mixed second-hand goods in bulk? Contact Usman Global in Sharjah, UAE for grades, packing options, container quantities and international export support.'
  },
];

export const SECTION_LABELS = SECTION_DEFS.reduce((acc, s) => {
  acc[s.key] = s.label;
  return acc;
}, {});