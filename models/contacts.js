const mongoose = require("mongoose");
const Contact = require("./contactsSchema.js");

const listContacts = async (owner) => {
  try {
    return await Contact.find({ owner });
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId, owner) => {
  try {
    return await Contact.findOne({ _id: contactId, owner });
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId, owner) => {
  try {
    return await Contact.findOneAndDelete({ _id: contactId, owner });
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (data) => {
  try {
    return await Contact.create(data);
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, data, favorite, owner) => {
  return await Contact.findByIdAndUpdate({ _id: contactId, owner }, data, {
    new: true,
    runValidators: true,
  });
};

const updateStatusContact = async (contactId, favorite, owner) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true, runValidators: true },
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
