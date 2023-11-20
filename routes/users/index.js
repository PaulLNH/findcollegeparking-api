const router = require("express").Router();
const { users } = require("../../controllers");

// https://api.handyschedule.com/users

// ========== Unauthenticated Routes ==========
/**
 * @desc   GET all users
 */
router.get("/", users.getUsers);


module.exports = router;
