const express = require("express");

const router = express.Router();
const { joiSchema, updatedJoiSchema } = require("../model/hero");
const createUploadMiddleware = require("../middlewares/uploadMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { FILE_DIR } = require("../constants");
const heroes = require("../controllers");

router.get("/download", express.static(FILE_DIR));

router.get("/", heroes.getHeroesList);
router.get("/:heroId", heroes.getHeroById);
router.post(
  "/",
  createUploadMiddleware(joiSchema).array("images", 10),
  validationMiddleware(joiSchema),
  heroes.addHero
);
router.put(
  "/:heroId",
  createUploadMiddleware(updatedJoiSchema).array("images", 10),
  validationMiddleware(updatedJoiSchema),
  heroes.updateHero
);
router.delete("/:heroId", heroes.removeHeroById);

module.exports = router;
