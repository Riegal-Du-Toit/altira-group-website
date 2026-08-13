"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CodeIcon,
  GlobeIcon,
  LayersIcon,
  UserPlusIcon,
  Users,
  Star,
  FileText,
  Shield,
  RotateCcw,
  Handshake,
  Leaf,
  HelpCircle,
  DollarSign,
  BarChart,
  PlugIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  type NavItemType,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
  NavItemMobile,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const productLinks: NavItemType[] = [
  {
    title: "Medical Insurance",
    href: "#products",
    description: "Primary protection products built around household resilience.",
    icon: GlobeIcon,
  },
  {
    title: "Funeral Insurance",
    href: "#products",
    description: "Dignified cover designed for speed, clarity and family support.",
    icon: LayersIcon,
  },
  {
    title: "Personal Loans",
    href: "#products",
    description: "Transparent short-term credit designed for real household cash-flow needs.",
    icon: UserPlusIcon,
  },
  {
    title: "Product Portfolio",
    href: "#products",
    icon: BarChart,
    description: "Review the full three-product stack in one coherent model.",
  },
  {
    title: "Partner-Led Model",
    href: "#why",
    icon: PlugIcon,
    description: "See how Altira aligns distribution with trusted specialist partners.",
  },
  {
    title: "Five-Stage Method",
    href: "#method",
    icon: DollarSign,
    description: "Follow the sequence from discovery to premium partner delivery.",
  },
  {
    title: "Regional Footprint",
    href: "#offices",
    icon: Shield,
    description: "Explore the operating footprint behind delivery and support.",
  },
  {
    title: "Orbit Engine",
    href: "#integrations",
    icon: CodeIcon,
    description: "See the partner and platform layer behind Altira's premium solutions.",
  },
];

export const companyLinks: NavItemType[] = [
  {
    title: "Why Altira Group",
    href: "#why",
    description: "See how Altira combines products, partners and distribution.",
    icon: Users,
  },
  {
    title: "Regional Footprint",
    href: "#offices",
    description: "Explore the connected presence behind the operating model.",
    icon: Star,
  },
  {
    title: "Connected Footprint",
    href: "#why",
    description: "What the multi-market partner model unlocks.",
    icon: FileText,
  },
  {
    title: "Five-Stage Method",
    href: "#method",
    description: "The disciplined process used from insight to execution.",
    icon: Shield,
  },
  {
    title: "Orbit Engine",
    href: "#integrations",
    description: "Altira's technology layer for orchestrating top-tier partners.",
    icon: RotateCcw,
  },
  {
    title: "Cape Town HQ",
    href: "#offices",
    icon: Handshake,
    description: "Headquarters for leadership, partner strategy and market coordination.",
  },
  {
    title: "Johannesburg Operations",
    href: "#offices",
    icon: Leaf,
    description: "Operational support and partner coordination across South Africa.",
  },
  {
    title: "Cebu Support Centre",
    href: "#offices",
    icon: HelpCircle,
    description: "Regional support services that strengthen cross-market delivery.",
  },
  {
    title: "Join the Experience",
    href: "#app-experience",
    icon: HelpCircle,
    description: "Enter the premium member experience and begin guided onboarding.",
  },
];

export function SiteHeader() {
  const [hideOnFooter, setHideOnFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("[data-site-footer]");
    if (!(footer instanceof HTMLElement)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnFooter(entry?.isIntersecting ?? false);
      },
      { threshold: 0.12 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-site-header
      className={cn(
        "fixed inset-x-0 top-4 z-50 w-full px-4 transition-all duration-300",
        hideOnFooter ? "pointer-events-none opacity-0 -translate-y-4" : "pointer-events-none opacity-100 translate-y-0",
      )}
      style={
        {
          "--background": "#0b0b0c",
          "--foreground": "#f5f5f5",
          "--muted": "#141517",
          "--muted-foreground": "#a1a1aa",
          "--accent": "#17181b",
          "--accent-foreground": "#ffffff",
          "--border": "rgba(120,120,120,0.42)",
          "--input": "rgba(120,120,120,0.42)",
          "--ring": "rgba(255,255,255,0.18)",
          "--secondary": "#18191c",
          "--secondary-foreground": "#f5f5f5",
          "--popover-foreground": "#f5f5f5",
          "--primary": "#ffffff",
          "--primary-foreground": "#0b0b0c",
          color: "#f5f5f5",
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-auto bg-background/95 mx-auto h-14 w-full max-w-[58rem] rounded-xl border-[0.5px] border-[#787878]/45 px-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <div className="relative flex h-full items-center justify-between">
          <a href="#home" className="relative z-10 flex items-center gap-2.5">
            <Image
              src="/favicon.png"
              alt="Altira Group favicon"
              width={24}
              height={24}
              className="size-6 rounded-sm object-cover"
              priority
            />
            <p className="font-mono text-lg font-bold">ALTIRA GROUP</p>
          </a>

          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
            <DesktopMenu />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <Button asChild>
              <a href="#app-experience">Join the experience</a>
            </Button>
            <MoileNav />
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopMenu() {
  return (
    <NavigationMenu
      viewport={false}
      className="pointer-events-auto hidden lg:flex lg:w-full lg:justify-center"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-full md:w-[56rem] md:grid-cols-[minmax(0,1fr)_13.5rem]">
              <ul className="grid grow gap-4 p-4 md:grid-cols-3 md:border-r-[0.5px] md:border-r-[#787878]/45">
                {productLinks.slice(0, 3).map((link) => (
                  <li key={link.title}>
                    <NavGridCard link={link} />
                  </li>
                ))}
              </ul>
              <ul className="space-y-1 p-4">
                {productLinks.slice(3).map((link) => (
                  <li key={link.title}>
                    <NavSmallItem
                      item={link}
                      href={link.href}
                      className="gap-x-1"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-full md:w-[58rem] md:grid-cols-[minmax(0,1fr)_14rem]">
              <ul className="grid grow grid-cols-2 gap-4 p-4 md:border-r-[0.5px] md:border-r-[#787878]/45">
                {companyLinks.slice(0, 2).map((link) => (
                  <li key={link.title}>
                    <NavGridCard link={link} className="min-h-36" />
                  </li>
                ))}
                <li className="col-span-2 list-none">
                  <ul className="grid grid-cols-3 gap-x-4">
                    {companyLinks.slice(2, 5).map((link) => (
                      <li key={link.title}>
                        <NavLargeItem href={link.href} link={link} />
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <ul className="space-y-2 p-4">
                {companyLinks.slice(5, 10).map((link) => (
                  <li key={link.title}>
                    <NavLargeItem href={link.href} link={link} />
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="cursor-pointer">
            <a href="#integrations">Orbit Engine</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MoileNav() {
  const sections = [
    {
      id: "overview",
      name: "Overview",
      list: [
        { title: "Home", href: "#home", description: "Return to the hero section." },
        { title: "Why Altira Group", href: "#why", description: "See the premium partner-led model." },
        { title: "Products", href: "#products", description: "Browse the three-product portfolio." },
        { title: "Method", href: "#method", description: "Review the five-stage process." },
        { title: "Offices", href: "#offices", description: "View the regional footprint." },
        { title: "Orbit Engine", href: "#integrations", description: "See the partner and platform layer." },
        { title: "Join the Experience", href: "#app-experience", description: "Enter guided onboarding." },
      ],
    },
    {
      id: "product",
      name: "Product",
      list: productLinks,
    },
    {
      id: "company",
      name: "Company",
      list: companyLinks,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full lg:hidden">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-background/95 supports-[backdrop-filter]:bg-background/80 w-full gap-0 backdrop-blur-lg"
        showClose={false}
      >
        <div className="flex h-14 items-center justify-end border-b px-4">
          <SheetClose asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>
        <div className="container grid gap-y-2 overflow-y-auto px-4 pt-5 pb-12">
          <Accordion type="single" collapsible>
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="capitalize hover:no-underline">
                  {section.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-1">
                  <ul className="grid gap-1">
                    {section.list.map((link) => (
                      <li key={`${section.id}-${link.title}`}>
                        <SheetClose asChild>
                          <NavItemMobile item={link} href={link.href} />
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SiteHeader;
