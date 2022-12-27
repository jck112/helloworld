const core = require('@actions/core');
const { graphql } = require("@octokit/graphql");

async function run() {
  try {
    const token = core.getInput("token");
    const { response } = await graphql(
      `query { viewer { login name email databaseId } }`,
      { headers: { authorization: `bearer ${token}` } }
    );
    console.log(`The query response: ${response}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();