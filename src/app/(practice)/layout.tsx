import Link from "next/link";

export default function PracticeLayout({
	children,
	marketingSlot,
	salesSlot,
}: {
	children: React.ReactNode;
	marketingSlot: React.ReactNode;
	salesSlot: React.ReactNode;
}) {
	return (
		<div>
			<nav className='flex gap-10 m-8'>
				<Link href='/development' className='hover:underline'>
					Development
				</Link>
				<Link href='/test' className='hover:underline'>
					Test
				</Link>
				<Link href='/marketing' className='hover:underline'>
					Marketing
				</Link>
				<Link href='/marketing/settings' className='hover:underline'>
					Settings
				</Link>
				<Link href='/sales' className='hover:underline'>
					Sales
				</Link>
			</nav>
			<div className='flex gap-5'>
				{marketingSlot}
				{salesSlot}
			</div>
			{children}
		</div>
	);
}
