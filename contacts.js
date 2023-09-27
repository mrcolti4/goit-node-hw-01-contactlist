import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

/**
 * Contacts module
 * @module contacts
 */

/**
 * Path to json file with contact list
 * @type {string}
 */
const contactsPath = path.resolve("db", "contacts.json");

/**
 * Rewrite file with new contact list
 * @param {Array<object>} contacts - new contact list
 * @returns {void}
 */
const updateContactList = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
/**
 * Returns array of objects
 * @returns {Array<object>} - Contact list
 */
export async function listContacts() {
  try {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Return contact object by id otherwise returs null
 * @param {string} contactId - contact ID
 * @returns {object|null} - Founded object by ID
 */
export async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);

  return contact || null;
}

/**
 * Delete contact by id from contact list.
 * @param {string} contactId - contact ID
 * @returns {object|null} - Deleted object
 */
export async function removeContact(contactId) {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [deletedContact] = data.splice(contactIndex, 1);
  updateContactList(data);
  return deletedContact;
}

/**
 * Create new contact with passed data and unique ID.
 * @param {string} name - contact name
 * @param {string} email - contact email
 * @param {string} phone - contact phone
 * @returns {object} - Created object
 */
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContactList(contacts);

  return newContact;
};

export { addContact };
