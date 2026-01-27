"use client";

import { getBlogPostAction } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function AboutPage() {
	const [data, setData] = useState();
	const [error, setError] = useState<{ message: string } | null>(null);

	useEffect(() => {
		(async () => {
			const { data, error } = await getBlogPostAction();
			setData(data);
			setError(error);
		})();
	}, []);

	return (
		<div>
			<h1>This is About page component, {data?.allPost.length}</h1>
		</div>
	);
}
