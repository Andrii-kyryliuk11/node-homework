const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");
const isValidId = require("../../middlewares/isValidId");
const validateToken = require("../../middlewares/validateToken");

router.use(validateToken);

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.delete("/:id", isValidId, contactsController.deleteContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.validateEmptyBodySchema),
  validateBody(schemas.putSchema),
  contactsController.updateContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.patchSchema),
  contactsController.updateStatusContact
);

module.exports = router;
