import { env } from "@/env";
import { BlogServiceOptions, GetBlogsParams } from "@/types";

const API_URL = env.API_URL;

export const blogService = {
	getBlogPost: async function (params?: GetBlogsParams, options?: BlogServiceOptions) {
		try {
			const url = new URL(`${API_URL}/posts`);

			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== "") {
						url.searchParams.append(key, value);
					}
				});
			}

			const config: RequestInit = {};

			if (options?.cache) {
				config.cache = options.cache;
			}

			if (options?.revalidate) {
				config.next = { revalidate: options.revalidate };
			}

			const res = await fetch(url.toString(), config);

			const data = await res.json();

			if (!data.success) {
				return { data: null, error: { message: "No Data found" } };
			}

			return { data: data.data, error: null };
		} catch (error) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
	getBlogPostById: async function (id: string) {
		try {
			const res = await fetch(`${env.API_URL}/posts/${id}`);
			const data = await res.json();

			if (!data.success) {
				return { data: null, error: { message: "No Data found" } };
			}

			return { data: data?.data, error: null };
		} catch (error) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
};
