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

// Mutations for employee management
export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query SearchEmployeeById($eid: ID!) {
    searchEmployeeById(eid: $eid) {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployeeByDesignationOrDepartment($designation: String, $department: String) {
    searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
      _id
      first_name
      last_name
      email
      designation
      department
      salary
      date_of_joining
      employee_photo
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String
    $designation: String!
    $salary: Float!
    $date_of_joining: String!
    $department: String!
    $employee_photo: String
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      _id
      first_name
      last_name
      email
      designation
      department
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $eid: ID!
    $first_name: String
    $last_name: String
    $email: String
    $gender: String
    $designation: String
    $salary: Float
    $date_of_joining: String
    $department: String
    $employee_photo: String
  ) {
    updateEmployee(
      eid: $eid
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      _id
      first_name
      last_name
      email
      designation
      department
      salary
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($eid: ID!) {
    deleteEmployee(eid: $eid)
  }
`;