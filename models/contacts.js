// const fs = require('fs/promises')
// const fs = require('fs').promises;
// const {v4} = require('uuid');
// const path = require('path');
// const Joi = require("joi");
const { Contact } = require("../schemas/model");
// Замість трай кеч:

// const asyncHandler = require("express-async-handler");

// express.get(
//   "/",
//   asyncHandler(async (req, res, next) => {
//     const bar = await foo.findAll();
//     res.send(bar);
//   })
// );

// const contactsPath = path.resolve('./models/contacts.json');
const { HttpError } = require("../helpers/index");

// const getContacts = async(req, res) => {
//   // const { limit } = req.query;
//   const data = await Unity.find({});
//   // ({}).limit(limit);
//   const contacts = JSON.parse(data);
//   return contacts;
// }

const listContacts = async (req, res) => {
  // console.log(contactsPath)
  // const { limit } = req.query;

  const data = await Contact.find({});
  // .limit(limit);
  return res.status(201).json(data);
  // const list = await getContacts();
  //   return res.status(200).json(list);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  // console.log(contactId);
  const result = await Contact.findById({ _id: contactId });
  // console.log(contacts);
  if (!result) {
    return next(
      HttpError(404, `Not found. Contact with id: ${contactId} not find`)
    );
  }
  return res.status(201).json(result);
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return next(HttpError(400, "missing required name field"));
  }

  const result = await Contact.create({ ...req.body });

  //   contactsArr.push(newContact);
  //  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  // const deleteOne = await removeContact(contactId);
  const contacts = await Contact.findByIdAndDelete({ _id: contactId });
  // const idx = contacts.findIndex(item => item.id === contactId);
  //   if (idx === -1) {
  //       return next(HttpError(404, `Not found. Contact with id: ${contactId} not find`));
  //   }
  //  contacts.splice(idx,1);

  if (!contacts) {
    return next(
      HttpError(404, `Not found. Contact with id: ${contactId} not find`)
    );
  }
  // await Contact.findByIdAndRemove(contactId);
  return res.status(200).json(contacts);

  //    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  //  return res.status(200).json(`contact  with id: ${contactId} deleted`);
};

const updateToContact = async (req, res, next, fields) => {
  // const contacts = await getContacts();
  const { contactId } = req.params;

  const contacts = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  // if (!contacts) {
  //   return next(HttpError(404, `Not found. Contact with id: ${id} not find`));
  // }

  // const upgradedContact = await Contact.updateOne(
  //   { _id: contactId },
  //   { $set: { ...req.body } }
  // );
  // contactId, {contactId, ...req.body});
  // name:  req.body.name, email: req.body.email

  // contacts.splice(idx,1,upgradedContact);

  // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return res.status(200).json(contacts);
};

const updateFavoriteToContact = async (req, res, next) => {
  const { contactId } = req.params;

  const info = req.body;
  try {
    if (!Object.keys(info).includes("favorite")) {
      res.status(400).json({ message: "Missing field favorite." });
    }
    const result = await Contact.findByIdAndUpdate(contactId, info);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }

  // if (!contacts) {
  //   return next(
  //     HttpError(404, `Not found. Contact with id: ${contactId} not find`)
  //   );
  // }
  // if (!favorite) {
  //   return next(HttpError(400, "missing field favorite"));
  // }
  // const updateStatusContact = await Contact.updateOne(
  //   { _id: contactId },
  //   { $set: { ...req.body } }
  // );
  // return res.status(200).json(contacts);
};

module.exports = {
  // contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateToContact,
  updateFavoriteToContact,
};
