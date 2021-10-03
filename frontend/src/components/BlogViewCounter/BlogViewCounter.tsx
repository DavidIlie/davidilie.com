import { useEffect } from "react";
import { useQuery } from "react-query";

interface BlogViewCounterProps {
    slug: string;
}

export const BlogViewCounter = ({
    slug,
}: BlogViewCounterProps): JSX.Element => {
    const { data } = useQuery(`views${slug}`, () => {
        return fetch(`/api/blog/views/${slug}`).then((res) => res.json());
    });
    const views = new Number(data?.views);

    useEffect(() => {
        const alreadyViewed = localStorage.getItem(`viewed-${slug}`);
        const registerView = () => {
            if (alreadyViewed !== "true") {
                fetch(`/api/blog/views/${slug}`, {
                    method: "POST",
                });
                localStorage.setItem(`viewed-${slug}`, "true");
            }
        };

        registerView();
    }, [slug]);

    return <span>{`${views > 0 ? views.toLocaleString() : "–––"} views`}</span>;
};
