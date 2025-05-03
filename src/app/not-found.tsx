"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
	const navigate = useRouter();

	return (
		<div className="w-full h-full flex flex-col items-center space-y-3 justify-center bg-card p-6">
			<h1 className="text-6xl font-bold text-foreground">404</h1>
			<p className="text-xl text-foreground">Page Not Found</p>
			<button
				onClick={() => navigate.push("/")}
				className="bg-primary text-black rounded-md"
			>
				Go Back Home
			</button>
		</div>
	);
};

export default NotFound;