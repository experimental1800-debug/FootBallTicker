import type { Event } from "./events";

export type HostCityVariant = "star" | "sun" | "burst";

export interface HostCity {
  code: string;
  label: string;
  slug: string;
  fill: string;
  stroke: string;
  variant: HostCityVariant;
  heroName: string;
  stadium: string;
  addressLine1: string;
  addressLine2: string;
  cardAccentFrom: string;
  cardAccentTo: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  photoImageUrl?: string;
  photoImageAlt?: string;
  matchLocations: Array<{
    city: string;
    state: string;
  }>;
}

export const hostCities: HostCity[] = [
  {
    code: "ATL",
    label: "Atlanta, GA",
    slug: "atlanta",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Atlanta",
    stadium: "Mercedes-Benz Stadium",
    addressLine1: "1 Mercedes-Benz Stadium SW,",
    addressLine2: "Atlanta, GA",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#1d4ed8",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/ed41a3ca-6791-4496-ad93-efbd2c1099b7/Cover-ATL.png",
    coverImageAlt: "Atlanta word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/7f324dc4-3f6b-4e89-a535-25efb5aa732b/Photo-ATL.jpg",
    photoImageAlt: "view of Atlanta",
    matchLocations: [{ city: "Atlanta", state: "GA" }],
  },
  {
    code: "BOS",
    label: "Boston, MA",
    slug: "boston",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Boston",
    stadium: "Gillette Stadium",
    addressLine1: "1 Patriot Pl,",
    addressLine2: "Foxborough, MA",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#334155",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/5eb18ecb-b3dc-4125-82fa-a830819189b6/Cover-BOS.png",
    coverImageAlt: "Boston word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/71b08aba-7fb5-4718-b7b3-f869cc212625/Photo-BOS.jpg",
    photoImageAlt: "view of Boston",
    matchLocations: [{ city: "Foxborough", state: "MA" }],
  },
  {
    code: "DAL",
    label: "Dallas, TX",
    slug: "dallas",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Dallas",
    stadium: "AT&T Stadium",
    addressLine1: "1 AT&T Way,",
    addressLine2: "Arlington, TX",
    cardAccentFrom: "#082f49",
    cardAccentTo: "#1d4ed8",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/b6539874-e27e-40b4-b455-c732772cc1b5/Cover-DAL.png",
    coverImageAlt: "Dallas word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/ef42fbbc-719b-44bb-9ca4-e3fb277d5fe9/Photo-DAL.jpg",
    photoImageAlt: "view of Dallas",
    matchLocations: [{ city: "Arlington", state: "TX" }],
  },
  {
    code: "GUA",
    label: "Guadalajara, Mexico",
    slug: "guadalajara",
    fill: "#9BC244",
    stroke: "#789A3C",
    variant: "sun",
    heroName: "Guadalajara",
    stadium: "Estadio Akron",
    addressLine1: "Av. Circuito JVC 2800,",
    addressLine2: "Zapopan, Jalisco",
    cardAccentFrom: "#3f6212",
    cardAccentTo: "#84cc16",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/2d21ad3c-2400-44a0-8a8d-b275e465e054/Cover-GUA.png",
    coverImageAlt: "Guadalajara word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/efa1e8f5-ae5a-489e-b69b-8570f0707ed3/Photo-GUA.jpg",
    photoImageAlt: "view of Guadalajara",
    matchLocations: [{ city: "Guadalajara", state: "MX" }],
  },
  {
    code: "HOU",
    label: "Houston, TX",
    slug: "houston",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Houston",
    stadium: "NRG Stadium",
    addressLine1: "1 NRG Pkwy,",
    addressLine2: "Houston, TX",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#0891b2",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/f20b416f-f7f1-43f8-9bb6-54ca3a0adf35/Cover-HOU.png",
    coverImageAlt: "Houston word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/bd265b39-7b99-435c-ae31-05910402b3ec/Photo-HOU.jpg",
    photoImageAlt: "view of Houston",
    matchLocations: [{ city: "Houston", state: "TX" }],
  },
  {
    code: "KC",
    label: "Kansas City, MO",
    slug: "kansas-city",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Kansas City",
    stadium: "GEHA Field at Arrowhead Stadium",
    addressLine1: "1 Arrowhead Dr,",
    addressLine2: "Kansas City, MO",
    cardAccentFrom: "#111827",
    cardAccentTo: "#2563eb",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/1431146c-72c8-44cd-ae47-f027eb26fa91/Cover-KC.png",
    coverImageAlt: "Kansas City word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/70a7d7cd-0081-4f65-ba35-8f897d09f98d/Photo-KAN.jpg",
    photoImageAlt: "view of Kansas City",
    matchLocations: [{ city: "Kansas City", state: "MO" }],
  },
  {
    code: "LA",
    label: "Los Angeles, CA",
    slug: "los-angeles",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Los Angeles",
    stadium: "SoFi Stadium",
    addressLine1: "1001 Stadium Dr,",
    addressLine2: "Inglewood, CA",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#7c3aed",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/7a5b3192-59d0-4f18-9b92-d76061c545f5/Cover-LA.png",
    coverImageAlt: "Los Angeles word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/3289117d-8746-46a2-b0da-a8175cbd8c01/Photo-LA.jpg",
    photoImageAlt: "view of Los Angeles",
    matchLocations: [{ city: "Los Angeles", state: "CA" }],
  },
  {
    code: "MEX",
    label: "Mexico City, Mexico",
    slug: "mexico-city",
    fill: "#9BC244",
    stroke: "#789A3C",
    variant: "sun",
    heroName: "Mexico City",
    stadium: "Estadio Azteca",
    addressLine1: "Calz. de Tlalpan 3465,",
    addressLine2: "Mexico City, Mexico",
    cardAccentFrom: "#3f6212",
    cardAccentTo: "#16a34a",
    coverImageUrl:
      "https://seatgeek.com/images/image_uploads/2ae64886-9a85-44f8-ab30-789214fc2ff4/Cover-CDMX.png",
    coverImageAlt: "Mexico City word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeek.com/images/image_uploads/4e092067-42f3-4a23-ad21-1b7360f95e26/Photo-MEX.jpg",
    photoImageAlt: "view of Mexico City",
    matchLocations: [{ city: "Mexico City", state: "MX" }],
  },
  {
    code: "MIA",
    label: "Miami, FL",
    slug: "miami",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Miami",
    stadium: "Hard Rock Stadium",
    addressLine1: "347 Don Shula Dr,",
    addressLine2: "Miami Gardens, FL",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#0ea5e9",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/e8487a61-5eb5-407a-a9b7-2a087a1965a0/Cover-MIA.png?auto=webp&width=384&quality=75",
    coverImageAlt: "Miami word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/76efaa37-2eb4-44ed-8987-6805d486faad/Photo-MIA.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of Miami",
    matchLocations: [{ city: "Miami Gardens", state: "FL" }],
  },
  {
    code: "MON",
    label: "Monterrey, Mexico",
    slug: "monterrey",
    fill: "#9BC244",
    stroke: "#789A3C",
    variant: "sun",
    heroName: "Monterrey",
    stadium: "Estadio BBVA",
    addressLine1: "Av. Pablo Livas 2011,",
    addressLine2: "Guadalupe, Nuevo Leon",
    cardAccentFrom: "#365314",
    cardAccentTo: "#65a30d",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/75a2d6ff-bf44-44a6-8e66-b72d377bf045/Cover-MON.png?auto=webp&width=384&quality=75",
    coverImageAlt: "Monterrey word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/f226a7dd-806e-416c-8ade-98991714b676/Photo-MON.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of Monterrey",
    matchLocations: [{ city: "Monterrey", state: "MX" }],
  },
  {
    code: "NYNJ",
    label: "New York / New Jersey",
    slug: "new-york-new-jersey",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "New York / New Jersey",
    stadium: "MetLife Stadium",
    addressLine1: "1 MetLife Stadium Dr,",
    addressLine2: "East Rutherford, NJ",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#1d4ed8",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/fe1a2d3f-2ca4-47ad-81e3-f1b7c20a69f5/Cover-NYNJ.png?auto=webp&width=384&quality=75",
    coverImageAlt: "New York word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/0a7a1421-2b9d-4a43-93b0-09c03f87e95b/Photo-NY.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of New York",
    matchLocations: [{ city: "East Rutherford", state: "NJ" }],
  },
  {
    code: "PHI",
    label: "Philadelphia, PA",
    slug: "philadelphia",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Philadelphia",
    stadium: "Lincoln Financial Field",
    addressLine1: "1 Lincoln Financial Field Way,",
    addressLine2: "Philadelphia, PA",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#475569",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/03e2e520-35b4-48b8-bd55-f62780df8d10/Cover-PHI.png?auto=webp&width=384&quality=75",
    coverImageAlt: "Philadelphia word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/1c6ec495-494e-4284-8bf9-427519aba9d9/Photo-PHI.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of Philadelphia",
    matchLocations: [{ city: "Philadelphia", state: "PA" }],
  },
  {
    code: "SF",
    label: "San Francisco, CA",
    slug: "san-francisco",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "San Francisco",
    stadium: "Levi's Stadium",
    addressLine1: "4900 Marie P. DeBartolo Way,",
    addressLine2: "Santa Clara, CA",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#0369a1",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/7c94648d-c5e5-4a86-9caf-0e5ebd95c4c3/Cover-SF.png?auto=webp&width=384&quality=75",
    coverImageAlt: "San Francisco word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/551a1a6e-7be1-455d-8d92-70120de4c445/Photo-SF.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of San Francisco",
    matchLocations: [{ city: "Santa Clara", state: "CA" }],
  },
  {
    code: "SEA",
    label: "Seattle, WA",
    slug: "seattle",
    fill: "#50B4D2",
    stroke: "#2978A1",
    variant: "star",
    heroName: "Seattle",
    stadium: "Lumen Field",
    addressLine1: "800 Occidental Ave S,",
    addressLine2: "Seattle, WA",
    cardAccentFrom: "#0f172a",
    cardAccentTo: "#0f766e",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/dec9bfee-4229-46a0-a4dc-d81c77d55e72/Cover-SEA.png?auto=webp&width=384&quality=75",
    coverImageAlt: "Seattle word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/4bd40dbe-8160-4b4f-a780-6f43f44ab354/Photo-SEA.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of Seattle",
    matchLocations: [{ city: "Seattle", state: "WA" }],
  },
  {
    code: "TOR",
    label: "Toronto, ON",
    slug: "toronto",
    fill: "#E35A4F",
    stroke: "#B13D35",
    variant: "burst",
    heroName: "Toronto",
    stadium: "BMO Field",
    addressLine1: "170 Princes' Blvd,",
    addressLine2: "Toronto, ON",
    cardAccentFrom: "#7f1d1d",
    cardAccentTo: "#dc2626",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/ae8bc279-bb6a-494b-866c-230252dd8fb4/Cover-TOR.png?auto=webp&width=384&quality=75",
    coverImageAlt: "Toronto word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/6a4787a8-cbf8-413f-bb0d-ae35293c0e4b/Photo-TOR.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of Toronto",
    matchLocations: [{ city: "Toronto", state: "ON" }],
  },
  {
    code: "VAN",
    label: "Vancouver, BC",
    slug: "vancouver",
    fill: "#E35A4F",
    stroke: "#B13D35",
    variant: "burst",
    heroName: "Vancouver",
    stadium: "BC Place",
    addressLine1: "777 Pacific Blvd,",
    addressLine2: "Vancouver, BC",
    cardAccentFrom: "#7f1d1d",
    cardAccentTo: "#ef4444",
    coverImageUrl:
      "https://seatgeekimages.com/image_uploads/74b6cea9-c57d-472b-aed9-6f0444e33cfa/Cover-VAN.png?auto=webp&width=384&quality=75",
    coverImageAlt: "Vancouver word mark world cup 2026 logo",
    photoImageUrl:
      "https://seatgeekimages.com/image_uploads/616dc398-942a-45d4-88bc-c175b9154e1f/Photo-VAN.jpg?auto=webp&width=384&quality=75",
    photoImageAlt: "view of Vancouver",
    matchLocations: [{ city: "Vancouver", state: "BC" }],
  },
];

export function getHostCityHref(slug: string) {
  return `/fifa-world-cup-city-tickets/${slug}`;
}

export function getHostCityByPath(pathname: string) {
  return hostCities.find((city) => getHostCityHref(city.slug) === pathname);
}

export function eventMatchesHostCity(city: HostCity, event: Pick<Event, "city" | "state">) {
  return city.matchLocations.some(
    (location) => location.city === event.city && location.state === event.state
  );
}
