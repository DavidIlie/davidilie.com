import { useEffect } from "react";
import { useQuery } from "react-query";

export const BlogViewCounter = ({ slug }) => {
    const { data } = useQuery(`views${slug}`, () => {
        return fetch(`/api/blog/views/${slug}`).then((res) => res.json());
    });
    const views = new Number(data?.views);

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/blog/views/${slug}`, {
                method: "POST",
            });

        registerView();
    }, [slug]);

    return <span>{`${views > 0 ? views.toLocaleString() : "–––"} views`}</span>;
};
