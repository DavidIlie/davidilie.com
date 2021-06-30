const fetch = require("node-fetch");

async function getRepos() {
    const response = await fetch(
        "https://api.github.com/users/davidilie/repos?per_page=50",
        {
            method: "GET",
        }
    );
    var data = response.json();
    return await data;
}

module.exports = { getRepos };
