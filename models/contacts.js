const mongoose = require("mongoose");
const Contact = require("./contactsSchema.js");
const connectDB = require("../config/connectDB.js");

connectDB();

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findOne({ _id: contactId });
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete({ _id: contactId });
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async ({ name, email, phone, favorite }) => {
  try {
    const newContact = new Contact(name, email, phone, favorite);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, name, email, phone, favorite) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactId },
    name,
    email,
    phone,
    favorite,
    { new: true }
  );
};

const updateStatusContact = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true, runValidators: true }
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
