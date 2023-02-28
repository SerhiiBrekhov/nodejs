const express = require('express')

const {tryCatchWrapper} = require('../../models/helpers/')
const { validateBody } = require("../../middlewares/index")
const { addMovieSchema } = require("../../schemas/index")

const router = express.Router()

// const {contactsPath} = require('../../models/contacts')
const {listContacts, getContactById, addContact,
     removeContact, updateToContact} = require('../../models/contacts')

router.get('/', tryCatchWrapper(listContacts))
router.get('/:contactId', tryCatchWrapper(getContactById))
router.post('/', validateBody(addMovieSchema), tryCatchWrapper(addContact))
router.delete('/:contactId', tryCatchWrapper(removeContact))
router.put('/:contactId', tryCatchWrapper(updateToContact))

module.exports = router
