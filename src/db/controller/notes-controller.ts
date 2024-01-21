import { NoteEntity } from "../models/notes-model";

interface Notes {
  userId: string;
  id?: string;
  title?: string;
  createdAt?: string | null;
  content?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  isDeleted?: boolean | null;
}
/**
 * Creates a new note.
 * @function createNote
 * @async
 * @param {Notes} data - The data for creating a new note.
 * @returns {Promise<void>} - A promise that resolves when the note is created.
 */
export const createNote = async (data: Notes) => {
  return await NoteEntity.put(data);
};

/**
 * Updates an existing note.
 * @function updateNote
 * @async
 * @param {string} data.title - The new title for the note.
 * @param {string} data.content - The new content for the note.
 * @param {string} data.userId - The unique identifier of the user updating the note.
 * @param {string} data.id - The unique identifier of the note to be updated.
 * @returns {Promise<void>} - A promise that resolves when the note is updated.
 */
export const updateNote = async (data: {
  title: string;
  content: string;
  userId: string;
  id: string;
}) => {
  const { content, userId, title, id } = data;
  return await NoteEntity.update(
    {
      content,
      updatedAt: new Date().toISOString(),
      updatedBy: userId,
      userId,
      id,
      title,
    },
    {
      returnValues: "UPDATED_NEW",
    },
  );
};

/**
 * Deletes a note.
 * @function deleteNote
 * @async
 * @param {string} userId - The unique identifier of the user deleting the note.
 * @param {string} id - The unique identifier of the note to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the note is marked as deleted.
 */
export const deleteNote = async (userId: string, id: string) => {
  return await NoteEntity.update({
    isDeleted: true,
    userId,
    id,
  });
};

/**
 * Retrieves a specific note.
 * @function getNote
 * @async
 * @param {string} userId - The unique identifier of the user retrieving the note.
 * @param {string} id - The unique identifier of the note to be retrieved.
 * @returns {Promise<Notes>} - A promise that resolves with the retrieved note data.
 */
export const getNote = async (userId: string, id: string) => {
  return await NoteEntity.get({
    userId,
    id,
  });
};

/**
 * Retrieves a list of notes.
 * @function getNotes
 * @async
 * @param {string} userId - The unique identifier of the user retrieving the notes.
 * @param {string} [nextToken] - Optional token(id of LastEvaluatedKey) for paginating results.
 * @returns {Promise<Array<Notes>>} - A promise that resolves with the list of retrieved notes.
 */
export const getNotes = async (userId: string, nextToken?: string) => {
  return await NoteEntity.query(userId, {
    limit: 5,
    filters: {
      attr: "isDeleted",
      eq: false,
    },
    ...(nextToken ? { startKey: { userId, id: nextToken } } : {}),
  });
};
