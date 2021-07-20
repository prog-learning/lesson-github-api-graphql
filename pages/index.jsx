import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ISSUES, GET_ISSUE, GET_USER } from '../graphql/query';
import { ADD_REACTION_GOOD, ADD_STAR } from '../graphql/mutation';

export default function Home() {
  const [input, setInput] = useState('');

  const confirmQuery = (data, refetch) => {
    refetch();
    console.log(data);
  };

  const { data: get_user, refetch: setGET_USER } = useQuery(GET_USER);

  const { data: get_issues, refetch: setGET_ISSUES } = useQuery(GET_ISSUES);

  const { data: get_issue, refetch: setGET_ISSUE } = useQuery(GET_ISSUE, {
    variables: { issueId: Number(input) },
  });

  const [addReactionGood] = useMutation(ADD_REACTION_GOOD, {
    variables: { subjectId: input },
  });
  const [addStar, { data }] = useMutation(ADD_STAR);

  console.log(data);

  return (
    <div>
      <h1>Lesson GitHub API by GraphQL</h1>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <h3>Query</h3>
      <button onClick={() => confirmQuery(get_user, setGET_USER)}>
        GET_USER
      </button>
      <button onClick={() => confirmQuery(get_issues, setGET_ISSUES)}>
        GET_ISSUES
      </button>
      <button onClick={() => confirmQuery(get_issue, setGET_ISSUE)}>
        GET_ISSUE
      </button>
      <h3>Mutation</h3>
      <button onClick={() => addReactionGood()}>ADD_REACTION_GOOD</button>
      <button onClick={() => addStar()}>ADD_STAR</button>
      <hr />
      {get_issue && (
        <div>
          GET_ISSUE {'>>>'} <b>{get_issue?.repository?.issue?.title}</b>
        </div>
      )}
      <hr />
      {get_issues?.search?.nodes.map((issue) => (
        <div key={issue.number}>
          <h4>
            #{issue.number} : [{issue.title}]
          </h4>
          <div>subjectId: {issue.id}</div>
        </div>
      ))}
      <hr />
    </div>
  );
}
