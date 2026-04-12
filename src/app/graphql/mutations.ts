import { gql } from 'apollo-angular';

// Mutation for user signup
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

// Mutation for user login
export const LOGIN_QUERY = gql`
  query Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      message
      user {
        _id
        username
        email
      }
    }
  }
`;