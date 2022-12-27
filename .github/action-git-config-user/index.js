const core = require("@actions/core");
const { graphql } = require("@octokit/graphql");

async function run() {
  try {
    // Fetch authenticated user info using GraphQL API.
    const token = core.getInput("token");
    let { viewer: { login, name, email, databaseId } } = await graphql({
      query: `{ viewer { login name email databaseId } }`,
      headers: { authorization: `bearer ${token}` },
    });

    // Fallback to "ID+USERNAME@users.noreply.github.com".
    name ||= login;
    email ||= `${databaseId}+${login}@users.noreply.github.com`;

    console.log(`${name} <${email}>`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();