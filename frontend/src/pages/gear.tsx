import { NextSeo } from "next-seo";
import WIP from "@components/WIP";

function Stats(): JSX.Element {
    return (
        <>
            <NextSeo title="Gear" />
            <WIP />
        </>
    );
}

export default Stats;
