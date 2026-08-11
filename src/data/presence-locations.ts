export interface PresenceLocation {
  id: string;
  name: string;
  country: string;
  role: string;
  roleLabel: string;
  region: "Africa" | "Asia";
  description: string;
  coordinates: [number, number];
  labelOffset: {
    x: number;
    y: number;
  };
  labelAlign?: "left" | "right";
}

export const presenceLocations: PresenceLocation[] = [
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    role: "Head Office",
    roleLabel: "Head Office",
    region: "Africa",
    description:
      "Cape Town serves as Altira Group's principal office and central coordination point for the broader business.",
    coordinates: [-33.9249, 18.4241],
    labelOffset: {
      x: 14,
      y: 0,
    },
    labelAlign: "left",
  },
  {
    id: "durban",
    name: "Durban",
    country: "South Africa",
    role: "Operations",
    roleLabel: "Operations",
    region: "Africa",
    description:
      "Durban supports operational activity and delivery within South Africa across the group's growing footprint.",
    coordinates: [-29.8587, 31.0218],
    labelOffset: {
      x: 42,
      y: 0,
    },
    labelAlign: "right",
  },
  {
    id: "cebu-city",
    name: "Cebu City",
    country: "Philippines",
    role: "Regional Support Centre",
    roleLabel: "Regional Support",
    region: "Asia",
    description:
      "Cebu City provides regional support services that strengthen operational delivery and collaboration across our international teams.",
    coordinates: [10.31619, 123.89082],
    labelOffset: {
      x: 42,
      y: 0,
    },
    labelAlign: "right",
  },
];
