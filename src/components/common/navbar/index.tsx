'use client'

import { usePathname } from 'next/navigation';

const Navbar = () => {
	const pathname = usePathname();
	const breadcrumb = pathname?.split('/').filter(Boolean);

	return (
		<nav className="flex items-center justify-between p-4 text-white">
			<div className="flex-1">
				{breadcrumb.length > 0 ? (
					<span className="font-bold text-gray-600">Task Management </span>
				) : (
					<span className="font-bold">Home</span>
				)}
				{breadcrumb.map((crumb, index) => (
					<span key={index} className="mx-1 text-gray-300">
						/ {crumb}
					</span>
				))}
			</div>

		
		</nav>
	);
};

export default Navbar;
