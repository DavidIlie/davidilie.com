export default async function handler(req, res) {
    const userReposResponse = await fetch(
        `https://davidilie.com/api/agenda/job/github`
    );

    const repositories = await userReposResponse.json();

    const notForked = repositories.filter((repo) => !repo.fork);

    res.setHeader(
        `Cache-Control`,
        `public, s-maxage=1200, stale-while-revalidate=600`
    );

    for (let i = 0; i > notForked.length; i++) {
        if (notForked[i].name === "DavidIlie") {
            delete notForked[i];
        }
    }

    const removedName = notForked.filter((a) => a.name !== "DavidIlie");

    return res.status(200).json({
        repos: removedName,
    });
}
