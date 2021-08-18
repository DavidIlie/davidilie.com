import StatisticCard from "@components/StatisticCard";
import { AggregateProps } from "@interfaces/PlausibleStatistics";
import { durationFormatter } from "@lib/durationFormatter";

interface StatisticsModuleProps {
    statistics: AggregateProps;
}

const StatisticsModule = ({
    statistics,
}: StatisticsModuleProps): JSX.Element => {
    const AvgVisitDuration = durationFormatter(statistics.visit_duration.value);
    return (
        <div className="mt-5">
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                <StatisticCard
                    title="Unique Visitors"
                    statistic={statistics.visitors.value}
                    percentage={100}
                    percentageType="increase"
                />
                <StatisticCard
                    title="Total Vists"
                    statistic={statistics.pageviews.value}
                    percentage={100}
                    percentageType="increase"
                />
                <StatisticCard
                    title="Bounce Rate"
                    statistic={`${statistics.bounce_rate.value}%`}
                />
                <StatisticCard
                    title="Avg Visit Duration"
                    statistic={AvgVisitDuration}
                    percentage={100}
                    percentageType="increase"
                />
            </div>
        </div>
    );
};

export default StatisticsModule;
