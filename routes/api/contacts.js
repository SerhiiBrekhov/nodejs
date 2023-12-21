// const { isEmptyBody } = require("../../middlewares/isEmptyBody");

const express = require("express");
const service = require("../../models/contacts");
const router = express.Router();

// console.log(isEmptyBody);
router.get("/", service.getAll);

router.get("/:contactId", service.getContactById);

router.post(
  "/",
  // isEmptyBody,
  service.addContact
);

router.delete("/:contactId", service.removeContact);

router.put("/:contactId", service.updateContact);

module.exports = router;
