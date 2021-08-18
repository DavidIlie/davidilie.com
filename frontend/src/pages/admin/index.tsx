import AdminPage from "@components/AdminPage";
import { Tab } from "@headlessui/react";
import {
    AggregateResponse,
    AggregateProps,
} from "@interfaces/PlausibleStatistics";
import BlogModule from "@modules/admin/BlogModule";
import StatisticsModule from "@modules/admin/StatisticsModule";
import UsersModule from "@modules/admin/UsersModule";

interface AdminProps {
    statistics: AggregateProps;
}

const Admin = ({ statistics }: AdminProps): JSX.Element => {
    const DefaultTabClassName =
        "duration-150 w-full py-2.5 text-sm leading-5 font-medium rounded-lg";
    const SelectionTabClassName = (selected: boolean) =>
        selected
            ? "bg-blue-800 shadow text-white"
            : "text-blue-100 hover:bg-gray-700 hover:text-white";

    const TabClassName = (selected: boolean) =>
        `${DefaultTabClassName} ${SelectionTabClassName(selected)}`;

    return (
        <AdminPage className="h-screen pt-28 max-w-7xl mx-auto pl-8 px-4 sm:px-6 sm:pl-8 lg:px-8 lg:pl-8 -mt-1">
            <h1 className="xl:text-5xl text-4xl font-semibold mb-5">
                Welcome back <span className="header-gradient">David!</span>
            </h1>
            <Tab.Group>
                <Tab.List className="flex p-1 space-x-1 bg-gray-800 rounded-xl border-2 border-gray-900">
                    <Tab className={({ selected }) => TabClassName(selected)}>
                        Statistics
                    </Tab>
                    <Tab className={({ selected }) => TabClassName(selected)}>
                        Blog
                    </Tab>
                    <Tab className={({ selected }) => TabClassName(selected)}>
                        Users
                    </Tab>
                </Tab.List>
                <Tab.Panels className="px-2 mt-5">
                    <Tab.Panel>
                        <StatisticsModule statistics={statistics} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <BlogModule />
                    </Tab.Panel>
                    <Tab.Panel>
                        <UsersModule />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </AdminPage>
    );
};

export async function getServerSideProps() {
    const statisticsRequest = await fetch(
        "https://stats.davidilie.com/api/v1/stats/aggregate?site_id=davidilie.com&period=30d&metrics=visitors,pageviews,bounce_rate,visit_duration",
        {
            headers: {
                Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
            },
        }
    );
    const statisticsResponse: AggregateResponse =
        await statisticsRequest.json();

    return {
        props: {
            statistics: statisticsResponse.results,
        },
    };
}

export default Admin;
