const express = require("express");
const router = express.Router();

const ctrlA = require("../../controllers/authorization.js");
const { validateBody } = require("../../middlewares/index.js");
const { tryCatchWrapper, ctrlWrapper } = require("../../helpers");

const { registerSchema, loginSchema } = require("../../models/index");
const authenticate = require("../../middlewares/authenticate.js");
const upload = require("../../middlewares/upload.js");

router.post(
  "/register",
  validateBody(registerSchema),
  tryCatchWrapper(ctrlA.register)
);

router.post("/login", validateBody(loginSchema), ctrlA.login);

router.get("/current", authenticate, ctrlA.getCurrent);

router.patch("/logout", authenticate, ctrlA.logout);
router.patch("/", authenticate, ctrlA.updateUserSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlA.updateAvatar
);

module.exports = router;
