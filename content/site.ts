export const site = {
  name: "Carelli Properties",
  tagline: "Two small flats to rent in St John's, Worcester. Rented direct from your landlady.",
  email: "carelliproperties@gmail.com",
  whatsappNumber: "447470303576",
  whatsappDisplay: "07470 303576",
  address: "Oldbury Road, Worcester, WR2 6AR",
  area: "St John's, Worcester",
  landlordFirstName: "Carole",
  adminFirstName: "Matthew",
  adminPreferred: "Matt",
  noAgencyFees: true,
};

export type Apartment = {
  id: "88a" | "88b";
  label: string;
  path: string;
  rentPcm: number;
  deposit: string;
  depositBasis: string;
  availableFrom: string;
  furnished: string;
  epc: string;
  epcNote?: string;
  councilTaxBand: string;
  bills: string;
  summary: string;
  sleeps: string;
  heroAlt: string;
  photos: {
    hero: string;
    gallery: { src: string; alt: string }[];
  };
  placeholder: boolean;
};

export const apartments: Apartment[] = [
  {
    id: "88a",
    label: "Flat 88A",
    path: "/apartments/88a",
    rentPcm: 600,
    deposit: "692.31",
    depositBasis: "Five weeks' rent, the legal maximum for this rent level. Held in the Deposit Protection Service.",
    availableFrom: "1 December 2026",
    furnished: "Furnished",
    epc: "C",
    councilTaxBand: "Band A",
    bills: "Bills are not included. You pay your own council tax, energy and water.",
    summary:
      "A compact furnished flat for one person, or two who like each other very much. Quiet, freshly decorated, and easy to run.",
    sleeps: "Comfortable for one. Workable for two. The bed space suits a small double.",
    heroAlt: "The living area, with duck egg panelling and an open door to the patio",
    photos: {
      hero: "/photos/hero-living.jpg",
      gallery: [
        { src: "/photos/living-screen.jpg", alt: "The glazed screen between the living area and the kitchen, painted duck egg, with a brass pendant light" },
        { src: "/photos/hall.jpg", alt: "The hallway, with white doors and a duck egg panel" },
        { src: "/photos/kitchenette.jpg", alt: "The kitchenette, with a solid plate hob, extractor and undercounter fridge" },
        { src: "/photos/bathroom-wide.jpg", alt: "The bathroom, with geometric vinyl flooring, a wc and a frosted window" },
        { src: "/photos/basin-mirror.jpg", alt: "The bathroom basin, with a round mirror above" },
      ],
    },
    placeholder: true,
  },
  {
    id: "88b",
    label: "Flat 88B",
    path: "/apartments/88b",
    rentPcm: 600,
    deposit: "692.31",
    depositBasis: "Five weeks' rent, the legal maximum for this rent level. Held in the Deposit Protection Service.",
    availableFrom: "1 December 2026",
    furnished: "Furnished",
    epc: "C",
    epcNote: "Assessed before the new windows were fitted.",
    councilTaxBand: "Band A",
    bills: "Bills are not included. You pay your own council tax, energy and water.",
    summary:
      "A compact furnished flat with its own front door and a brick-built quiet of its own. Freshly decorated, with new windows.",
    sleeps: "Comfortable for one. Workable for two. The bed space suits a small double.",
    heroAlt: "The front door of 88B Oldbury Road, a red brick home with a white door",
    photos: {
      hero: "/photos/exterior-88b.jpg",
      gallery: [
        { src: "/photos/hero-living.jpg", alt: "The living area, with duck egg panelling and an open door to the patio" },
        { src: "/photos/living-screen.jpg", alt: "The glazed screen between the living area and the kitchen, painted duck egg, with a brass pendant light" },
        { src: "/photos/kitchenette.jpg", alt: "The kitchenette, with a solid plate hob, extractor and undercounter fridge" },
        { src: "/photos/bathroom-wide.jpg", alt: "The bathroom, with geometric vinyl flooring, a wc and a frosted window" },
      ],
    },
    placeholder: true,
  },
];

export const nav = [
  { href: "/apartments", label: "The Apartments" },
  { href: "/area", label: "The Area" },
  { href: "/good-to-know", label: "Good To Know" },
  { href: "/contact", label: "Contact" },
];

export const money = (pcm: number) =>
  `£${pcm.toLocaleString("en-GB")} per calendar month`;
