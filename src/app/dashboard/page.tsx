import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"
import data from "./data.json"
import { AppSidebar } from "@/src/components/app-sidebar"
import { ChartAreaInteractive } from "@/src/components/chart-area-interactive"
import { DataTable } from "@/src/components/data-table"
import { SectionCards } from "@/src/components/section-cards"
import { SiteHeader } from "@/src/components/site-header"

export default function Page() {
  return (
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
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
