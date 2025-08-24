import { SidebarInset } from "../ui/sidebar";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";
import { SiteHeader } from "./site-header";
import data from "../../data.json";

export const DashboardPage = () => (
    <>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                    <div className="px-4 lg:px-6">
                        <ChartAreaInteractive />
                    </div>
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <DataTable data={data} />
                    </div>
                </div>
            </div>
        </div>
    </>
)