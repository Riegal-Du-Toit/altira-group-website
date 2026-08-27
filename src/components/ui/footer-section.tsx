'use client';

import { ArrowLeftIcon, ArrowRightIcon, CircleCheckIcon, GlobeIcon, InstagramIcon, Link, LinkedinIcon, X } from 'lucide-react';
import Image from 'next/image';
import { ReactNode, useMemo, useState } from 'react';

import { Calendar } from '@/components/ui/calendar';

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
			{ title: 'Orbit Engine', href: '#trusted-customers' },
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

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function FooterCalendar() {
	return (
		<div className="grid h-full grid-cols-[minmax(160px,0.42fr)_minmax(240px,0.58fr)] bg-[#111314] text-white">
			<div className="flex flex-col border-r border-white/8 bg-[radial-gradient(circle_at_12%_8%,rgba(63,233,236,0.1),transparent_28%)] p-5">
				<div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3FE9EC]/30 bg-[#3FE9EC]/10 text-[0.68rem] font-black text-[#3FE9EC]">
					A
				</div>
				<div className="mt-4 text-xs font-semibold text-white/42">Altira Group</div>
				<h3 className="mt-2 text-[1.35rem] font-bold tracking-[-0.03em] text-white">
					Member Experience Call
				</h3>
				<p className="mt-3 max-w-[15rem] text-sm leading-6 text-white/58">
					A calm first conversation to understand the member journey and where Altira can help.
				</p>

				<div className="mt-auto space-y-3 pt-5 text-sm text-white/72">
					<div className="flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-[#3FE9EC]" />
						<span>15 min</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
						<span>Video introduction</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-white/42" />
						<span>South Africa</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-[minmax(0,1fr)_minmax(120px,0.34fr)]">
				<div className="p-5">
					<div className="flex items-center justify-between">
						<div className="text-base font-bold text-white">September 2026</div>
						<div className="flex gap-2 text-white/34">
							<span>‹</span>
							<span>›</span>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-7 gap-y-4 text-center">
						{weekDays.map((day) => (
							<div key={day} className="text-[0.62rem] font-black tracking-[0.14em] text-white/74">
								{day}
							</div>
						))}
						{calendarDays.map((day) => (
							<div key={day} className="flex justify-center text-sm text-white/78">
								<span
									className={
										day === 1
											? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#050606] shadow-[0_0_24px_rgba(255,255,255,0.16)]'
											: 'flex h-9 w-9 items-center justify-center rounded-lg transition-colors'
									}
								>
									{day}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="border-l border-white/8 p-5">
					<div className="flex items-center justify-between">
						<div className="font-bold text-white">Tue 01</div>
						<div className="flex rounded-full bg-black/45 p-1 text-[0.68rem] font-bold text-white/48">
							<span className="rounded-full bg-[#3FE9EC]/12 px-2 py-1 text-[#3FE9EC]">12h</span>
							<span className="px-2 py-1">24h</span>
						</div>
					</div>

					<div className="mt-8 rounded-xl border border-dashed border-white/12 bg-white/[0.025] p-4 text-center">
						<div className="text-sm font-semibold text-white/72">No slots selected</div>
						<p className="mt-2 text-xs leading-5 text-white/42">
							Interactive scheduling will be added here later.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

const bookingSlots = ['09:00', '10:30', '13:00', '14:30'];

export function InteractiveFooterCalendar() {
	const today = useMemo(() => {
		const date = new Date();
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}, []);
	const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
	const [date, setDate] = useState(today);
	const [time, setTime] = useState<string | null>(null);
	const bookedDates = useMemo(() => [
		new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
		new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
	], [today]);
	const monthLabel = month.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });
	const dateLabel = date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
	const mailto = `mailto:hello@altiragroup.co.za?subject=${encodeURIComponent(`Member Experience Call — ${dateLabel}${time ? ` at ${time}` : ''}`)}`;

	return (
		<div className="grid h-full grid-cols-[minmax(174px,0.42fr)_minmax(0,0.58fr)] bg-[#111314] text-white">
			<div className="flex flex-col border-r border-white/8 bg-[radial-gradient(circle_at_12%_8%,rgba(63,233,236,0.1),transparent_40%)] p-5">
				<div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3FE9EC]/30 bg-[#3FE9EC]/10 text-[0.68rem] font-black text-[#3FE9EC]">A</div>
				<div className="mt-4 text-xs font-semibold text-white/42">Altira Group</div>
				<h3 className="mt-2 text-[1.25rem] font-bold tracking-[-0.03em] text-white">Member Experience Call</h3>
				<p className="mt-2.5 max-w-[15rem] text-sm leading-5 text-white/58">A focused 15-minute video introduction with the Altira team.</p>
				<div className="mt-auto space-y-2.5 pt-4 text-sm text-white/72">
					<div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#3FE9EC]" />15 min</div>
					<div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />Video introduction</div>
				</div>
			</div>

			<div className="flex min-w-0 flex-col p-4">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2 text-sm font-bold text-white"><GlobeIcon className="h-4 w-4 text-[#3FE9EC]" />{monthLabel}</div>
					<div className="flex gap-1">
						<button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-md p-1 text-white/55 transition hover:bg-white/10 hover:text-white"><ArrowLeftIcon className="h-4 w-4" /></button>
						<button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-md p-1 text-white/55 transition hover:bg-white/10 hover:text-white"><ArrowRightIcon className="h-4 w-4" /></button>
					</div>
				</div>

				<Calendar
					mode="single"
					month={month}
					onMonthChange={setMonth}
					selected={date}
					onSelect={(selectedDate) => {
						if (selectedDate) {
							setDate(selectedDate);
							setTime(null);
						}
					}}
					disabled={[{ before: today }, ...bookedDates]}
					modifiers={{ booked: bookedDates }}
					showOutsideDays={false}
					formatters={{ formatWeekdayName: (day) => day.toLocaleString('en-ZA', { weekday: 'narrow' }) }}
					className="mt-2"
				/>

				<div className="mt-3 border-t border-white/8 pt-2">
					<div className="flex items-center justify-between text-xs"><span className="font-semibold text-white/70">{dateLabel}</span><span className="text-white/38">SAST</span></div>
					<div className="mt-1.5 grid grid-cols-4 gap-1.5">
						{bookingSlots.map((slot) => <button key={slot} type="button" onClick={() => setTime(slot)} className={`rounded-md border px-1 py-1 text-[0.68rem] font-semibold transition ${time === slot ? 'border-[#3FE9EC] bg-[#3FE9EC] text-[#071011]' : 'border-white/10 text-white/68 hover:border-[#3FE9EC]/50 hover:text-white'}`}>{slot}</button>)}
					</div>
					<button type="button" disabled={!time} onClick={() => { window.location.href = mailto; }} className="mt-2 flex w-full items-center justify-center rounded-md bg-white px-3 py-1.5 text-xs font-bold text-[#080909] transition hover:bg-[#3FE9EC] disabled:cursor-not-allowed disabled:bg-white/18 disabled:text-white/38">{time ? `Book ${time}` : 'Choose a time'}</button>
				</div>
			</div>
		</div>
	);
}

export function AppointmentBookingCalendar() {
	const today = useMemo(() => {
		const current = new Date();
		return new Date(current.getFullYear(), current.getMonth(), current.getDate());
	}, []);
	const [date, setDate] = useState<Date | undefined>(today);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const bookedDates = useMemo(() => [
		new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
		new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
	], [today]);
	const dateLabel = date?.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
	const mailto = `mailto:hello@altiragroup.co.za?subject=${encodeURIComponent(`Member Experience Call — ${dateLabel ?? ''}${selectedTime ? ` at ${selectedTime}` : ''}`)}`;

	return (
		<div className="flex h-full flex-col bg-[#202022] text-white">
			<div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
				<div>
					<div className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/48">Altira Group</div>
					<h3 className="mt-1 text-[0.95rem] font-medium">Book your appointment</h3>
				</div>
				<div className="rounded-full border border-white/12 bg-white/[0.045] px-2.5 py-1 text-[0.65rem] font-medium text-white/62">15 min</div>
			</div>

			<div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_8rem]">
				<div className="flex min-w-0 items-center justify-center px-3 py-4">
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						defaultMonth={date}
						disabled={[{ before: today }, ...bookedDates]}
						modifiers={{ booked: bookedDates }}
						showOutsideDays={false}
						formatters={{ formatWeekdayName: (day) => day.toLocaleString('en-ZA', { weekday: 'narrow' }) }}
						classNames={{
							month_caption: 'relative mx-7 mb-0 flex h-6 items-center justify-center',
							caption_label: 'text-[0.78rem] font-semibold',
							button_previous: 'inline-flex size-6 items-center justify-center rounded-md text-white/45 transition hover:bg-white/10 hover:text-white',
							button_next: 'inline-flex size-6 items-center justify-center rounded-md text-white/45 transition hover:bg-white/10 hover:text-white',
							weekday: 'size-6 p-0 text-[0.56rem] font-semibold text-white/38',
							day: 'group size-6 p-0 text-[0.68rem]',
							day_button: 'flex size-6 items-center justify-center rounded-md text-white/74 transition hover:bg-white/10 hover:text-white group-data-[selected]:bg-white group-data-[selected]:font-semibold group-data-[selected]:text-[#171719] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:text-white/16 group-data-[booked]:line-through group-data-[booked]:text-white/25',
							weeks: 'space-y-0',
						}}
					/>
				</div>
				<div className="border-l border-white/8 px-3 py-4">
					<div className="text-[0.68rem] font-medium text-white/52">Available times</div>
					<div className="mt-3 grid gap-2">
						{bookingSlots.map((time) => (
							<button key={time} type="button" onClick={() => setSelectedTime(time)} className={`rounded-md border px-2 py-1.5 text-[0.68rem] font-medium transition ${selectedTime === time ? 'border-white bg-white text-[#171719]' : 'border-white/12 bg-white/[0.025] text-white/62 hover:border-white/30 hover:text-white'}`}>
								{time}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="flex items-center gap-2 border-t border-white/8 px-4 py-3">
				<div className="min-w-0 flex-1 text-[0.68rem] text-white/48">
					{date && selectedTime ? <span className="flex items-center gap-1.5"><CircleCheckIcon className="h-3.5 w-3.5 shrink-0 text-white/82" />{dateLabel}, {selectedTime} SAST</span> : 'Select a date and time.'}
				</div>
				<button type="button" disabled={!date || !selectedTime} onClick={() => { window.location.href = mailto; }} className="shrink-0 rounded-md bg-white px-3 py-1.5 text-[0.68rem] font-semibold text-[#171719] transition hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/30">Continue</button>
			</div>
		</div>
	);
}

export function Footer({ leftSlot, interactiveCalendar = false }: { leftSlot?: ReactNode; interactiveCalendar?: boolean }) {
	return (
		<footer
			data-site-footer
			className="bg-[#1E2021] px-4 pb-8 pt-16 text-white sm:px-6 lg:px-8"
		>
			<div className="mx-auto w-full max-w-[1354px]">
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
							{interactiveCalendar ? <AppointmentBookingCalendar /> : <FooterCalendar />}
						</div>
					</div>

					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex min-h-[10.5rem] select-none items-center justify-center whitespace-nowrap border-t border-white/14 bg-[linear-gradient(180deg,rgba(47,55,67,0.86),rgba(25,29,34,0.78))] px-8 pb-4 pt-6 text-center text-[clamp(2.25rem,calc(6vw-1px),6rem)] font-black uppercase leading-none tracking-[-0.07em] opacity-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.3),0_-18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl"
						aria-hidden="true"
					>
						<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(63,233,236,0.06),transparent_24%,transparent_76%,rgba(63,233,236,0.05)),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_38%)]" />
						<div className="relative flex items-center justify-center">
							<span className="inline-flex items-center justify-center align-baseline">
								<span className="absolute left-0 top-[62%] h-[0.34em] w-[1.42em] rounded-full bg-white/22 blur-xl" />
							<Image
								src="/favicon.png"
								alt=""
								width={120}
								height={120}
								className="relative z-10 mr-[0.16em] h-[1.22em] w-[1.22em] shrink-0 object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.2)]"
								draggable={false}
							/>
							<span className="text-white">ALT<span className="ml-[5px]">IR</span><span className="ml-[5px]">A</span> </span>
						</span>
						<span className="ml-1 inline-block align-baseline text-transparent [-webkit-text-stroke:2px_#3FE9EC] [text-shadow:0_0_18px_rgba(63,233,236,0.18)]">
							GROUP
						</span>
						</div>
					</div>

				</div>
			</div>
		</footer>
	);
}
