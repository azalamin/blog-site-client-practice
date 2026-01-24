import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BlogPost } from "@/types";
import { Eye, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }: { post: BlogPost }) {
	return (
		<Link href={`/blogs/${post.id}`} className='block'>
			<Card className='group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl'>
				<div className='relative h-48 w-full overflow-hidden bg-muted'>
					{post.thumbnail ? (
						<Image
							src={post.thumbnail}
							alt={post.title}
							fill
							className='object-cover transition-transform duration-300 group-hover:scale-105'
						/>
					) : (
						<div className='flex h-full w-full items-center justify-center text-sm text-muted-foreground'>
							No thumbnail
						</div>
					)}

					{post.isFeatured && (
						<Badge className='absolute left-3 top-3 flex items-center gap-1'>
							<Star className='h-3 w-3' />
							Featured
						</Badge>
					)}
				</div>

				<CardHeader className='space-y-2'>
					<h3 className='line-clamp-2 text-lg font-semibold leading-snug group-hover:text-primary'>
						{post.title}
					</h3>

					<p className='line-clamp-3 text-sm text-muted-foreground'>{post.content}</p>
				</CardHeader>

				{post.tags?.length ? (
					<CardContent className='flex flex-wrap gap-2'>
						{post.tags.map(tag => (
							<Badge key={tag} variant='secondary'>
								#{tag}
							</Badge>
						))}
					</CardContent>
				) : null}

				<CardFooter className='mt-auto flex items-center justify-between text-xs text-muted-foreground'>
					<div className='flex items-center gap-4'>
						<span className='flex items-center gap-1'>
							<Eye className='h-4 w-4' />
							{post.views}
						</span>

						{post._count?.comments !== undefined && (
							<span className='flex items-center gap-1'>
								<MessageCircle className='h-4 w-4' />
								{post._count.comments}
							</span>
						)}
					</div>

					<span className='font-medium text-primary'>Read →</span>
				</CardFooter>
			</Card>
		</Link>
	);
}
