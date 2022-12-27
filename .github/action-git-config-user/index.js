const core = require('@actions/core');
const { graphql } = require("@octokit/graphql");

async function run() {
  try {
    const token = core.getInput("token");
    const result = await graphql({
      query: `{ viewer { login name email databaseId } }`,
      headers: { authorization: `bearer ${token}` }
    });
    console.log(`The query response: ${JSON.stringify(result)}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();