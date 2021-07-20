import { gql } from '@apollo/client';

export const ADD_REACTION_GOOD = gql`
  mutation AddReactionToIssue($subjectId: String!) {
    addReaction(input: { subjectId: $subjectId, content: THUMBS_UP }) {
      # subjectId is id of node
      # content is HOORAY, HEART, THUMBS_UP, ROCKET, ...
      reaction {
        content
      }
    }
  }
`;

export const ADD_STAR = gql`
  mutation AddStar {
    addStar(input: { starrableId: "MDEwOlJlcG9zaXRvcnkzODc0ODkxMDc=" }) {
      # starrableId is id of repository
      clientMutationId
      starrable {
        id
      }
    }
  }
`;
