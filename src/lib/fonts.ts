import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";

export const openSansThin = Open_Sans({
  weight: "300",
  subsets: ["latin"],
});

export const openSansExtraBold = localFont({
  src: "../../public/OpenSans-ExtraBold (1).ttf",
});

export const meltdown = localFont({
  src: "../../public/Meltdown.ttf",
});

export const headlinesBold = localFont({
  src: "../../public/Headlines-Bold.otf",
});

export const anton = localFont({
  src: "../../public/Anton.ttf",
});
