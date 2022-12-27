const core = require('@actions/core');
const { graphql } = require("@octokit/graphql");

async function run() {
  try {
    const token = core.getInput("token");
    const result = await graphql({
      query: `{ viewer { login name email databaseId } }`,
      headers: { authorization: `bearer ${token}` }
    });
    let login = result.viewer.login
    let name = result.viewer.name
    let email = result.viewer.email
    let id = result.viewer.databaseId
    console.log(`The query response: ${login} ${name} ${email} ${id}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();