const { Router } = require("express");
const {check} = require("express-validator");

const { validateFields } = require('../middlewares')
const { uploadFile } = require("../controllers/uploads.contoller");


const router = Router();

router.post('/', uploadFile)

module.exports = router;