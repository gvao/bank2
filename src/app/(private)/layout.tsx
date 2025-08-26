import { AppSidebar } from "@/src/components/dashboard/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/src/components/ui/sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => (
    <SidebarProvider
        style={
            {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }
    >
        <AppSidebar variant="inset" />

        <SidebarInset>
            {children}
        </SidebarInset>

    </SidebarProvider>
)

export default Layout