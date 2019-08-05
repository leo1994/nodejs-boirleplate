const router = require("express").Router();

const { userController } = require("./../controllers");
const { auth } = require("./../middleware");

router.post("/user", userController.store);
router.get("/me", auth, userController.me);

router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.post("/logoutAll", auth, userController.logoutAll);

module.exports = router;
