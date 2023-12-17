const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params;
    const result = await getContactById(id.contactId);
    if (!result) {
      res.status(404).json({ message: "Not found contact with that id." });
    }
    // console.log(typeof contactId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    const result = await addContact(req.body);
    if (!result) {
      res.status(400).json({ message: "missing required name field" });
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", removeContact);

router.put("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    // const body = req.body;
    console.log(req.body);
    if (!req.body) {
      res.status(400).json({ message: "missing fields" });
    }
    const result = await updateContact(id, req.body);
    if (!result) {
      res.status(404).json({ message: "not found" });
    }
    res.status(200).json({ result, message: "update success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
