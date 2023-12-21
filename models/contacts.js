const path = require("path");
const { v4 } = require("uuid");
const fs = require("fs").promises;
const {
  contactAddSchema,
  updateContactAddSchema,
} = require("../models/schems/validate");

const { httpError, ctrlWrapper } = require("../helpers/index");

const contactsPath = path.resolve("models", "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getAll = async (req, res, next) => {
  // try {
  const data = await listContacts();
  res.status(200).json(data);
  // } catch (error) {
  // next(error);
  // }
};

const getContactById = async (req, res) => {
  // try {
  const id = req.params;
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id.contactId);
  if (!result) {
    throw httpError(404, "Not found");
    // res.status(404).json({ message: "Not found contact with that id." });
  }
  res.status(200).json(result);
  // } catch (error) {
  //   next(error);
  // }
};

const addContact = async (req, res) => {
  // try {
  const contactsArr = await listContacts();

  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
    // res.status(400).json({ message: "missing required name field" });
  }

  const newContact = {
    id: v4(),
    ...req.body,
  };
  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));

  res.status(201).json(newContact);
  // }
  // );
  // } catch (error) {

  //   next(error);
  // }
};

const removeContact = async (req, res) => {
  // try {
  const id = req.params;

  const contactsBase = await listContacts();
  const idx = contactsBase.findIndex(
    (item) => Number(item.id) === id.contactId
  );
  if (idx === -1) {
    throw httpError(404, "Not found");
    // res.status(404).json({ message: "Not found contact with that id." });
  }
  // console.log(idx);
  contactsBase.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsBase, null, 2));
  res.status(200).json({ message: `contact mit id #${idx} deleted` });
  // } catch (error) {
  //   next(error);
  // }
};

const updateContact = async (req, res) => {
  const id = req.params;
  const { error } = updateContactAddSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  // if (!req.body) {
  //   res.status(400).json({ message: "missing fields" });
  // }
  // const result = await service.updateContact(id.contactId, req.body);
  const contacts = await listContacts();
  // console.log(contacts);
  const idx = contacts.findIndex((item) => item.id === id.contactId);
  if (idx === -1) {
    return null;
  }
  // console.log(idx);

  contacts[idx] = { ...contacts[idx], ...req.body };
  // console.log(contacts[idx]);

  contacts.splice(idx, 1, contacts[idx]);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // return contacts[idx];
  res.status(200).json({ message: "update success" });
  // res.status(201).json(contacts[idx]);
};
module.exports = {
  listContacts,
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
