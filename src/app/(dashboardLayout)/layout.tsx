import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
	user,
	admin,
}: {
	user: React.ReactNode;
	admin: React.ReactNode;
}) {
	const { data } = await userService.getSession();

	const userInfo = data.user;

	return (
		<SidebarProvider>
			<AppSidebar user={userInfo} />
			<SidebarInset>
				<div className='flex flex-1 flex-col gap-4 p-4'>
					{userInfo.role === Roles.ADMIN ? admin : user}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
