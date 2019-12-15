import { gql } from "apollo-boost";

export const GET_PROGRAMS = gql`
  query($id: String) {
    getPrograms(id: $id) {
      degree
      delivery
      id
      name
      school
      tuition
    }
  }
`;

export const LIST_PROGRAMS = gql`
  query($filter: TableProgramsFilterInput, $limit: Int, $nextToken: String) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        degree
        delivery
        id
        name
        school
        tuition
      }
      nextToken
    }
  }
`;

export const QUERY_PROGRAMS = gql`
  query($degree: String, $name: String, $limit: Int, $nextToken: String) {
    queryProgramsByDegree(degree: $degree, name: $name, limit: $limit, nextToken: $nextToken) {
      items {
        degree
        delivery
        id
        name
        school
        tuition
      }
      nextToken
    }
  }
`;
