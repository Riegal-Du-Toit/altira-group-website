'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { GlobeIcon, InstagramIcon, Link, LinkedinIcon, X } from 'lucide-react';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';

interface FooterColumn {
	label: string;
	links: Array<{
		title: string;
		href: string;
	}>;
}

const footerColumns: FooterColumn[] = [
	{
		label: 'Overview',
		links: [
			{ title: 'Home', href: '#home' },
			{ title: 'Why Altira Group', href: '#why' },
			{ title: 'Orbit Engine', href: '#integrations' },
		],
	},
	{
		label: 'Products',
		links: [
			{ title: 'Medical Insurance', href: '#products' },
			{ title: 'Funeral Insurance', href: '#products' },
			{ title: 'Personal Loans', href: '#products' },
		],
	},
	{
		label: 'Model',
		links: [
			{ title: 'Partner-Led Distribution', href: '#why' },
			{ title: 'Five-Stage Methodology', href: '#method' },
			{ title: 'Regional Support', href: '#offices' },
		],
	},
	{
		label: 'Locations',
		links: [
			{ title: 'Cape Town HQ', href: '#offices' },
			{ title: 'Johannesburg Operations', href: '#offices' },
			{ title: 'Cebu Support Centre', href: '#offices' },
		],
	},
];

const socialLinks = [
	{ icon: LinkedinIcon, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
	{ icon: InstagramIcon, href: 'https://www.instagram.com/', label: 'Instagram' },
	{ icon: X, href: 'https://x.com/', label: 'X' },
	{ icon: Link, href: 'https://altiragroup.co.za/', label: 'Website' },
];

function FooterCalendar() {
	useEffect(() => {
		(async function () {
			const cal = await getCalApi({ namespace: 'testy' });
			cal('ui', {
				theme: 'dark',
				cssVarsPerTheme: {
					light: { 'cal-brand': '#0099FF' },
					dark: { 'cal-brand': '#fafafa' },
				},
				hideEventTypeDetails: false,
				layout: 'month_view',
			});
		})();
	}, []);

	return (
		<Cal
			namespace="testy"
			calLink="aiforeverymind/testy"
			style={{ width: '100%', height: '100%', overflow: 'scroll' }}
			config={{
				layout: 'month_view',
				useSlotsViewOnSmallScreen: 'true',
				theme: 'dark',
			}}
		/>
	);
}

export function Footer({ leftSlot }: { leftSlot?: ReactNode }) {
	return (
		<footer
			data-site-footer
			className="bg-[#1E2021] px-4 pb-8 pt-16 text-white sm:px-6 lg:px-8"
		>
			<div className="mx-auto w-full max-w-[1720px]">
				<div className="relative min-h-[38rem] w-full overflow-hidden rounded-[1.6rem] border border-[#3FE9EC]/55 bg-[#07090a] px-6 pb-12 pt-9 shadow-[0_0_0_1px_rgba(63,233,236,0.08),0_28px_90px_rgba(0,0,0,0.44),0_0_80px_rgba(63,233,236,0.08)] sm:px-8 lg:px-10">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(63,233,236,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.045),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.024),transparent_42%)]" />
					<div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#3FE9EC]/90 to-transparent" />

					<div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(210px,0.25fr)_max-content_minmax(420px,1fr)] lg:items-start lg:justify-start lg:gap-x-12">
						<div className="space-y-6">
							<div className="flex items-center gap-3">
								<Image
									src="/favicon.png"
									alt="Altira Group favicon"
									width={32}
									height={32}
									className="h-8 w-8 object-contain"
									draggable={false}
								/>
								<span className="text-[1.45rem] font-semibold tracking-[-0.03em] text-white">
									Altira Group
								</span>
							</div>

							<p className="max-w-[16rem] text-sm font-medium leading-7 text-white/58">
								Premium member experience, powered by the Altira Orbit Engine.
							</p>

							<div className="flex items-center gap-2.5">
								{socialLinks.map(({ icon: Icon, href, label }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3FE9EC]/70 hover:bg-[#3FE9EC]/12 hover:text-[#3FE9EC]"
									>
										<Icon className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" />
									</a>
								))}
							</div>

							{leftSlot ? <div className="pt-4">{leftSlot}</div> : null}
						</div>

						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(2,max-content)] lg:justify-start lg:gap-x-16 lg:gap-y-9">
							{footerColumns.map((column) => (
								<div key={column.label}>
									<h3 className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-[#3FE9EC]/72">
										{column.label}
									</h3>
									<ul className="mt-5 space-y-3.5">
										{column.links.map((link) => (
											<li key={link.title}>
												<a
													href={link.href}
													className="text-sm font-medium text-white/78 transition-colors duration-200 hover:text-[#3FE9EC]"
												>
													{link.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>

						<div className="relative h-[22rem] overflow-hidden rounded-[1.1rem] border border-[#3FE9EC]/48 bg-black/45 shadow-[inset_0_1px_0_rgba(63,233,236,0.16),0_18px_60px_rgba(0,0,0,0.26),0_0_32px_rgba(63,233,236,0.07)]">
							<div className="pointer-events-none absolute inset-0 z-10 rounded-[1.1rem] ring-1 ring-inset ring-[#3FE9EC]/22" />
							<FooterCalendar />
						</div>
					</div>

					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[20%] select-none text-center text-[clamp(5rem,16vw,16rem)] font-semibold tracking-[-0.09em] text-white/8"
						aria-hidden="true"
					>
						ALTIRA GROUP
					</div>

					<div className="relative z-10 mt-6 flex flex-col gap-6 border-t border-[#3FE9EC]/22 pt-4 text-xs text-white/68 sm:flex-row sm:items-center sm:justify-between">
						<div className="text-white/88">&copy; 2026 Altira Group, Inc.</div>

						<div className="text-center sm:flex-1" />

						<div className="flex items-center gap-2 self-end sm:self-auto">
							<span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#3FE9EC]/50 bg-[#3FE9EC]/15 text-[#3FE9EC]">
								<GlobeIcon className="h-3.5 w-3.5" />
							</span>
							<span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#3FE9EC]/45" />
							<span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/18" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
