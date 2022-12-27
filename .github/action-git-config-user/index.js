const core = require("@actions/core");
const { graphql } = require("@octokit/graphql");

async function run() {
  try {
    const token = core.getInput("token");
    const { viewer } = await graphql({
      query: `{ viewer { login name email databaseId } }`,
      headers: { authorization: `bearer ${token}` }
    });
    const name = viewer.name ?? viewer.login
    const email = viewer.email ?? `${viewer.databaseId}-${viewer.login}@users.noreply.github.com`
    console.log(`The query response: ${name} <${email}>`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();