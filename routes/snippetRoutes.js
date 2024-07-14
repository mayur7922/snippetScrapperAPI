const express = require("express");
const router = express.Router();
const { findSnippet, addSnippet, findSnippetByCategory, findSnippetByKeyword, updateSnippet, deleteSnippet, notFound } = require("../controllers/snippetController");
const validateToken = require("../middlewares/validateTokenHandler");

router.use(validateToken);

router.route("/findSnippet").get(findSnippet);
router.route("/addSnippet").post(addSnippet);
router.route("/findSnippetByCategory").post(findSnippetByCategory);
router.route("/findSnippetByKeyword").post(findSnippetByKeyword);
router.route("/updateSnippet").put(updateSnippet);
router.route("/deleteSnippet").delete(deleteSnippet);

router.route("*").get(notFound);

module.exports = router;