import gql from 'graphql-tag';

export const testing = gql`
  query GetHello {
    hello
  }
`;

export const freelancerSelect = gql`
  query getAllFreelancerSelect {
    getAllFreelancerSelect {
      id
      fullname
      skillsets
      email
      location
    }
  }
`;

export const freelancer = gql`
  query getAllFreelancer(
    $filter: String
    $offset: Int!
    $limit: Int!
  ) {
    getAllFreelancer(
      filter: $filter
      first: $limit
      offset: $offset
    ) {
      id
      fullname
      skillsets
      email
      location
    }
  }
`;

export const addFreelancerMutation = gql`
  mutation createFreelancer(
    $name: String!
    $email: String!
    $location: String!
    $skill: [String]!
  ) {
    createFreelancer(
      fullname: $name
      email: $email
      skillsets: $skill
      location: $location
    ) {
      id
      fullname
      skillsets
      email
      location
    }
  }
`;

export const updateFreelancerMutation = gql`
  mutation updateFreelancer(
    $id: ID!
    $name: String!
    $email: String!
    $location: String!
    $skill: [String]!
  ) {
    updateFreelancer(
      id: $id
      fullname: $name
      email: $email
      skillsets: $skill
      location: $location
    ) {
      id
      fullname
      skillsets
      email
      location
    }
  }
`;

export const removeFreelancerMutation = gql`
  mutation removeFreelancer($id: ID!) {
    removeFreelancer(id: $id) {
      id
    }
  }
`;

// Projects

export const projects = gql`
  query getAllProjects($filter: String, $offset: Int!, $limit: Int!) {
    getAllProjects(filter: $filter, first: $limit, offset: $offset) {
      id
      projectname
      payout
      freelancers {
        id
        fullname
        skillsets
        email
        location
      }
    }
  }
`;

export const addProjectMutation = gql`
  mutation createProject(
    $name: String!
    $payout: String!
    $freelancer: [String]!
  ) {
    createProject(
      projectname: $name
      payout: $payout
      freelancers: $freelancer
    ) {
      id
      projectname
      payout
      freelancers
    }
  }
`;

export const updateProjectMutation = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $payout: String!
    $freelancer: [String]!
  ) {
    updateProject(
      id: $id
      projectname: $name
      payout: $payout
      freelancers: $freelancer
    ) {
      id
      projectname
      payout
      freelancers
    }
  }
`;

export const removeProjectMutation = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      id
    }
  }
`;

export const doughnutChartSkills = gql`
  query getAllSkills {
    getAllSkills {
      skills
      count
    }
  }
`;

export const userprojectNumber = gql`
  query getCountUserProject {
    getCountUserProject {
      freelancers
      projects
    }
  }
`;
