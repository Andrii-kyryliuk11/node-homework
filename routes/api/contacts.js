const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.delete("/:id", contactsController.deleteContact);

router.put(
  "/:id",
  validateBody(schemas.putSchema),
  contactsController.updateContact
);

module.exports = router;
