const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");
const { validateBody } = require("../../middlewares/validateBody");
const validateToken = require("../../middlewares/validateToken");
const upload = require("../../middlewares/upload");

const schemas = require("../../schemas/users");

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  userController.register
);

router.post(
  "/login",
  validateBody(schemas.userRegisterSchema),
  userController.login
);

router.get("/current", validateToken, userController.getCurrentUser);

router.post("/logout", validateToken, userController.logout);

router.patch(
  "/",
  validateToken,
  validateBody(schemas.userUpdateSchema),
  userController.updateStatus
);

router.patch(
  "/avatars",
  validateToken,
  upload.single("avatar"),
  userController.changeAvatar
);
router.get("/verify/:verificationToken", userController.verifyToken);
module.exports = router;
