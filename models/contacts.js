// const fs = require('fs/promises')
const fs = require('fs').promises;
const {v4} = require('uuid');
const path = require('path');
const Joi = require("joi");

const contactsPath = path.resolve('./models/contacts.json');
const {HttpError} = require('../models/helpers/index');

const getContacts = async() => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const listContacts = async (req, res) => {
  const list = await getContacts();
    return res.status(200).json(list);
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  // console.log(contactId);
  const contacts = await getContacts();
  const result = contacts.find(item => item.id === contactId);
  // console.log(contacts);
    if (!result) {
    return next(HttpError(404, `Not found. Contact with id: ${contactId} not find`));
    }
    return res.status(201).json(result);
  }

const addContact = async (req, res, next) => {
  const {name, email, phone} = req.body;
      if (!name || !email || !phone) {
    return next(HttpError(400, "missing required name field"));
  }
  const contactsArr = await getContacts();
  const newContact = {id:v4(), name: name, email: email, phone: phone};
    contactsArr.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return res.status(201).json(newContact);
}
    
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  // const deleteOne = await removeContact(contactId);
  const contacts = await getContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return next(HttpError(404, `Not found. Contact with id: ${contactId} not find`));
    }
   contacts.splice(idx,1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

 return res.status(200).json(`contact  with id: ${contactId} deleted`);
}

const updateToContact = async (req, res, next) => {
  const contacts = await getContacts();
  const {contactId} = req.params;
  
  const idx = contacts.findIndex(item => item.id === contactId);
      if (idx === -1) {
      return next(HttpError(404, `Not found. Contact with id: ${contactId} not find`));
      }
  
  const {name, email, phone} = req.body;

      if (!name || !email || !phone) {
      return next(HttpError(400, "missing fields"));
      }
 
    const upgradedContact = {contactId, ...req.body};
    
    contacts.splice(idx,1,upgradedContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
 
  return res.status(200).json(upgradedContact);
  }

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateToContact,
}
