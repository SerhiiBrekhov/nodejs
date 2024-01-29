const express = require("express");
const router = express.Router();

// const ctrlTask ​​= require('../controller');

// const express = require('express')

const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares/index");
const { addMovieSchema, updateFavoriteSchema } = require("../../schemas/index");

// const router = express.Router()

// const {contactsPath} = require('../../models/contacts')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateToContact,
  updateFavoriteToContact,
} = require("../../models/contacts");

router.get("/", tryCatchWrapper(listContacts));
router.get("/:contactId", tryCatchWrapper(getContactById));
router.post("/", validateBody(addMovieSchema), tryCatchWrapper(addContact));
router.delete("/:contactId", tryCatchWrapper(removeContact));
router.put("/:contactId", tryCatchWrapper(updateToContact));
router.patch(
  "/favorite/:contactId",
  validateBody(updateFavoriteSchema),
  tryCatchWrapper(updateFavoriteToContact)
);

module.exports = router;
