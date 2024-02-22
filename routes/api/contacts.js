const express = require("express");
const router = express.Router();

// const express = require('express')
const authenticate = require("../../middlewares/authenticate");

// const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares/index");
const { addMovieSchema, updateFavoriteSchema } = require("../../models/index");

const contactsCtrl = require("../../controllers/contacts");

router.get("/", authenticate, contactsCtrl.listAll);
router.get("/:contactId", authenticate, contactsCtrl.getContactById);
router.post(
  "/",
  authenticate,
  validateBody(addMovieSchema),
  contactsCtrl.addContact
);
router.delete("/:contactId", authenticate, contactsCtrl.removeContact);
router.patch("/:contactId", authenticate, contactsCtrl.updateToContact);
router.patch(
  "/favorite/:contactId",
  authenticate,
  validateBody(updateFavoriteSchema),
  contactsCtrl.updateFavoriteToContact
);

module.exports = router;
