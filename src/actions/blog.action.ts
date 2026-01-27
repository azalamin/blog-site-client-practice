"use server";

import { blogService } from "@/services/blog.service";

export const getBlogPostAction = async () => {
	return await blogService.getBlogPost();
};
