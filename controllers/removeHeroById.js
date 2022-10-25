const path = require("path");
const fs = require("fs/promises");
const { Superhero } = require("../model/hero");
const { FILE_DIR } = require("../constants");

const removeHeroById = async (req, res, next) => {
  const { heroId } = req.params;
  try {
    const deletedHero = await Superhero.findByIdAndDelete(heroId);
    for (const image of deletedHero.images) {
      const imagePath = path.join(FILE_DIR, image);
      await fs.rm(imagePath, { force: true });
    }
    if (!deletedHero) {
      res.status(404).json({ message: "Superhero not found" });
    } else {
      res.status(200).json(deletedHero);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = removeHeroById;
