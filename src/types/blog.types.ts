export interface BlogPost {
	id: string | number;
	title: string;
	content: string;
	thumbnail?: string | null;
	tags?: string[];
	views: number;
	_count?: {
		comments: number;
	};
	isFeatured?: boolean;
}

export interface GetBlogsParams {
	isFeatured?: boolean;
	search?: string;
}
export interface BlogServiceOptions {
	cache?: RequestCache;
	revalidate?: number;
}
