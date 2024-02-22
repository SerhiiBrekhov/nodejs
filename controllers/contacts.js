const { Contact } = require("../models/contacts");

const { ctrlWrapper } = require("../helpers/index");

const { HttpError } = require("../helpers/index");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner, ...(favorite ? { favorite: true } : {}) };
  const allContacts = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  res.status(200).json({
    page,
    limit,
    contacts: allContacts,
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  // const { id } = req.params;
  const result = await Contact.findById(
    // id
    { _id: contactId, owner }
  );

  if (!result) {
    return next(
      HttpError(404, `Not found. Contact with id: ${contactId} not find`)
    );
  }
  return res.status(201).json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  // console.log(res.status);

  res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = await Contact.findByIdAndDelete({ _id: contactId });

  if (!contacts) {
    return next(
      HttpError(404, `Not found. Contact with id: ${contactId} not find`)
    );
  }

  return res.status(200).json(contacts);
};

const updateToContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  // const { id } = req.params;
  const editedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );
  if (!editedContact) {
    throw httpError(404, "Not found");
  }
  res.status(201).json(editedContact);
};

const updateFavoriteToContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const info = req.body;
  try {
    if (!Object.keys(info).includes("favorite")) {
      res.status(400).json({ message: "Missing field favorite." });
    }
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, owner },
      info
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // contactsPath,
  listAll: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(add),
  updateToContact: ctrlWrapper(updateToContact),
  updateFavoriteToContact: ctrlWrapper(updateFavoriteToContact),
};
