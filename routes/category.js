const router = require("express").Router();
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/").get(getCategories);
router
  .route("/")
  .post(isAuthenticated, authorizeRoles("admin"), createCategory);
router
  .route("/:categoryId")
  .put(isAuthenticated, authorizeRoles("admin"), updateCategory);
router
  .route("/:categoryId")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteCategory);

module.exports = router;
