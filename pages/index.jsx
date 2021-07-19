import { gql, useQuery, useMutation } from '@apollo/client';

// 発行する GraphQL クエリ
const GET_ISSUES = gql`
  query FindIssueID {
    repository(owner: "prog-learning", name: "lesson-github-api-graphql") {
      issue(number: 1) {
        id
        title
        comments(first: 10) {
          nodes {
            id
            body
          }
        }
      }
    }
  }
`;

const GET_QUERY = gql`
  query ($number_of_repos: Int!) {
    viewer {
      name
      repositories(last: $number_of_repos) {
        nodes {
          name
        }
      }
    }
  }
`;
const ADD_ISSUE = gql`
  mutation AddReactionToIssue {
    addReaction(
      input: { subjectId: "MDU6SXNzdWUyMzEzOTE1NTE=", content: HOORAY }
    ) {
      reaction {
        content
      }
      subject {
        id
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data: get_data } = useQuery(GET_ISSUES);
  console.log(loading, error, get_data);

  const [addReaction, { data }] = useMutation(ADD_ISSUE);
  console.log(data);
  return (
    <div>
      <h1>Lesson GitHub API by GraphQL</h1>
      <button onClick={() => addReaction()}>reaction!!</button>
    </div>
  );
}
