/**
 * A GraphQL query to fetch a user by its ID.
 */
export const USER_BY_ID_QUERY = `
  query getUserById {
    userById(id: 1) {
      id
      name
      email
      phone
    }
  }
`;
