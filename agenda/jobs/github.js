const db = require("../utils/database/mongo");
const github = db.get("github");

const { getRepos } = require("./requests/github");

const updateDavidIlieGitHubRepos = async () => {
    const repos = await getRepos();

    for (let i = 0; i < repos.length; i++) {
        const repo = await repos[i];
        if (repo.name !== "DavidIlie") {
            const dbRepo = await github.findOne({
                name: repo.name,
            });
            if (dbRepo) {
                github.update(
                    {
                        name: repo.name,
                    },
                    {
                        $set: {
                            name: repo.name,
                            url: repo.html_url,
                            description: repo.description,
                            language: repo.language,
                            date: {
                                created_at: repo.created_at,
                                last_push: repo.pushed_at,
                            },
                            stars: repo.stargazers_count,
                            issue_count: repo.open_issues,
                        },
                    }
                );
            } else {
                github.insert({
                    name: repo.name,
                    url: repo.html_url,
                    description: repo.description,
                    language: repo.language,
                    date: {
                        created_at: repo.created_at,
                        last_push: repo.pushed_at,
                    },
                    stars: repo.stargazers_count,
                    issue_count: repo.open_issues,
                });
            }
        }
    }
};

module.exports = { updateDavidIlieGitHubRepos };
