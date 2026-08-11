'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { GlobeIcon, InstagramIcon, Link, LinkedinIcon, X } from 'lucide-react';
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
			className="bg-[#1E2021] px-4 pb-6 pt-16 text-white sm:px-6 lg:px-8"
		>
			<div className="mx-auto w-full max-w-[1720px]">
				<div className="relative min-h-[38rem] w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#08090b] px-6 pb-12 pt-9 shadow-[0_20px_80px_rgba(0,0,0,0.36)] sm:px-8 lg:px-10">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(63,233,236,0.08),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.04),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.018),transparent_42%)]" />

					<div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(180px,0.24fr)_max-content_minmax(420px,1fr)] lg:items-start lg:justify-start lg:gap-x-10">
						<div className="space-y-5">
							<div className="flex items-center gap-3">
								<img
									src="/favicon.png"
									alt="Altira Group favicon"
									className="h-8 w-8 object-contain"
									draggable={false}
								/>
								<span className="text-[1.45rem] font-semibold tracking-[-0.03em] text-white">
									Altira Group
								</span>
							</div>

							<div className="flex items-center gap-4 text-white/42">
								{socialLinks.map(({ icon: Icon, href, label }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="transition-colors duration-200 hover:text-white"
									>
										<Icon className="h-4 w-4" />
									</a>
								))}
							</div>

							{leftSlot ? <div className="pt-4">{leftSlot}</div> : null}
						</div>

						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(2,max-content)] lg:justify-start lg:gap-x-14 lg:gap-y-8">
							{footerColumns.map((column) => (
								<div key={column.label}>
										<h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-white/46">
										{column.label}
									</h3>
									<ul className="mt-5 space-y-3.5">
										{column.links.map((link) => (
											<li key={link.title}>
												<a
													href={link.href}
													className="text-sm text-white/84 transition-colors duration-200 hover:text-white"
												>
													{link.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>

						<div className="h-[22rem] overflow-hidden rounded-[1.1rem] border border-white/10 bg-black/40">
							<FooterCalendar />
						</div>
					</div>

					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[20%] select-none text-center text-[clamp(5rem,16vw,16rem)] font-semibold tracking-[-0.09em] text-white/8"
						aria-hidden="true"
					>
						ALTIRA GROUP
					</div>

					<div className="relative z-10 mt-6 flex flex-col gap-6 border-t border-white/10 pt-4 text-xs text-white/68 sm:flex-row sm:items-center sm:justify-between">
						<div className="text-white/88">&copy; 2026 Altira Group, Inc.</div>

						<div className="text-center sm:flex-1" />

						<div className="flex items-center gap-2 self-end sm:self-auto">
							<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#4b7dff] text-white">
								<GlobeIcon className="h-3.5 w-3.5" />
							</span>
							<span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/28" />
							<span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/18" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
