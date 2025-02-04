const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filterContact = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filterContact, null, 2));
    return filterContact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now().toString(),
      ...body,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return { message: "Contact not found" };
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
