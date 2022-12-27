import { getInput, setFailed } from "@actions/core";
import { graphql } from "@octokit/graphql";

try {
  const token = getInput("token");
  const { response } = await graphql({
    query: `{ viewer { login name email databaseId } }`,
    headers: { authorization: `bearer ${token}` }
  });
  console.log(`The query response: ${response}`);
} catch (error) {
  setFailed(error.message);
}