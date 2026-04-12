import { gql } from 'apollo-angular';

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      message
      user {
        _id
        username
        email
      }
    }
  }
`;