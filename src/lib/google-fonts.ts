import { Open_Sans, Poppins } from "next/font/google";

export const openSansThin = Open_Sans({
  weight: "300",
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
