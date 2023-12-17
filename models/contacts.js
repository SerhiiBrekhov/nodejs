import Joi from "joi";
const path = require("path");
const { v4 } = require("uuid");
const fs = require("fs").promises;
// import contacts from "./db/contacts.json";

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const contactsPath = path.resolve("models", "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  // console.log(contactsPath);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  // console.log({contacts,contactId})
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contactsArr = await listContacts();
  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  };
  contactsArr.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

  return newContact;
};

const removeContact = async (req, res, next) => {
  // try {
  const id = req.params;
  const contactsBase = await listContacts();
  const idx = contactsBase.findIndex(
    (item) => Number(item.id) === id.contactId
  );
  if (idx === -1) {
    res.status(404).json({ message: "Not found contact with that id." });
  }
  console.log(idx);
  contactsBase.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsBase));
  res.status(200).json({ contactsBase, message: "contact deleted" });
  // } catch (error) {
  //   next(error);
  // }
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.find((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const updatedContact = {
    id: contactId,
    name: name,
    email: email,
    phone: phone,
  };
  contacts.splice(idx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
