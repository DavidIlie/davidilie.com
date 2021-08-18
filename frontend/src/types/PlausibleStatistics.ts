export interface AggregateProps {
    bounce_rate: {
        value: number;
    };
    pageviews: {
        value: number;
    };
    visit_duration: {
        value: number;
    };
    visitors: {
        value: number;
    };
}

export interface AggregateResponse {
    results: AggregateProps;
}
