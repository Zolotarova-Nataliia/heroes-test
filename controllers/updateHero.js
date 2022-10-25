const path = require("path");
const fs = require("fs/promises");
const { Superhero } = require("../model/hero");
const { FILE_DIR } = require("../constants");

const updateHero = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;
    const files = req.files;
    const deletedImages = req.body.deletedImages || [];
    const heroToUpdate = await Superhero.findById(heroId);
    if (!heroToUpdate) {
      res.status(404).json({ message: "Superhero not found" });
    } else {
      heroToUpdate.nickname = nickname;
      heroToUpdate.real_name = real_name;
      heroToUpdate.origin_description = origin_description;
      heroToUpdate.superpowers = superpowers;
      heroToUpdate.catch_phrase = catch_phrase;
      heroToUpdate.images = heroToUpdate.images.filter(
        (el) => !deletedImages.includes(el)
      );
      files.forEach((element) => {
        heroToUpdate.images.push(element.filename);
      });
      await heroToUpdate.save();

      for (const image of deletedImages) {
        const imagePath = path.join(FILE_DIR, image);
        await fs.rm(imagePath, { force: true });
      }
      res.status(200).json(heroToUpdate);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateHero;
