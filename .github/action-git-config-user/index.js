const core = require('@actions/core');
const { graphql } = require("@octokit/graphql");

async function run() {
  try {
    const token = core.getInput("token");
    const result = await graphql({
      query: `{ viewer { login name email databaseId } }`
    });
    console.log(`The query response: ${result}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();