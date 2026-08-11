'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, MapPinIcon, PhoneIcon } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Products',
		links: [
			{ title: 'Medical Insurance', href: '#products' },
			{ title: 'Funeral Insurance', href: '#products' },
			{ title: 'Personal Loans', href: '#products' },
			{ title: 'Partner-led model', href: '#why' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'Home', href: '#home' },
			{ title: 'Why Altira Group', href: '#why' },
			{ title: 'Methodology', href: '#method' },
			{ title: 'Contact Us', href: '#contact' },
		],
	},
	{
		label: 'Locations',
		links: [
			{ title: 'Cape Town', href: '#offices' },
			{ title: 'Durban', href: '#offices' },
			{ title: 'Cebu City', href: '#offices' },
			{ title: 'Regional presence', href: '#offices' },
		],
	},
	{
		label: 'Contact',
		links: [
			{ title: 'info@altiragroup.co.za', href: 'mailto:info@altiragroup.co.za', icon: Mail },
			{ title: '+27 21 000 0000', href: 'tel:+27210000000', icon: PhoneIcon },
			{ title: 'Constantia, Cape Town', href: '#contact', icon: MapPinIcon },
			{ title: 'Start a conversation', href: '#contact' },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-t-[2rem] border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-6 py-12 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.18)] md:rounded-t-[3rem] lg:py-16">
			<div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/favicon.png"
						alt="Altira Group favicon"
						className="size-8 object-contain"
						draggable={false}
					/>
					<p className="mt-8 text-sm text-white/58 md:mt-0">
						&copy; {new Date().getFullYear()} Altira Group. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs uppercase tracking-[0.16em] text-white/88">{section.label}</h3>
								<ul className="mt-4 space-y-2 text-sm text-white/56">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="inline-flex items-center transition-all duration-300 hover:text-[#3FE9EC]"
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
