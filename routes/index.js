const express = require("express");
const router = express.Router();
const employment = require("./employment");
const apply = require("./apply");
const search = require("./search");

router.use(employment);
router.use(apply);
router.use(search);

module.exports = router;
