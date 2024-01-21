import { UserEntity } from "../models/users-model";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

/**
 * Retrieves a list of users.
 * @function getUsers
 * @async
 * @param {string} [nextToken] - Optional token for paginating results.
 * @returns {Promise<Array<User>>} - A promise that resolves with the list of retrieved users.
 */
export const getUsers = async (nextToken?: string) => {
  return await UserEntity.scan({
    limit: 100,
    ...(nextToken
      ? {
          startKey: {
            id: nextToken,
          },
        }
      : {}),
  });
};
/**
 * Retrieves a user by ID.
 * @param id
 * @returns {Promise<User>}
 */
export const getUser = async (id: string) => {
  return await UserEntity.get({ id });
};

/**
 * Adds a new user.
 * @param user
 * @returns {Promise<User>}
 */
export const addUser = async (user: User) => {
  return await UserEntity.put(user);
};
