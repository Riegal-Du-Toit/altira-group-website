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
  markerOffset?: {
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
    description: "Altira Group's principal office and coordination hub.",
    coordinates: [-33.9249, 18.4241],
    labelOffset: {
      x: 9,
      y: 0,
    },
    markerOffset: {
      x: 0,
      y: 0,
    },
    labelAlign: "left",
  },
  {
    id: "johannesburg",
    name: "Johannesburg",
    country: "South Africa",
    role: "Operations",
    roleLabel: "Operations",
    region: "Africa",
    description: "Our operations and partner delivery hub.",
    coordinates: [-26.2041, 28.0473],
    labelOffset: {
      x: 42,
      y: 0,
    },
    markerOffset: {
      x: -10,
      y: -35,
    },
    labelAlign: "right",
  },
  {
    id: "philippines",
    name: "CarCar",
    country: "Philippines",
    role: "Technology & Development",
    roleLabel: "Technology & Development",
    region: "Asia",
    description: "Our specialist technology and development hub.",
    coordinates: [10.31619, 123.89082],
    labelOffset: {
      x: 42,
      y: 0,
    },
    markerOffset: {
      x: 0,
      y: 0,
    },
    labelAlign: "right",
  },
];
