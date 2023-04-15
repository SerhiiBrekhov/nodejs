const express = require('express')

const {tryCatchWrapper} = require('../../models/helpers')
const { validateBody } = require("../../middlewares/index")
const { addMovieSchema } = require("../../schemas/index")
const { authRouter } = require("./auth")
const router = express.Router()

// const {contactsPath} = require('../../models/contacts')
const {listContacts, getContactById, addContact,
     removeContact, updateToContact,updateFavoriteToContact} = require('../../models/contacts')

router.get('/', tryCatchWrapper(listContacts))
router.get('/:contactId', tryCatchWrapper(getContactById))
router.post('/', validateBody(addMovieSchema), tryCatchWrapper(addContact))
router.delete('/:contactId', tryCatchWrapper(removeContact))
router.put('/:contactId', tryCatchWrapper(updateToContact))
router.put('/:contactId/favorite', tryCatchWrapper(updateFavoriteToContact))
// app.use("/api/auth", authRouter);
router.get('/:users/register')

module.exports = router
