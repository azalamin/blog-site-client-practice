import NotFound from "@/app/not-found";
import { Badge } from "@/components/ui/badge";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { Eye, MessageCircle, Star } from "lucide-react";
import Image from "next/image";

export const dynamicParams = true;

export async function generateStaticParams() {
	const { data } = await blogService.getBlogPost();

	return data.allPost
		.map((post: BlogPost) => ({
			id: post.id,
		}))
		.splice(0, 3);
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const res = await blogService.getBlogPostById(id);

	if (res?.error || !res?.data) {
		NotFound();
	}

	const post = res.data;

	const WORDS_PER_MINUTE = 200;

	const wordCount = post.content.trim().split(/\s+/).length;

	const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(post.createdAt));

	return (
		<article className='mx-auto max-w-4xl px-4 py-10'>
			{/* Header */}
			<header className='space-y-4'>
				{post.isFeatured && (
					<Badge className='flex w-fit items-center gap-1'>
						<Star className='h-3 w-3' />
						Featured
					</Badge>
				)}

				<h1 className='text-3xl font-bold leading-tight md:text-4xl'>{post.title}</h1>

				{/* Meta info */}
				<div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
					<span>{formattedDate}</span>
					<span>•</span>
					<span>{readingTime} min read</span>
					<span>•</span>
					<span>{wordCount} words</span>
				</div>

				{/* Stats */}
				<div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
					<span className='flex items-center gap-1'>
						<Eye className='h-4 w-4' />
						{post.views} views
					</span>

					{post._count?.comments !== undefined && (
						<span className='flex items-center gap-1'>
							<MessageCircle className='h-4 w-4' />
							{post._count.comments} comments
						</span>
					)}
				</div>

				{/* Tags */}
				{post.tags?.length ? (
					<div className='flex flex-wrap gap-2 pt-2'>
						{post.tags.map((tag: string) => (
							<Badge key={tag} variant='secondary'>
								#{tag}
							</Badge>
						))}
					</div>
				) : null}
			</header>

			{/* Thumbnail */}
			<div className='relative my-8 h-[260px] w-full overflow-hidden rounded-xl bg-muted'>
				{post.thumbnail ? (
					<Image src={post.thumbnail} alt={post.title} fill className='object-cover' priority />
				) : (
					<div className='flex h-full items-center justify-center text-sm text-muted-foreground'>
						No thumbnail
					</div>
				)}
			</div>

			{/* Content */}
			<section className='prose prose-slate max-w-none dark:prose-invert'>
				{post.content.split("\n").map((line: string, index: number) => (
					<p key={index}>{line}</p>
				))}
			</section>
		</article>
	);
}
