import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
	const data = await blogService.getBlogPost(
		{
			// isFeatured: true,
			// search: "post",
		},
		{
			cache: "no-store",
		},
	);

	return (
		<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-20 pt-5'>
			{data?.data?.allPost.map((post: BlogPost) => (
				<BlogCard key={post.id} post={post} />
			))}
		</div>
	);
}
